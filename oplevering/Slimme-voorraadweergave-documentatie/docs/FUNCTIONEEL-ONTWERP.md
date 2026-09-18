# Functioneel ontwerp - Slimme voorraadweergave

**Versie:** 2.0

**Datum:** 4 september 2026

**Doelgroep:** product owner, docent, ontwikkelaars en testers

## 1. Probleemanalyse

### 1.1 Het probleem

De camping en appartementenverhuur verkoopt bij de receptie verse en gekoelde producten, zoals melk, yoghurt, ijsjes en frisdrank. Gasten kunnen niet direct zien wat beschikbaar is, hoeveel er nog is en wat een product kost. Daardoor moeten zij dit steeds aan een medewerker vragen.

Medewerkers moeten na een verkoop of levering de voorraad snel kunnen bijwerken. Omdat minimaal twee medewerkers het systeem gebruiken, moet alleen bevoegd personeel wijzigingen kunnen uitvoeren en moet achteraf zichtbaar zijn wie een wijziging heeft gedaan.

### 1.2 Het doel

Het project levert een klein informatiesysteem met twee gebruikerservaringen:

- een publiek e-inkvriendelijk scherm waarop gasten producten, prijzen, voorraad en status bekijken;
- een beveiligde mobiele beheerpagina waarop medewerkers producten beheren.

Een wijziging op de beheerpagina moet zonder handmatige bediening uiterlijk ongeveer 30 seconden later op het publieke scherm verschijnen.

### 1.3 Doelgroepen

#### Gasten

Gasten bekijken het publieke scherm vanaf enkele meters afstand. Zij moeten binnen enkele seconden kunnen begrijpen:

- welk product wordt aangeboden;
- wat één verkoopeenheid kost;
- hoeveel verkoopeenheden op voorraad zijn;
- of het product beschikbaar, uitverkocht of tijdelijk niet beschikbaar is.

Gasten kunnen niets wijzigen, bestellen of betalen.

#### Medewerkers

Minimaal twee niet-technische medewerkers gebruiken de beheerpagina op hun telefoon. Zij moeten met grote knoppen snel een verkoop, nieuwe levering, prijswijziging of tijdelijke onbeschikbaarheid kunnen verwerken.

## 2. Scope en eisen

### 2.1 Functionele eisen

Het systeem moet:

- meerdere producten permanent opslaan;
- productnaam, prijs, verkoopeenheid, voorraad en status tonen;
- nieuwe producten toevoegen met naam, beginvoorraad, prijs en eenheid;
- voorraad met één verhogen en verlagen;
- voorraad exact op een gekozen geheel getal instellen;
- voorkomen dat voorraad lager dan nul wordt;
- prijs en verkoopeenheid van een bestaand product wijzigen;
- een product tijdelijk niet beschikbaar en opnieuw beschikbaar maken;
- minimaal twee afzonderlijke medewerkersaccounts ondersteunen;
- het beheergedeelte en alle wijzigende routes beveiligen met een login;
- de publieke voorraadpagina zonder login tonen;
- het publieke scherm iedere 30 seconden automatisch bijwerken;
- de honderd nieuwste productwijzigingen aan een ingelogde medewerker tonen;
- per wijziging product, medewerker, soort, oude waarde, nieuwe waarde en tijdstip bewaren;
- gegevens na een serverherstart behouden;
- ongeldige invoer en technische fouten begrijpelijk afhandelen.

### 2.2 Niet-functionele eisen

Het systeem moet:

- eenvoudig uit te leggen en te gebruiken zijn;
- werken in een mobiele browser;
- duidelijke, voldoende grote bedieningsknoppen hebben;
- een hoog zwart-witcontrast gebruiken;
- geschikt zijn voor een e-inkscherm van ongeveer 9 inch;
- alle publieke productkaarten zonder scrollen tonen;
- geen animaties of onnodige beeldwisselingen gebruiken;
- wachtwoorden alleen als beveiligde hashes opslaan;
- geen geheime gegevens naar GitHub sturen.

### 2.3 Product-ownerbesluiten

- Prijs wordt per product opgeslagen in euro's en gekoppeld aan een flexibele verkoopeenheid, bijvoorbeeld `liter`, `stuk`, `fles` of `pak`.
- Een foutieve voorraad wordt hersteld door opnieuw het juiste totale aantal in te stellen; een undo-knop is niet nodig.
- De publieke pagina wordt maximaal iedere 30 seconden bijgewerkt.
- Twee medewerkers hebben ieder een eigen account.
- De beheerpagina toont wijzigingshistorie, zodat zichtbaar is wie een wijziging heeft uitgevoerd.
- Producten worden in deze versie niet verwijderd. Tijdelijke onbeschikbaarheid wordt met tekst getoond; een product verdwijnt niet automatisch.

### 2.4 Buiten de scope

De huidige versie bevat geen:

- webshop, winkelmandje of online betaling;
- klantaccounts of bestelfunctie;
- pushberichten;
- koppeling met een kassasysteem;
- productafbeeldingen of categorieën;
- product verwijderen of productnaam achteraf wijzigen;
- undo-knop;
- meerdere locaties;
- volledige offline modus.

## 3. Gebruikersscenario's

### 3.1 Gast bekijkt het aanbod

**Beginsituatie:** Het publieke scherm staat aan en heeft verbinding met de server.

1. De pagina haalt de actuele producten op.
2. De gast ziet per product naam, prijs per eenheid, voorraad en status.
3. Uitverkochte en tijdelijk niet beschikbare producten zijn duidelijk herkenbaar.
4. De gast gaat naar de receptie om een product te kopen.

**Verwacht resultaat:** De gast begrijpt het actuele aanbod zonder een medewerker om uitleg te vragen.

### 3.2 Medewerker logt in

**Beginsituatie:** De medewerker heeft een geldig account.

1. De medewerker opent de inlogpagina.
2. De medewerker vult gebruikersnaam en wachtwoord in.
3. De medewerker kiest `Inloggen`.
4. Bij correcte gegevens opent de beheerpagina.

**Verwacht resultaat:** Alleen een geldige medewerker krijgt toegang tot het voorraadbeheer.

### 3.3 Verkoop verwerken

**Beginsituatie:** De medewerker is ingelogd en een gast koopt één verkoopeenheid.

1. De medewerker zoekt het product.
2. De medewerker kiest `- 1`.
3. De nieuwe voorraad wordt opgeslagen en op de beheerpagina getoond.
4. De wijziging verschijnt direct in de historie.
5. Het publieke scherm toont de nieuwe voorraad uiterlijk ongeveer 30 seconden later.

**Verwacht resultaat:** De voorraad daalt precies met één en kan niet onder nul komen.

### 3.4 Nieuwe voorraad verwerken

1. De medewerker zoekt het juiste product.
2. De medewerker vult het nieuwe totale aantal in.
3. De medewerker kiest `Instellen`.
4. De nieuwe waarde wordt opgeslagen en in de historie vastgelegd.

**Verwacht resultaat:** Beheerpagina en publiek scherm tonen de nieuwe voorraad.

### 3.5 Nieuw product toevoegen

1. De medewerker vult productnaam en beginvoorraad in.
2. De medewerker vult een prijs in euro's en een verkoopeenheid in.
3. De medewerker kiest `Toevoegen`.
4. Het product verschijnt op de beheerpagina en publieke pagina.
5. De toevoeging verschijnt in de historie.

**Verwacht resultaat:** Het volledige product wordt blijvend opgeslagen. Een dubbele naam wordt geweigerd.

### 3.6 Prijs wijzigen

1. De medewerker zoekt een bestaand product.
2. De medewerker vult een nieuwe prijs en eventueel een nieuwe eenheid in.
3. De medewerker kiest `Prijs opslaan`.
4. De prijs wordt opgeslagen en in de historie vastgelegd.

**Verwacht resultaat:** De nieuwe prijs per eenheid verschijnt op beheerpagina en publiek scherm.

### 3.7 Beschikbaarheid wijzigen

1. De medewerker maakt een product tijdelijk niet beschikbaar.
2. De voorraadwaarde blijft behouden.
3. Het publieke scherm toont `Tijdelijk niet beschikbaar`.
4. De medewerker kan het product later opnieuw beschikbaar maken.

**Verwacht resultaat:** Alleen de status verandert en beide statuswijzigingen worden vastgelegd.

### 3.8 Wijzigingshistorie bekijken

1. De ingelogde medewerker opent `Wijzigingshistorie bekijken`.
2. De honderd nieuwste wijzigingen worden van nieuw naar oud getoond.
3. Iedere regel toont product, soort wijziging, oude en nieuwe waarde, medewerker en tijdstip.

**Verwacht resultaat:** Een medewerker kan achteraf controleren wat is gewijzigd en door wie.

### 3.9 Tijdelijke netwerkstoring

1. Het publieke scherm heeft eerder producten geladen.
2. Een volgende API-aanvraag mislukt.
3. De laatst geladen producten blijven zichtbaar met een waarschuwing.
4. Zodra de verbinding terugkomt, worden actuele gegevens opnieuw geladen.

**Verwacht resultaat:** Het scherm wordt niet leeg en herstelt automatisch.

## 4. Schermontwerpen

### 4.1 Publiek e-inkscherm

```text
+------------------------------------------------------+
| CAMPING EN APPARTEMENTEN                             |
| VANDAAG BESCHIKBAAR                                  |
+----------------+----------------+--------------------+
| Verse melk     | Yoghurt        | IJsjes             |
| EUR 1,80/liter | EUR 1,25/stuk  | EUR 2,00/stuk      |
| Voorraad: 8    | Voorraad: 4    | Voorraad: 0        |
| Beschikbaar    | Beschikbaar    | Uitverkocht        |
+----------------+----------------+--------------------+
| Overige producten worden in hetzelfde raster getoond|
+------------------------------------------------------+
```

De publieke pagina gebruikt grote tekst, eenvoudige kaarten, tekstuele statussen en hoog contrast. Het raster en de lettergrootte passen zich aan het aantal producten en de schermruimte aan. De pagina bevat geen invoervelden of beheerknoppen.

### 4.2 Mobiele beheerpagina

```text
+--------------------------------+
| Voorraadbeheer                 |
| Ingelogd als medewerker1       |
| [ Uitloggen ]                  |
+--------------------------------+
| Wijzigingshistorie bekijken    |
+--------------------------------+
| Nieuw product                  |
| Naam / voorraad / prijs / unit |
| [ Toevoegen ]                  |
+--------------------------------+
| Verse melk                     |
| Voorraad: 8                    |
| Prijs: EUR 1,80 per liter      |
| [Prijs] [Eenheid] [Opslaan]    |
| [ - 1 ]            [ + 1 ]     |
| Voorraad instellen [____]      |
| [ Tijdelijk niet beschikbaar ] |
+--------------------------------+
```

De beheerpagina mag verticaal scrollen. De historie is standaard ingeklapt en heeft bij veel regels een eigen scrollgebied. Deze scrollbeperking geldt niet voor het publieke e-inkscherm.

## 5. Statusregels

| Situatie | Tekst op publiek scherm |
|---|---|
| `beschikbaar = 1` en voorraad groter dan 0 | Beschikbaar |
| `beschikbaar = 1` en voorraad gelijk aan 0 | Uitverkocht |
| `beschikbaar = 0` | Tijdelijk niet beschikbaar |

## 6. Acceptatiecriteria

| ID | Acceptatiecriterium | Testgevallen |
|---|---|---|
| AC01 | De publieke pagina toont naam, prijs per eenheid, voorraad en tekstuele status | T01, T03, T04, T21 en T23 |
| AC02 | Uitverkochte en tijdelijk niet beschikbare producten zijn duidelijk herkenbaar | T05 en T06 |
| AC03 | Een voorraadwijziging verschijnt zonder handmatige refresh binnen 30 seconden | T07 |
| AC04 | Productkaarten passen op de geteste e-inkformaten zonder scrollen | T08 |
| AC05 | De beheerpagina werkt mobiel en ondersteunt snel voorraadbeheer | T09, T14 en T16 |
| AC06 | Alleen ingelogde medewerkers kunnen beheerfuncties en beveiligde routes gebruiken | T10, T11, T12, T13 en T26 |
| AC07 | Ongeldige voorraad, prijs en eenheid worden geweigerd | T15, T17 en T22 |
| AC08 | Een medewerker kan een compleet product toevoegen; dubbele namen worden geweigerd | T18 en T21 |
| AC09 | Beschikbaarheid kan wijzigen zonder verlies van voorraad | T19 |
| AC10 | Gegevens blijven bestaan en tijdelijke storingen worden duidelijk afgehandeld | T02 en T20 |
| AC11 | Een bestaande productprijs en verkoopeenheid kunnen worden gewijzigd | T22 en T23 |
| AC12 | Productwijzigingen worden met medewerker, oude/nieuwe waarde en tijdstip bewaard en getoond | T24, T25, T26 en T27 |

De volledige uitvoering en resultaten staan in het [testplan](Testplan.md).

## 7. Conclusie

De applicatie biedt gasten een rustige en actuele voorraadweergave en geeft medewerkers een snelle, beveiligde mobiele beheeromgeving. De gekozen uitbreiding met flexibele verkoopeenheden en wijzigingshistorie sluit aan op de product-ownerwensen en op de bonusonderdelen van de opdracht.

Alle beschreven functies zijn in het prototype aanwezig. Alleen de definitieve controle op de echte e-inkhardware blijft open totdat het apparaat is geleverd.
