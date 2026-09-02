# Testplan – Slimme voorraadweergave

**Tester:** Ahmad  
**Testomgeving:** Lokale Node.js-server en SQLite-database  
**Browsers:** Chrome en mobiele browserweergave  
**Datum:** 2 september 2026

## Doel

Met dit testplan controleer ik of de publieke voorraadweergave,
de mobiele beheeromgeving, de API, authenticatie, foutafhandeling
en database correct werken.

## Betekenis van de statussen

- Nog uitvoeren
- Geslaagd
- Mislukt

## Testgevallen

| ID | Onderdeel | Test | Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|---|---|---|
| T01 | API | GET `/api/producten` uitvoeren | Status 200 en een JSON-lijst met producten | Status 200 ontvangen met een JSON-lijst van zes producten | Geslaagd |
| T02 | Database | Server herstarten en producten opnieuw ophalen | Voorraad en producten zijn na de herstart niet verdwenen | Na de serverherstart waren dezelfde zes producten en voorraadwaarden aanwezig | Geslaagd |
| T03 | Publieke pagina | Publieke pagina openen | Productnaam en actuele voorraad worden getoond | De productnamen en actuele voorraadwaarden werden correct getoond | Geslaagd |
| T04 | Beschikbaarheid | Product met voorraad en status beschikbaar tonen | De tekst `Beschikbaar` wordt getoond | Bij een beschikbaar product met voorraad stond de tekst `Beschikbaar` | Geslaagd |
| T05 | Uitverkocht | Voorraad tijdelijk op 0 instellen | De tekst `Uitverkocht` en een zwarte kaart worden getoond | Bij voorraad 0 verschenen de tekst `Uitverkocht` en een zwarte kaart | Geslaagd |
| T06 | Tijdelijk niet beschikbaar | Product tijdelijk uitschakelen | De juiste statustekst en een zwarte kaart worden getoond | De tekst `Tijdelijk niet beschikbaar` en een zwarte kaart werden getoond | Geslaagd |
| T07 | Automatisch vernieuwen | Voorraad wijzigen en maximaal 60 seconden wachten | De publieke pagina toont automatisch de nieuwe voorraad | De gewijzigde voorraad verscheen automatisch bij de verversing van 60 seconden | Geslaagd |
| T08 | E-inkformaat | Publieke pagina testen op 800x600 en 600x800 | Alle producten zijn zichtbaar zonder scrollen | Op 800x600 en 600x800 stonden alle zes kaarten binnen beeld zonder scrollen | Geslaagd |
| T09 | Mobiele weergave | Beheerpagina testen op 390x844 | Geen horizontale scroll en alle knoppen zijn bruikbaar | Op 390x844 was geen horizontale scroll en werkten de plus- en minknop | Geslaagd |
| T10 | Verkeerde login | Inloggen met een verkeerd wachtwoord | Status 401 en geen toegang tot het beheer | De server gaf status 401 en maakte geen geldige sessie aan | Geslaagd |
| T11 | Geldige login | Inloggen met een correct medewerkersaccount | Beheerpagina opent en medewerkersnaam is zichtbaar | Inloggen gaf status 200 en `medewerker1` werd op de beheerpagina getoond | Geslaagd |
| T12 | Beveiligde pagina | `/beheer.html` zonder sessie openen | Browser stuurt door naar `/inloggen.html` | Zonder sessie volgde een redirect naar `/inloggen.html` | Geslaagd |
| T13 | Autorisatie | Voorraad wijzigen zonder ingelogde sessie | Status 401 en voorraad blijft gelijk | De aanvraag gaf status 401 en de voorraad bleef ongewijzigd | Geslaagd |
| T14 | Voorraadknoppen | Eén keer plus en daarna één keer min gebruiken | Voorraad stijgt en keert daarna terug naar de beginwaarde | Plus verhoogde de voorraad met 1 en min herstelde de beginwaarde | Geslaagd |
| T15 | Negatieve voorraad | Voorraad onder 0 proberen te brengen | Status 400 en voorraad wordt niet negatief | De server gaf status 400 en de voorraad bleef gelijk | Geslaagd |
| T16 | Voorraad instellen | Een geldig geheel getal instellen | Status 200 en de nieuwe voorraad wordt opgeslagen | De server gaf status 200 en sloeg de ingestelde voorraad correct op | Geslaagd |
| T17 | Ongeldige invoer | Een negatief getal, kommagetal of te hoog getal insturen | Status 400 en de voorraad blijft gelijk | Alle drie ongeldige waarden gaven status 400 en veranderden de voorraad niet | Geslaagd |
| T18 | Product toevoegen | Een testproduct toevoegen en dezelfde naam opnieuw toevoegen | Eerste aanvraag geeft 201, dubbele naam geeft 409 | Toevoegen gaf status 201 en de dubbele naam gaf status 409 | Geslaagd |
| T19 | Beschikbaarheid wijzigen | Product uitschakelen en opnieuw inschakelen | Status verandert, maar de voorraad blijft gelijk | Uitschakelen en inschakelen wijzigde alleen de status; de voorraad bleef gelijk | Geslaagd |
| T20 | Netwerkstoring | Eerste en latere API-storing simuleren en daarna herstellen | Duidelijke melding, laatst geladen voorraad blijft staan en herstel werkt | Beide storingsmeldingen klopten, zes kaarten bleven bij latere uitval staan en herstel werkte | Geslaagd |

## Testresultaat

**Aantal testgevallen:** 20  
**Geslaagd:** 20  
**Mislukt:** 0  
**Eindconclusie:** Alle testgevallen zijn geslaagd. De applicatie voldoet aan de geteste eisen voor voorraadbeheer, authenticatie, foutafhandeling, mobiele bediening en weergave op het e-inkscherm.
