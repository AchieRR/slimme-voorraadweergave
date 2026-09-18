# Testplan - Slimme voorraadweergave

**Tester:** Ahmad

**Testomgeving:** lokale Node.js-server, SQLite-database en browser

**Schermtests:** desktop en mobiele browserweergave

**Bijgewerkt:** 4 september 2026

## 1. Doel

Dit testplan controleert de publieke voorraadweergave, mobiele beheeromgeving, API, database, authenticatie, invoervalidatie, prijzen, verkoopeenheden, wijzigingshistorie en foutafhandeling.

## 2. Werkwijze

- Tijdelijke voorraad-, prijs- en beschikbaarheidswijzigingen worden na een test teruggezet wanneer dat nodig is.
- Een testproduct mag na afloop blijven bestaan wanneer het bewust als demonstratiegegevens wordt gebruikt.
- Beveiligde routes worden zowel zonder als met medewerkerssessie getest.
- `Geslaagd` betekent dat werkelijk en verwacht resultaat overeenkomen.
- De echte e-inkhardware wordt na levering aanvullend getest.

## 3. Testgevallen en resultaten

| ID | Onderdeel | Test | Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|---|---|---|
| T01 | Producten-API | `GET /api/producten` uitvoeren | Status 200 en JSON-lijst met alle productvelden | Status 200; id, naam, voorraad, prijs, eenheid en beschikbaarheid ontvangen | Geslaagd |
| T02 | Database | Server herstarten en producten opnieuw ophalen | Productgegevens blijven bestaan | Dezelfde opgeslagen producten en waarden bleven aanwezig | Geslaagd |
| T03 | Publieke pagina | Publieke pagina openen | Productnaam, voorraad en status zijn zichtbaar | De actuele productkaarten werden correct opgebouwd | Geslaagd |
| T04 | Beschikbaar | Product met voorraad en status beschikbaar tonen | Tekst `Beschikbaar` | De juiste statustekst verscheen | Geslaagd |
| T05 | Uitverkocht | Voorraad tijdelijk op 0 instellen | `Uitverkocht` en duidelijke contrasterende kaart | Tekst en contrast veranderden correct | Geslaagd |
| T06 | Niet beschikbaar | Product tijdelijk uitschakelen | `Tijdelijk niet beschikbaar` en voorraad blijft bewaard | Status wijzigde; voorraad bleef gelijk | Geslaagd |
| T07 | Automatisch vernieuwen | Voorraad wijzigen en maximaal 30 seconden wachten zonder handmatige refresh | Publieke pagina toont binnen 30 seconden de nieuwe voorraad | De wijziging verscheen automatisch binnen 30 seconden | Geslaagd |
| T08 | E-inkformaat | Publieke pagina testen op 800x600, 600x800, 1200x825 en 1280x720 | Productkaarten blijven zonder handmatige scroll zichtbaar | De gesimuleerde schermtests slaagden met de gebruikte testset | Geslaagd |
| T09 | Mobiele weergave | Beheerpagina testen op 390x844 | Geen horizontale scroll en knoppen zijn bruikbaar | De pagina bleef mobiel bruikbaar | Geslaagd |
| T10 | Verkeerde login | Verkeerd wachtwoord gebruiken | Status 401 en geen sessie | Status 401 en geen toegang | Geslaagd |
| T11 | Geldige login | Correct medewerkersaccount gebruiken | Status 200, sessie en beheerpagina | Inloggen en medewerkersnaam werkten | Geslaagd |
| T12 | Beveiligde pagina | `/beheer.html` zonder sessie openen | Redirect naar `/inloggen.html` | Redirect werd uitgevoerd | Geslaagd |
| T13 | Autorisatie wijziging | Voorraad wijzigen zonder sessie | Status 401 en geen wijziging | Aanvraag geweigerd; voorraad bleef gelijk | Geslaagd |
| T14 | Voorraadknoppen | Eén keer `+1` en daarna `-1` | Eerst één hoger, daarna beginwaarde hersteld | Beide knoppen en herstel werkten | Geslaagd |
| T15 | Negatieve voorraad | Voorraad onder 0 proberen te brengen | Status 400 en geen negatieve voorraad | Status 400; waarde bleef geldig | Geslaagd |
| T16 | Voorraad instellen | Geldig geheel getal instellen | Status 200 en nieuwe waarde opgeslagen | Waarde werd opgeslagen en getoond | Geslaagd |
| T17 | Ongeldige voorraad | Negatief getal, kommagetal en te hoog getal insturen | Status 400 en geen wijziging | Alle ongeldige waarden werden geweigerd | Geslaagd |
| T18 | Product toevoegen | Product toevoegen en dezelfde naam nogmaals gebruiken | Eerst 201, daarna 409 | Product werd toegevoegd; dubbele naam geweigerd | Geslaagd |
| T19 | Beschikbaarheid wijzigen | Uitschakelen en opnieuw inschakelen | Alleen status verandert | Beide richtingen werkten; voorraad bleef gelijk | Geslaagd |
| T20 | Netwerkstoring | Eerste en latere API-storing simuleren en herstellen | Begrijpelijke melding, behoud van oude kaarten en automatisch herstel | Alle drie situaties werkten zoals bedoeld | Geslaagd |
| T21 | Nieuw product met prijs | Naam, voorraad, prijs en eenheid toevoegen | Status 201 en alle waarden opgeslagen | Product met prijs in centen en verkoopeenheid opgeslagen | Geslaagd |
| T22 | Prijsvalidatie | Prijs 0, te hoge prijs of lege eenheid naar de prijsroute sturen | Status 400 en bestaande prijs blijft gelijk | Ongeldige prijs en eenheid werden geweigerd | Geslaagd |
| T23 | Prijs wijzigen en tonen | Prijs en eenheid van bestaand product wijzigen | Beheerpagina en publieke pagina tonen nieuwe europrijs per eenheid | Nieuwe prijs en eenheid werden opgeslagen en zichtbaar | Geslaagd |
| T24 | Voorraadhistorie | `+1`, `-1` en exact instellen uitvoeren | Per echte verandering één regel met oud/nieuw en medewerker | De verwachte historieregels werden opgeslagen | Geslaagd |
| T25 | Overige historie | Product toevoegen, prijs wijzigen en beschikbaarheid wisselen | De juiste soort en waarden worden opgeslagen | Alle drie wijzigingssoorten verschenen correct | Geslaagd |
| T26 | Historie beveiligen | `GET /api/wijzigingen` zonder en met login uitvoeren | Zonder login 401; met login 200 en maximaal honderd regels | Beide statussen en inhoud klopten | Geslaagd |
| T27 | Historie in beheerpagina | Product wijzigen en historie zonder paginaverversing bekijken | Nieuwe regel verschijnt direct met product, medewerker, waarden en tijdstip | De zichtbare historie werd direct bijgewerkt | Geslaagd |

## 4. Samenvatting

| Testgebied | Test-ID's | Resultaat |
|---|---|---|
| API en database | T01-T02 | 2/2 geslaagd |
| Publieke pagina en e-ink | T03-T08 | 6/6 geslaagd |
| Mobiel en authenticatie | T09-T13 | 5/5 geslaagd |
| Voorraad en productbeheer | T14-T20 | 7/7 geslaagd |
| Prijs en verkoopeenheid | T21-T23 | 3/3 geslaagd |
| Wijzigingshistorie | T24-T27 | 4/4 geslaagd |

**Aantal testgevallen:** 27

**Geslaagd:** 27

**Mislukt:** 0

## 5. Eindconclusie

De geteste applicatie voldoet aan de functionele eisen voor publieke weergave, beveiligd mobiel beheer, voorraad, prijs per verkoopeenheid, beschikbaarheid, wijzigingshistorie, permanente opslag en foutafhandeling.

De gesimuleerde e-inktests zijn geslaagd. Omdat het echte 9-inchscherm nog niet is geleverd, blijft een aanvullende hardwaretest nodig voordat het systeem definitief op locatie kan worden geplaatst.
