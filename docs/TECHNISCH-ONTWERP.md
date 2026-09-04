# Technisch ontwerp - Slimme voorraadweergave

**Versie:** 2.0

**Datum:** 4 september 2026

**Doel:** uitleggen hoe de werkende applicatie technisch is opgebouwd

## 1. Systeemoverzicht

De applicatie bestaat uit:

- een publieke voorraadpagina voor een e-inkscherm;
- een inlogpagina en mobiele beheerpagina voor medewerkers;
- een Node.js-backend met Express en JSON-API;
- sessiegebaseerde authenticatie;
- een lokale SQLite-database voor producten, medewerkers en wijzigingen.

## 2. Architectuur

### 2.1 Drielagenarchitectuur

```text
+-------------------------+       +-------------------------+
| Publiek e-inkscherm     |       | Telefoon medewerker    |
| index.html              |       | inloggen.html          |
| style.css               |       | beheer.html            |
| app.js                  |       | beheer.css / beheer.js |
+------------+------------+       +------------+------------+
             |                                 |
             +--------- HTTP + JSON -----------+
                              |
                              v
                 +-------------------------+
                 | Node.js + Express       |
                 | server.js               |
                 | routes, sessies, checks |
                 +------------+------------+
                              |
                              v
                 +-------------------------+
                 | SQLite                  |
                 | producten              |
                 | medewerkers            |
                 | wijzigingen            |
                 +-------------------------+
```

De browser communiceert nooit rechtstreeks met de database. Alleen de backend leest en wijzigt SQLite.

### 2.2 Frontendonderdelen

#### Publieke pagina

`public/index.html`, `public/style.css` en `public/app.js` vormen de publieke pagina. `app.js` haalt producten op met `GET /api/producten`, maakt de productkaarten en herhaalt de aanvraag iedere 30 seconden.

De pagina toont prijs alleen wanneer `prijs_cent` groter dan nul is. Status wordt bepaald door `voorraad` en `beschikbaar`. Bij een latere verbindingsfout blijven de laatst geladen kaarten staan.

#### Inlogpagina

`public/inloggen.html`, `public/inloggen.css` en `public/inloggen.js` sturen gebruikersnaam en wachtwoord naar `POST /api/inloggen`. Een geldige login leidt naar `/beheer.html`; een ongeldige login toont een algemene foutmelding.

#### Beheerpagina

`public/beheer.html`, `public/beheer.css` en `public/beheer.js` bieden formulieren en knoppen voor:

- product toevoegen;
- voorraad relatief of exact aanpassen;
- prijs en verkoopeenheid aanpassen;
- beschikbaarheid aanpassen;
- wijzigingshistorie bekijken;
- uitloggen.

Na een geslaagde productactie worden producten en historie samen opnieuw geladen met `Promise.all`.

### 2.3 Backendonderdelen

`server.js`:

- levert statische bestanden;
- beschermt `/beheer.html`;
- verwerkt JSON-aanvragen;
- beheert medewerkerssessies;
- valideert invoer;
- voert geparametriseerde SQL-query's uit;
- bewaart relevante productwijzigingen;
- geeft JSON-resultaten en passende HTTP-statuscodes terug.

`database.js` maakt de datamap en tabellen aan en voegt bij een lege database voorbeeldproducten en twee medewerkersaccounts toe.

`wachtwoorden.js` maakt zouten en wachtwoordhashes en vergelijkt hashes veilig.

## 3. Technologiekeuzes

| Technologie | Gebruik | Waarom gekozen |
|---|---|---|
| HTML | Structuur van drie webpagina's | Semantisch, eenvoudig en geen buildproces nodig |
| CSS | Responsive en e-inkvriendelijke vormgeving | Hoog contrast, grote tekst en flexibele rasters |
| JavaScript | Browserlogica en API-aanvragen | De interface is klein genoeg om zonder framework te bouwen |
| Node.js 24 | Backend | Dezelfde taal aan voor- en achterkant en ingebouwde `node:sqlite` |
| Express 5 | Webserver en API | Overzichtelijke routes, middleware en foutafhandeling |
| SQLite | Permanente lokale opslag | Geen aparte databaseserver nodig en passend bij weinig gebruikers |
| express-session | Inloggen | De server kan beveiligde pagina's en routes aan een sessie koppelen |
| node:crypto | Wachtwoordbeveiliging | `scrypt`, willekeurige zouten en veilige vergelijking zijn ingebouwd |
| GitHub | Versiebeheer | Wijzigingen, samenwerking en herstel zijn controleerbaar |

Flutter en MySQL worden niet gebruikt. De mobiele omgeving is een responsive webpagina en de database is SQLite.

## 4. Belangrijkste gegevensstromen

### 4.1 Publieke voorraad laden

1. De browser opent `/`.
2. `app.js` vraagt `/api/producten` op.
3. Express leest producten uit SQLite.
4. De API stuurt JSON met naam, prijs, eenheid, voorraad en beschikbaarheid.
5. De browser bouwt de kaarten.
6. De aanvraag wordt iedere 30 seconden herhaald.

### 4.2 Medewerker inloggen

1. De browser stuurt gebruikersnaam en wachtwoord.
2. De backend zoekt de medewerker hoofdletterongevoelig op.
3. Het wachtwoord wordt met zout en `scrypt` gecontroleerd.
4. Bij succes wordt de sessie opnieuw aangemaakt en gekoppeld aan medewerker-id en gebruikersnaam.
5. De browser krijgt toegang tot de beheerpagina en beveiligde routes.

### 4.3 Product wijzigen en historie bijwerken

1. De medewerker voert een actie uit.
2. `beheer.js` verstuurt een beveiligde POST-, PATCH- of PUT-aanvraag.
3. `vereisLogin` controleert de sessie.
4. De backend valideert de invoer en wijzigt `producten`.
5. `registreerWijziging` schrijft product, medewerker, soort, oude waarde, nieuwe waarde en tijdstip naar `wijzigingen`.
6. De beheerpagina haalt producten en historie opnieuw op.
7. De publieke pagina ziet de wijziging bij de volgende cyclus van maximaal 30 seconden.

## 5. Datamodel

### 5.1 Relaties

```text
producten 1 -------- * wijzigingen * -------- 1 medewerkers
```

Iedere wijziging hoort bij precies één product en één medewerker. SQLite foreign-keycontrole wordt bij het openen van de database aangezet met `PRAGMA foreign_keys = ON`.

### 5.2 Tabel `producten`

| Veld | Type | Regel | Betekenis |
|---|---|---|---|
| `id` | INTEGER | Primary key, automatisch nummer | Uniek productnummer |
| `naam` | TEXT | Verplicht en uniek | Productnaam |
| `prijs_cent` | INTEGER | 0 t/m 1.000.000, standaard 0 | Prijs in centen; 0 betekent nog niet ingesteld bij oude gegevens |
| `eenheid` | TEXT | 1 t/m 30 tekens, standaard `stuk` | Verkoopeenheid, zoals liter, stuk, fles of pak |
| `voorraad` | INTEGER | Verplicht, standaard 0, minimaal 0 | Actuele voorraad in verkoopeenheden |
| `beschikbaar` | INTEGER | Alleen 0 of 1, standaard 1 | Tijdelijke beschikbaarheid |

Nieuwe producten moeten via de API een prijs van minimaal 1 cent en maximaal 10.000 euro krijgen. De databasewaarde 0 blijft toegestaan voor gemigreerde, oudere producten zonder ingestelde prijs.

### 5.3 Tabel `medewerkers`

| Veld | Type | Regel | Betekenis |
|---|---|---|---|
| `id` | INTEGER | Primary key | Uniek medewerkersnummer |
| `gebruikersnaam` | TEXT | Verplicht, uniek, `COLLATE NOCASE` | Inlognaam |
| `wachtwoord_hash` | TEXT | Verplicht | Afgeleide wachtwoordhash |
| `zout` | TEXT | Verplicht | Willekeurig zout voor `scrypt` |
| `aangemaakt_op` | TEXT | Automatische timestamp | Aanmaakmoment account |

Het leesbare wachtwoord wordt niet in de database opgeslagen.

### 5.4 Tabel `wijzigingen`

| Veld | Type | Regel | Betekenis |
|---|---|---|---|
| `id` | INTEGER | Primary key | Uniek wijzigingsnummer |
| `product_id` | INTEGER | Foreign key naar `producten.id` | Gewijzigd product |
| `medewerker_id` | INTEGER | Foreign key naar `medewerkers.id` | Uitvoerende medewerker |
| `soort` | TEXT | Alleen vier toegestane waarden | Type wijziging |
| `oude_waarde` | TEXT | Mag leeg zijn | Situatie voor de wijziging |
| `nieuwe_waarde` | TEXT | Verplicht | Situatie na de wijziging |
| `gewijzigd_op` | TEXT | Automatische timestamp | Tijdstip van wijziging |

Toegestane soorten zijn:

- `product_toegevoegd`;
- `voorraad`;
- `prijs`;
- `beschikbaarheid`.

Bij opnieuw opslaan van exact dezelfde voorraad, prijs of beschikbaarheid wordt geen overbodige historieregel toegevoegd.

### 5.5 Migratie en beginwaarden

Bij bestaande databases controleert `database.js` of `prijs_cent` en `eenheid` al bestaan. Ontbrekende kolommen worden toegevoegd zonder bestaande producten te verwijderen. Bij een volledig lege producttabel worden drie voorbeeldproducten toegevoegd.

## 6. API-ontwerp

### 6.1 Routeoverzicht

| Methode | Route | Login | Functie |
|---|---|---|---|
| GET | `/api/producten` | Nee | Alle producten ophalen |
| POST | `/api/inloggen` | Nee | Medewerker inloggen |
| GET | `/api/sessie` | Ja | Actieve medewerker opvragen |
| POST | `/api/uitloggen` | Ja | Sessie beëindigen |
| GET | `/api/wijzigingen` | Ja | Honderd nieuwste wijzigingen ophalen |
| POST | `/api/producten` | Ja | Product toevoegen |
| PATCH | `/api/producten/:id/voorraad` | Ja | Voorraad verhogen of verlagen |
| PUT | `/api/producten/:id/voorraad` | Ja | Voorraad exact instellen |
| PUT | `/api/producten/:id/prijs` | Ja | Prijs en eenheid instellen |
| PUT | `/api/producten/:id/beschikbaarheid` | Ja | Beschikbaarheid instellen |

`/beheer.html` is geen API-route, maar wordt ook door de server beschermd. Zonder sessie volgt een redirect naar `/inloggen.html`.

### 6.2 Productrepresentatie

```json
{
  "id": 1,
  "naam": "Verse melk",
  "voorraad": 8,
  "prijs_cent": 180,
  "eenheid": "liter",
  "beschikbaar": 1
}
```

Prijzen worden als gehele centen verstuurd. Hierdoor ontstaan geen afrondingsproblemen met kommagetallen.

### 6.3 Nieuw product

```http
POST /api/producten
Content-Type: application/json
```

```json
{
  "naam": "Verse melk",
  "voorraad": 6,
  "prijs_cent": 180,
  "eenheid": "liter"
}
```

Validatie:

- naam: 2 t/m 100 tekens;
- voorraad: geheel getal van 0 t/m 10.000;
- prijs: geheel aantal centen van 1 t/m 1.000.000;
- eenheid: 1 t/m 30 tekens;
- naam mag niet hoofdletterongevoelig dubbel bestaan.

### 6.4 Voorraad relatief wijzigen

```http
PATCH /api/producten/:id/voorraad
```

```json
{ "verschil": -1 }
```

`verschil` moet een geheel getal van -1000 t/m 1000 zijn en mag niet 0 zijn. De SQL-update voert optellen en controle op een negatieve uitkomst in één opdracht uit. Hierdoor blijft ook bij gelijktijdige aanvragen de voorraad minimaal nul.

### 6.5 Voorraad exact instellen

```http
PUT /api/producten/:id/voorraad
```

```json
{ "voorraad": 12 }
```

De voorraad moet een geheel getal van 0 t/m 10.000 zijn.

### 6.6 Prijs en verkoopeenheid wijzigen

```http
PUT /api/producten/:id/prijs
```

```json
{
  "prijs_cent": 195,
  "eenheid": "liter"
}
```

Prijs en eenheid worden samen verwerkt, zodat geen onduidelijke combinatie van een nieuwe prijs met een oude eenheid ontstaat.

### 6.7 Beschikbaarheid wijzigen

```http
PUT /api/producten/:id/beschikbaarheid
```

```json
{ "beschikbaar": false }
```

De voorraad blijft ongewijzigd wanneer alleen de status verandert.

### 6.8 Historie ophalen

```http
GET /api/wijzigingen
```

De beveiligde route koppelt `wijzigingen`, `producten` en `medewerkers`, sorteert nieuwste eerst en geeft maximaal honderd regels terug.

```json
{
  "id": 12,
  "productnaam": "Verse melk",
  "medewerker": "medewerker1",
  "soort": "voorraad",
  "oude_waarde": "6",
  "nieuwe_waarde": "5",
  "gewijzigd_op": "2026-09-04T10:30:00Z"
}
```

### 6.9 HTTP-statuscodes

| Status | Betekenis |
|---|---|
| 200 | Aanvraag geslaagd |
| 201 | Product aangemaakt |
| 302 | Browserredirect naar login |
| 400 | Ongeldige invoer |
| 401 | Ongeldige login of geen geldige sessie |
| 404 | Product of route niet gevonden |
| 409 | Productnaam bestaat al |
| 500 | Onverwachte server- of databasefout |

API-fouten worden als JSON teruggestuurd, bijvoorbeeld:

```json
{ "fout": "De voorraad mag niet lager dan 0 worden." }
```

## 7. Security

### 7.1 Authenticatie en wachtwoorden

Medewerkers loggen in met gebruikersnaam en wachtwoord. `wachtwoorden.js` gebruikt:

- `randomBytes` voor een uniek zout;
- `scrypt` voor de wachtwoordhash;
- `timingSafeEqual` voor veilige vergelijking.

Bij verkeerde gegevens wordt niet verteld welk veld fout was.

### 7.2 Sessies

Na een geldige login wordt de sessie opnieuw aangemaakt. De cookie gebruikt:

- `httpOnly`;
- `sameSite: "lax"`;
- een maximale geldigheid van acht uur;
- een sessiegeheim van minimaal 64 tekens.

De huidige `MemoryStore` is alleen geschikt voor het lokale prototype. Sessies verdwijnen bij een serverherstart.

### 7.3 Autorisatie

`GET /api/producten` is openbaar en alleen-lezen. De beheerpagina, wijzigende productroutes, sessiegegevens, uitloggen en wijzigingshistorie vereisen een sessie via `vereisLogin`.

### 7.4 Invoervalidatie en SQL

De backend valideert datatype, bereik en lengte. SQL-query's gebruiken parameters met `?`, waardoor gebruikersinvoer niet rechtstreeks in SQL-tekst terechtkomt. Databasechecks vormen een tweede beschermingslaag voor voorraad, prijs en beschikbaarheid.

### 7.5 Geheimen

Beginwachtwoorden en sessiegeheim staan in `.env`. `.env`, `data/voorraad.db` en `node_modules` staan in `.gitignore`. `.env.example` bevat alleen lege voorbeeldvariabelen.

### 7.6 Bekende risico's

| Risico | Gevolg | Verbetering voor productie |
|---|---|---|
| Alleen lokaal HTTP | Verkeer is niet versleuteld | HTTPS en `secure` cookies |
| Geen login-rate-limit | Veel wachtwoordpogingen mogelijk | Rate-limiting en tijdelijke blokkering |
| Sessies in geheugen | Sessies verdwijnen bij herstart | Permanente sessieopslag |
| Geen apart CSRF-token | Misbruik van ingelogde browser mogelijk | CSRF-bescherming |
| Lokaal databasebestand | Gegevensverlies bij schijfprobleem | Back-ups en bestandsrechten |
| Productupdate en historie-insert zijn aparte opdrachten | Bij een zeldzame insertfout kan historie ontbreken | Beide opdrachten in één database-transactie uitvoeren |

## 8. Foutafhandeling

De frontend controleert het `Content-Type` voordat JSON wordt gelezen. Daardoor wordt een onverwachte HTML-foutpagina vertaald naar een begrijpelijke melding in plaats van `Unexpected token '<'`.

Bij status 401 stuurt de beheerpagina de medewerker terug naar de loginpagina. Tijdens een aanvraag wordt de gebruikte knop tijdelijk uitgeschakeld. Het publieke scherm bewaart reeds geladen kaarten bij een latere storing en probeert na 30 seconden opnieuw.

## 9. E-inkkeuzes

E-ink ververst langzamer dan LCD of OLED en kan ghosting tonen. Daarom gebruikt de publieke pagina:

- zwart-witcontrast;
- grote letters en eenvoudige kaarten;
- tekst naast visuele statusverschillen;
- geen animaties;
- geen beheerknoppen;
- een dynamisch raster en aangepaste lettergrootte;
- één gegevensaanvraag per 30 seconden.

De pagina is gesimuleerd op 800x600, 600x800, 1200x825 en 1280x720. Het echte 9-inchscherm is nog niet geleverd. Na levering moeten resolutie, browser, wifi, slaapstand, volledig scherm, ghosting en toegestane refreshmodus opnieuw worden getest.

Bronnen voor het e-inkonderzoek:

- [E Ink - Benefits](https://www.eink.com/tech/detail/Benefits)
- [E Ink - FAQ](https://www.eink.com/tech/detail/FAQ)
- [Waveshare - 9.7-inch e-Paper HAT](https://www.waveshare.com/wiki/9.7inch_e-Paper_HAT)

## 10. Test- en beheerstrategie

- `npm run check` controleert de JavaScript-syntax;
- API-tests controleren statuscodes, JSON, validatie en autorisatie;
- herstelbare tests zetten tijdelijke voorraad- en statuswijzigingen terug;
- browsertests controleren mobiel gebruik, foutmeldingen en e-inkindeling;
- `npm audit --omit=dev` controleert bekende productie-afhankelijkheden;
- het persoonlijke AI-logboek legt relevante AI-interacties en controles vast.

De uitgevoerde gevallen en resultaten staan in [Testplan.md](Testplan.md).

## 11. Conclusie

De oplossing gebruikt een overzichtelijke browserfrontend, een Express-API en drie gekoppelde SQLite-tabellen. De applicatie ondersteunt beveiligd productbeheer, flexibele prijzen per verkoopeenheid, wijzigingshistorie en een automatisch vernieuwend publiek scherm.

De techniek is geschikt voor het lokale schoolprototype. Voor productie en de definitieve e-inkinstallatie zijn aanvullende beveiligings-, back-up- en hardwaremaatregelen nodig.
