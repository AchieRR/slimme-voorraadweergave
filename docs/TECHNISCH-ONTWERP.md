# Technisch ontwerp – Slimme voorraadweergave

## 1. Doel van het technisch ontwerp

Dit document beschrijft hoe de slimme voorraadweergave technisch
is opgebouwd.

Het systeem bestaat uit:

- een publieke voorraadpagina voor gasten;
- een mobiele beheeromgeving voor medewerkers;
- een backend met een API;
- authenticatie met medewerkerssessies;
- een SQLite-database voor permanente opslag.

## 2. Architectuur

### 2.1 Architectuuroverzicht

De applicatie gebruikt een architectuur met drie lagen:

1. De gebruikersinterfaces in de browser.
2. De Node.js-backend met Express.
3. De SQLite-database.

```text
+-------------------------+       +-------------------------+
| Publiek e-inkscherm     |       | Telefoon medewerker    |
|                         |       |                         |
| index.html              |       | inloggen.html          |
| app.js                  |       | beheer.html            |
| style.css               |       | beheer.js              |
+------------+------------+       +------------+------------+
             |                                 |
             | HTTP-aanvragen en JSON          |
             +----------------+----------------+
                              |
                              v
                 +-------------------------+
                 | Node.js en Express      |
                 |                         |
                 | server.js               |
                 | API-routes              |
                 | sessies                 |
                 | invoervalidatie         |
                 +------------+------------+
                              |
                              v
                 +-------------------------+
                 | SQLite-database         |
                 |                         |
                 | producten               |
                 | medewerkers             |
                 +-------------------------+
```

### 2.2 Onderdelen

#### Publieke voorraadpagina

De publieke pagina bestaat uit `index.html`, `style.css` en
`app.js`. Deze pagina kan zonder login worden geopend.

`app.js` haalt producten op via de API en maakt voor ieder product
een kaart met de naam, voorraad en beschikbaarheidsstatus.

#### Inlogpagina

De inlogpagina bestaat uit `inloggen.html`, `inloggen.css` en
`inloggen.js`. De ingevulde gegevens worden naar de backend
gestuurd. De backend controleert de gebruikersnaam en het
wachtwoord.

#### Beheerpagina

De beheerpagina bestaat uit `beheer.html`, `beheer.css` en
`beheer.js`. Alleen ingelogde medewerkers mogen deze pagina
gebruiken.

Via deze pagina kunnen medewerkers producten toevoegen, voorraad
aanpassen en de beschikbaarheid wijzigen.

#### Backend

De backend staat in `server.js` en gebruikt Node.js met Express.

De backend:

- levert de HTML-, CSS- en JavaScriptbestanden;
- ontvangt API-aanvragen;
- controleert invoer;
- controleert medewerkerssessies;
- leest en wijzigt gegevens in de database;
- geeft resultaten en foutmeldingen terug als JSON.

#### Database

De databaseverbinding en tabellen worden geregeld in
`database.js`. De gegevens worden opgeslagen in de lokale
SQLite-database `data/voorraad.db`.

Hierdoor blijven producten en voorraadwaarden bestaan nadat de
server opnieuw is gestart.

#### Wachtwoordbeveiliging

De functies voor wachtwoordbeveiliging staan in
`wachtwoorden.js`. Wachtwoorden worden niet als leesbare tekst in
de database opgeslagen.

## 3. Gegevensstromen

### 3.1 Publieke voorraad bekijken

1. De browser opent de publieke pagina.
2. `app.js` verstuurt een GET-aanvraag naar `/api/producten`.
3. De backend haalt de producten uit SQLite.
4. De backend stuurt de producten terug als JSON.
5. JavaScript toont de producten op het scherm.
6. Deze aanvraag wordt iedere 60 seconden opnieuw uitgevoerd.

### 3.2 Medewerker logt in

1. De medewerker vult de inloggegevens in.
2. De browser stuurt deze gegevens naar de backend.
3. De backend zoekt de medewerker in de database.
4. Het wachtwoord wordt veilig gecontroleerd.
5. Bij correcte gegevens maakt de server een sessie aan.
6. De medewerker krijgt toegang tot de beheerpagina.

### 3.3 Voorraad wijzigen

1. De medewerker gebruikt een knop of invoerveld.
2. JavaScript stuurt de wijziging naar een beveiligde API-route.
3. De backend controleert of de medewerker is ingelogd.
4. De backend controleert of de invoer geldig is.
5. De voorraad wordt in SQLite aangepast.
6. De nieuwe productgegevens worden als JSON teruggestuurd.
7. De beheerpagina toont de bijgewerkte voorraad.

## 4. Technologiekeuzes

### 4.1 HTML

HTML wordt gebruikt voor de structuur van de publieke pagina,
inlogpagina en beheerpagina.

Er is gekozen voor gewone HTML omdat de applicatie uit een klein
aantal pagina's bestaat. De pagina's blijven hierdoor eenvoudig
en werken zonder een extra buildproces.

### 4.2 CSS

CSS wordt gebruikt voor de vormgeving en responsive indeling.

De publieke pagina gebruikt een zwart-witontwerp met een hoog
contrast. Met CSS Grid en flexibele afmetingen kunnen de
productkaarten zich aanpassen aan verschillende schermformaten.

### 4.3 JavaScript zonder frontend-framework

De browser gebruikt gewone JavaScript voor:

- API-aanvragen met `fetch`;
- het maken en bijwerken van productkaarten;
- formulierverwerking;
- foutmeldingen;
- automatisch vernieuwen.

React of Vue was voor dit prototype niet nodig. De gebruikersinterface
is klein en heeft geen ingewikkelde onderdelen. Gewone JavaScript
zorgt voor minder afhankelijkheden en is voor mij duidelijker uit
te leggen.

Voor een veel grotere applicatie met veel pagina's en herbruikbare
onderdelen kan een frontend-framework later wel handig zijn.

### 4.4 Node.js

De backend draait op Node.js.

Hierdoor kan JavaScript zowel in de browser als op de server worden
gebruikt. Node.js kan HTTP-aanvragen verwerken en beschikt over
ingebouwde functies voor bestanden, beveiliging en SQLite.

### 4.5 Express

Express wordt gebruikt voor de webserver en API-routes.

Express maakt het eenvoudiger om:

- publieke bestanden beschikbaar te maken;
- JSON-aanvragen te verwerken;
- verschillende API-routes te maken;
- middleware voor sessies en beveiliging te gebruiken;
- HTTP-statuscodes en foutmeldingen terug te sturen.

Zonder Express zouden meer onderdelen van de HTTP-server handmatig
gebouwd moeten worden.

### 4.6 SQLite

SQLite wordt gebruikt voor de database. De database wordt opgeslagen
als één lokaal bestand.

SQLite past bij dit prototype omdat:

- geen aparte databaseserver nodig is;
- de gegevens na een serverherstart bewaard blijven;
- het systeem maar door een klein aantal medewerkers wordt gebruikt;
- de database eenvoudig lokaal getest kan worden.

Voor een grotere productieomgeving met veel gelijktijdige gebruikers
of meerdere servers zou PostgreSQL of MySQL geschikter kunnen zijn.

### 4.7 Sessies

De package `express-session` wordt gebruikt om medewerkers ingelogd
te houden. Na een geldige login ontvangt de browser een sessiecookie.
De server gebruikt deze sessie om beveiligde pagina's en API-routes
te controleren.

De huidige sessies worden in het geheugen van de server opgeslagen.
Dit is voldoende voor het prototype, maar niet voor een grote
productieomgeving. Daarvoor zou een aparte sessieopslag nodig zijn.

### 4.8 Wachtwoordbeveiliging

De ingebouwde module `node:crypto` wordt gebruikt om wachtwoorden
met `scrypt` en een uniek zout te hashen.

Hierdoor worden de echte wachtwoorden niet in de database opgeslagen.
Bij het inloggen wordt de berekende hash veilig vergeleken met de
opgeslagen hash.

### 4.9 Omgevingsvariabelen

Geheime gegevens staan in het lokale `.env`-bestand. Hieronder vallen:

- het sessiegeheim;
- de beginwachtwoorden van de medewerkers.

Het echte `.env`-bestand wordt niet naar GitHub gestuurd.
`.env.example` laat alleen zien welke variabelen nodig zijn, zonder
de echte geheime waarden te bevatten.

### 4.10 Hosting

Het prototype draait momenteel op een lokale Node.js-server.

Dit is geschikt voor ontwikkeling en demonstratie. Voor echt gebruik
moet de applicatie op een server binnen het netwerk of op een
hostingplatform worden geplaatst. Daarbij moeten HTTPS en een
permanente sessieopslag worden ingesteld.

## 5. Datamodel

### 5.1 Overzicht

De SQLite-database bevat twee tabellen:

```text
+-----------------------+     +-----------------------+
| producten             |     | medewerkers          |
+-----------------------+     +-----------------------+
| id                    |     | id                    |
| naam                  |     | gebruikersnaam       |
| voorraad              |     | wachtwoord_hash      |
| beschikbaar           |     | zout                  |
|                       |     | aangemaakt_op         |
+-----------------------+     +-----------------------+
```

De tabellen hebben op dit moment geen directe relatie met elkaar.
De applicatie bewaart namelijk nog niet welke medewerker een
voorraadwijziging heeft uitgevoerd.

### 5.2 Tabel producten

De tabel `producten` bevat alle producten die op het publieke
scherm en de beheerpagina worden getoond.

| Veld | Datatype | Regels | Uitleg |
|---|---|---|---|
| `id` | INTEGER | Primary key en automatisch nummer | Uniek nummer van het product |
| `naam` | TEXT | Verplicht en uniek | Naam van het product |
| `voorraad` | INTEGER | Verplicht, standaard 0 en minimaal 0 | Actuele hoeveelheid op voorraad |
| `beschikbaar` | INTEGER | Verplicht, standaard 1 en alleen 0 of 1 | Geeft aan of het product verkocht kan worden |

SQLite gebruikt voor `beschikbaar` de waarde `1` voor beschikbaar
en `0` voor tijdelijk niet beschikbaar.

De database controleert zelf dat de voorraad niet negatief kan
worden en dat beschikbaarheid alleen 0 of 1 is.

### 5.3 Tabel medewerkers

De tabel `medewerkers` bevat de accounts die toegang hebben tot
het voorraadbeheer.

| Veld | Datatype | Regels | Uitleg |
|---|---|---|---|
| `id` | INTEGER | Primary key en automatisch nummer | Uniek nummer van de medewerker |
| `gebruikersnaam` | TEXT | Verplicht, uniek en niet hoofdlettergevoelig | Naam waarmee de medewerker inlogt |
| `wachtwoord_hash` | TEXT | Verplicht | Beveiligde hash van het wachtwoord |
| `zout` | TEXT | Verplicht | Willekeurige waarde voor het hashen |
| `aangemaakt_op` | TEXT | Automatisch ingevuld | Datum en tijd waarop het account is aangemaakt |

Het echte wachtwoord wordt niet in deze tabel opgeslagen. Alleen
de hash en het unieke zout worden bewaard.

### 5.4 Databasebeperkingen

De tabellen zijn als `STRICT` aangemaakt. Daardoor accepteert
SQLite alleen waarden die bij het ingestelde datatype passen.

Andere belangrijke beperkingen zijn:

- productnamen moeten uniek zijn;
- gebruikersnamen moeten uniek zijn;
- gebruikersnamen zijn niet hoofdlettergevoelig;
- de voorraad mag niet lager dan 0 zijn;
- beschikbaarheid mag alleen 0 of 1 zijn;
- verplichte velden mogen niet leeg zijn.

### 5.5 Aanmaken van de database

Bij het starten van de applicatie opent `database.js` het bestand
`data/voorraad.db`.

Als de tabellen nog niet bestaan, worden ze automatisch aangemaakt.
Wanneer de producttabel leeg is, worden enkele voorbeeldproducten
toegevoegd.

Wanneer de medewerkerstabel leeg is, kunnen twee medewerkersaccounts
worden aangemaakt met de wachtwoorden uit de omgevingsvariabelen.

Het databasebestand staat in `.gitignore`. Hierdoor wordt de lokale
voorraad met accountgegevens niet naar GitHub gestuurd.

### 5.6 Mogelijke uitbreiding

Een toekomstige versie kan een extra tabel voor voorraadmutaties
krijgen. Daarmee kan worden opgeslagen:

- welke medewerker een wijziging uitvoerde;
- welk product werd gewijzigd;
- wat de oude en nieuwe voorraad waren;
- wanneer de wijziging plaatsvond.

Deze wijzigingsgeschiedenis is een bonusfunctie en valt buiten de
huidige versie.

## 6. API-ontwerp

### 6.1 Overzicht van de routes

| Methode | Route | Login nodig | Functie |
|---|---|---|---|
| GET | `/api/producten` | Nee | Alle producten ophalen |
| POST | `/api/inloggen` | Nee | Medewerker inloggen |
| GET | `/api/sessie` | Ja | Huidige medewerker opvragen |
| POST | `/api/uitloggen` | Ja | Medewerker uitloggen |
| POST | `/api/producten` | Ja | Nieuw product toevoegen |
| PATCH | `/api/producten/:id/voorraad` | Ja | Voorraad verhogen of verlagen |
| PUT | `/api/producten/:id/voorraad` | Ja | Voorraad exact instellen |
| PUT | `/api/producten/:id/beschikbaarheid` | Ja | Beschikbaarheid aanpassen |

De route `/beheer.html` is geen API-route, maar is ook beveiligd.
Zonder geldige sessie stuurt de server de browser door naar
`/inloggen.html`.

### 6.2 Producten ophalen

```http
GET /api/producten
```

Deze publieke route geeft een JSON-lijst terug met alle producten.

Voorbeeld van één product:

```json
{
  "id": 1,
  "naam": "Verse melk",
  "voorraad": 8,
  "beschikbaar": 1
}
```

### 6.3 Inloggen

```http
POST /api/inloggen
Content-Type: application/json
```

Voorbeeld van de aanvraag:

```json
{
  "gebruikersnaam": "medewerker1",
  "wachtwoord": "ingevuld-wachtwoord"
}
```

Bij correcte gegevens maakt de server een sessie aan. Het echte
wachtwoord wordt nooit teruggestuurd.

### 6.4 Sessie controleren en uitloggen

Met `GET /api/sessie` controleert de beheerpagina of de medewerker
nog is ingelogd. Bij een geldige sessie wordt de gebruikersnaam
teruggestuurd.

Met `POST /api/uitloggen` wordt de sessie verwijderd en wordt de
sessiecookie uit de browser gewist.

### 6.5 Nieuw product toevoegen

```http
POST /api/producten
Content-Type: application/json
```

Voorbeeld:

```json
{
  "naam": "Frisdrank",
  "voorraad": 5
}
```

De naam moet tussen 2 en 100 tekens bevatten. De voorraad moet een
geheel getal tussen 0 en 10000 zijn. Een dubbele productnaam wordt
geweigerd.

### 6.6 Voorraad verhogen of verlagen

```http
PATCH /api/producten/:id/voorraad
Content-Type: application/json
```

Voorbeeld voor één product verkopen:

```json
{
  "verschil": -1
}
```

Voorbeeld voor één product toevoegen:

```json
{
  "verschil": 1
}
```

Het verschil moet een geheel getal tussen -1000 en 1000 zijn en
mag niet 0 zijn. De wijziging wordt geweigerd als de voorraad
daardoor negatief zou worden.

### 6.7 Voorraad exact instellen

```http
PUT /api/producten/:id/voorraad
Content-Type: application/json
```

Voorbeeld:

```json
{
  "voorraad": 12
}
```

De voorraad moet een geheel getal tussen 0 en 10000 zijn.

### 6.8 Beschikbaarheid aanpassen

```http
PUT /api/producten/:id/beschikbaarheid
Content-Type: application/json
```

Voorbeeld voor tijdelijk niet beschikbaar:

```json
{
  "beschikbaar": false
}
```

Voorbeeld voor opnieuw beschikbaar:

```json
{
  "beschikbaar": true
}
```

De voorraadwaarde verandert niet wanneer alleen de
beschikbaarheidsstatus wordt aangepast.

### 6.9 HTTP-statuscodes

| Statuscode | Betekenis binnen deze applicatie |
|---|---|
| 200 | De aanvraag is geslaagd |
| 201 | Een nieuw product is aangemaakt |
| 302 | De browser wordt doorgestuurd naar de inlogpagina |
| 400 | De ingevoerde gegevens zijn ongeldig |
| 401 | De login is ongeldig of de gebruiker is niet ingelogd |
| 404 | Het gevraagde product bestaat niet |
| 409 | Er bestaat al een product met dezelfde naam |
| 500 | Er is een onverwachte fout op de server ontstaan |

API-fouten worden als JSON teruggestuurd:

```json
{
  "fout": "Beschrijving van de fout."
}
```

## 7. Security

### 7.1 Authenticatie

Authenticatie controleert wie de gebruiker is. Medewerkers loggen
in met een gebruikersnaam en wachtwoord.

De backend zoekt de gebruikersnaam in de tabel `medewerkers` en
controleert daarna het wachtwoord. Bij verkeerde gegevens geeft de
server een algemene foutmelding.

De melding vertelt niet of alleen de gebruikersnaam of alleen het
wachtwoord fout was. Daardoor krijgt een aanvaller minder informatie.

### 7.2 Wachtwoordopslag

Wachtwoorden worden niet als leesbare tekst opgeslagen.

`wachtwoorden.js` gebruikt:

- `randomBytes` voor een uniek zout;
- `scrypt` voor het maken van de wachtwoordhash;
- `timingSafeEqual` voor een veilige vergelijking.

Iedere medewerker krijgt een eigen willekeurig zout. Hierdoor
krijgen twee gelijke wachtwoorden niet automatisch dezelfde
opgeslagen hash.

De beginwachtwoorden moeten minimaal twaalf tekens bevatten.

### 7.3 Sessiebeveiliging

Na een geldige login maakt de server een medewerkerssessie aan.
De sessie wordt tijdens het inloggen opnieuw aangemaakt. Dit helpt
tegen misbruik van een bestaande sessiecode.

De sessiecookie gebruikt:

- `httpOnly`, waardoor JavaScript de cookie niet kan uitlezen;
- `sameSite: "lax"`, wat bescherming geeft tegen sommige
  ongewenste aanvragen vanaf andere websites;
- een maximale geldigheid van acht uur;
- een sessiegeheim van minimaal 64 tekens.

Bij uitloggen wordt de sessie vernietigd en wordt de cookie gewist.

### 7.4 Autorisatie

Autorisatie bepaalt wat een ingelogde gebruiker mag uitvoeren.

De middleware `vereisLogin` controleert of een medewerkerssessie
bestaat. Zonder geldige sessie geeft een beveiligde API-route
statuscode 401 terug.

De publieke route `GET /api/producten` mag zonder login worden
gebruikt. Deze route kan alleen gegevens lezen.

Voor de volgende handelingen is een login verplicht:

- producten toevoegen;
- voorraad verhogen of verlagen;
- voorraad exact instellen;
- beschikbaarheid wijzigen;
- sessiegegevens bekijken;
- uitloggen;
- de beheerpagina openen.

Hierdoor kan een gast de voorraad bekijken, maar niet wijzigen.

### 7.5 Invoervalidatie

De backend vertrouwt invoer uit de browser niet automatisch.

De server controleert onder andere:

- of een gebruikersnaam en wachtwoord tekst zijn;
- de minimale en maximale lengte van namen;
- of voorraadwaarden gehele getallen zijn;
- of de voorraad tussen 0 en 10000 ligt;
- of een voorraadverschil geldig is;
- of beschikbaarheid een boolean is;
- of een productnummer een geldig geheel getal is.

Databasequery's gebruiken parameters met `?`. Gebruikersinvoer
wordt daardoor niet rechtstreeks in SQL-tekst geplaatst. Dit
verkleint het risico op SQL-injectie.

### 7.6 Geheimen en lokale gegevens

Het sessiegeheim en de beginwachtwoorden staan in `.env`.

Het `.env`-bestand, de SQLite-database en geïnstalleerde packages
staan in `.gitignore`. Daardoor worden wachtwoorden, sessiegeheimen
en lokale databasegegevens niet naar GitHub gestuurd.

Het bestand `.env.example` bevat alleen de namen van de benodigde
variabelen en geen echte geheimen.

### 7.7 Bekende risico's en verbeteringen

Het huidige systeem is een prototype. Voor echt gebruik zijn nog
extra maatregelen nodig.

| Risico | Mogelijke verbetering |
|---|---|
| De lokale server gebruikt HTTP | HTTPS instellen en de cookie `secure` maken |
| Iemand kan vaak proberen in te loggen | Rate-limiting en tijdelijke blokkering toevoegen |
| Sessies staan in het servergeheugen | Permanente sessieopslag gebruiken |
| Er is geen apart CSRF-token | CSRF-bescherming toevoegen |
| De database is een lokaal bestand | Bestandsrechten en automatische back-ups instellen |
| Alle medewerkers hebben dezelfde rechten | Rollen en rechten toevoegen als dat later nodig is |

De instelling `secure` van de sessiecookie staat nu op `false`,
omdat het prototype lokaal via HTTP draait. Bij gebruik van HTTPS
moet deze instelling op `true` worden gezet.

### 7.8 Securityconclusie

Het prototype beschermt wachtwoorden met hashing, gebruikt
medewerkerssessies en blokkeert niet-ingelogde wijzigingen.

De beveiliging is geschikt voor het lokale schoolprototype.
Voordat het systeem via internet wordt gebruikt, moeten minimaal
HTTPS, rate-limiting en permanente sessieopslag worden toegevoegd.

## 8. Foutafhandeling

### 8.1 Fouten in de backend

De API-routes gebruiken `try` en `catch` om onverwachte fouten op
te vangen.

De gebruiker ontvangt een korte JSON-foutmelding. Technische
informatie wordt alleen in de serverconsole geplaatst. Hierdoor
krijgt de gebruiker geen ingewikkelde interne foutmelding te zien.

De server gebruikt verschillende statuscodes om het soort fout
duidelijk te maken, zoals 400, 401, 404, 409 en 500.

### 8.2 Fouten in de beheeromgeving

`beheer.js` controleert of een antwoord werkelijk JSON bevat.
Hierdoor wordt een onverwachte HTML-pagina niet rechtstreeks als
JSON verwerkt.

Als de sessie verlopen is en de server status 401 teruggeeft, wordt
de medewerker naar de inlogpagina gestuurd.

Tijdens een wijziging wordt de gebruikte knop tijdelijk
uitgeschakeld. Daardoor kan een medewerker niet direct meerdere
identieke aanvragen versturen door snel achter elkaar te klikken.

### 8.3 Fouten op het publieke scherm

Als de eerste API-aanvraag mislukt, toont het publieke scherm:

`Geen verbinding met de voorraad.`

Wanneer er al producten zijn geladen en een latere aanvraag mislukt,
blijven deze producten zichtbaar. Daarbij verschijnt de melding dat
de laatst geladen voorraad wordt getoond.

Zodra de verbinding hersteld is, worden de actuele producten opnieuw
geladen en verdwijnt de waarschuwing.

### 8.4 Gelijktijdige voorraadwijzigingen

De voorraad wordt in één SQL-opdracht verhoogd of verlaagd.

Dezelfde opdracht controleert of de nieuwe voorraad minimaal nul
blijft. Hierdoor kunnen twee medewerkers niet samen zorgen dat de
voorraad door gelijktijdige min-aanvragen negatief wordt.

Voor een grotere omgeving kan later een mutatiegeschiedenis of
uitgebreidere transactieverwerking worden toegevoegd.

## 9. E-inkonderzoek

### 9.1 Werking van e-ink

Een e-inkscherm is een reflecterend scherm. Het gebruikt
omgevingslicht in plaats van een normale achtergrondverlichting.
Daardoor is tekst goed leesbaar en lijkt het scherm op papier.

E-ink is bistabiel. Dat betekent dat het scherm geen energie nodig
heeft om een stilstaand beeld vast te houden. Energie is vooral
nodig wanneer het beeld wordt veranderd.

Het apparaat rond het scherm, zoals een Raspberry Pi, controller
of wifi-module, heeft wel stroom nodig om nieuwe voorraadgegevens
op te halen.

### 9.2 Verschillen met een normaal scherm

| Onderdeel | E-inkscherm | Normaal LCD- of OLED-scherm |
|---|---|---|
| Stilstaand beeld | Gebruikt zeer weinig schermenergie | Gebruikt voortdurend energie |
| Licht | Reflecteert omgevingslicht | Gebruikt eigen verlichting |
| Verversing | Langzamer en kan flitsen | Snel en vloeiend |
| Kleuren | Afhankelijk van het scherm en vaak beperkt | Veel kleuren |
| Animaties | Minder geschikt | Goed geschikt |
| Leesbaarheid | Geschikt voor rustige tekstweergave | Geschikt voor bewegend beeld |

### 9.3 Ghosting

Na meerdere verversingen kunnen resten van het vorige beeld zichtbaar
blijven. Dit heet ghosting.

Een volledige schermverversing kan ghosting verminderen, maar kan
zichtbaar flitsen. Welke refreshmodi beschikbaar zijn, hangt af van
het gekozen scherm en de controller.

Daarom gebruikt de voorraadpagina geen animaties en zo weinig
mogelijk onnodige veranderingen.

### 9.4 Keuzes voor de voorraadpagina

De publieke pagina gebruikt:

- zwarte tekst op een witte achtergrond;
- grote letters;
- eenvoudige productkaarten;
- geen animaties;
- geen bedieningselementen;
- weinig visuele afleiding;
- een dynamisch raster;
- alle producten zonder scrollen;
- automatisch ophalen van gegevens iedere 60 seconden.

Het ontwerp gebruikt geen kleur als enige manier om een status
duidelijk te maken. De status wordt ook altijd met tekst aangegeven.

### 9.5 Schermresolutie

Het echte 9-inchscherm is nog niet geleverd en de resolutie is nog
niet bekend.

De pagina is daarom voorlopig getest op:

- 800 bij 600 pixels;
- 600 bij 800 pixels;
- 1200 bij 825 pixels;
- 1280 bij 720 pixels.

Een bestaand 9,7-inch e-papierpaneel van Waveshare gebruikt
bijvoorbeeld 1200 bij 825 pixels. Dit betekent niet dat het scherm
van dit project dezelfde resolutie heeft.

Na levering moet de pagina opnieuw op de echte resolutie worden
getest.

### 9.6 Browser, wifi en permanent gebruik

Een los e-inkpaneel heeft zelf niet automatisch een webbrowser of
wifi. Hiervoor is een controller of computer nodig.

Een gewone e-reader is niet automatisch geschikt, omdat de browser
beperkt kan zijn en het apparaat automatisch in slaap kan vallen.
Een e-inkmonitor met een Raspberry Pi of andere controller geeft
meer controle over wifi, volledig scherm en automatisch opstarten.

Na levering moet worden onderzocht:

- welk merk en model het scherm is;
- welke resolutie het scherm gebruikt;
- of een browser beschikbaar is;
- hoe het apparaat verbinding maakt met wifi;
- of de pagina automatisch volledig scherm kan openen;
- of het apparaat automatisch in slaap valt;
- of verversen iedere 60 seconden toegestaan is;
- hoeveel ghosting na meerdere verversingen zichtbaar is.

### 9.7 Geschiktheid

E-ink is geschikt voor deze voorraadweergave omdat de informatie
meestal stilstaat, goed leesbaar moet zijn en slechts af en toe
verandert.

De definitieve geschiktheid kan pas worden vastgesteld nadat het
echte scherm en de controller zijn getest.

De huidige verversing van 60 seconden komt uit de projectopdracht.
Als de fabrikant van het echte scherm een langer interval adviseert,
moet dit met de product owner worden besproken.

### 9.8 Bronnen

- [E Ink – Benefits](https://www.eink.com/tech/detail/Benefits)
- [E Ink – FAQ](https://www.eink.com/tech/detail/FAQ)
- [Waveshare – 9.7-inch e-Paper HAT](https://www.waveshare.com/wiki/9.7inch_e-Paper_HAT)

## 10. Conclusie technisch ontwerp

De applicatie bestaat uit een eenvoudige browserfrontend, een
Node.js-backend met Express en een SQLite-database.

De backend verzorgt authenticatie, autorisatie, invoervalidatie en
de API. De frontend bestaat uit een publieke voorraadweergave en
een beveiligde mobiele beheeromgeving.

De gekozen oplossing voldoet aan de technische eisen van het
schoolprototype. Voor gebruik via internet of op echte e-inkhardware
zijn nog aanvullende beveiligings- en hardwaretests nodig.