# Functioneel ontwerp – Slimme voorraadweergave

## 1. Probleemanalyse

### 1.1 Het probleem

De camping en appartementenverhuur verkoopt bij de receptie
verschillende producten, zoals melk, yoghurt, ijsjes en frisdrank.

Gasten kunnen op dit moment niet direct zien welke producten
beschikbaar zijn en hoeveel er nog op voorraad zijn. Daardoor
moeten zij dit steeds bij een medewerker vragen.

Medewerkers moeten de voorraad snel kunnen aanpassen wanneer
een product wordt verkocht of wanneer nieuwe voorraad binnenkomt.

### 1.2 Het doel

Het doel van dit project is een eenvoudig voorraadsysteem maken.

Op een publiek e-inkscherm kunnen gasten zien:

- welke producten verkrijgbaar zijn;
- hoeveel exemplaren op voorraad zijn;
- welke producten uitverkocht zijn;
- welke producten tijdelijk niet beschikbaar zijn.

Medewerkers kunnen via een beveiligde mobiele beheerpagina
de voorraad aanpassen.

### 1.3 Doelgroepen

#### Gasten

Gasten bekijken de voorraad vanaf enkele meters afstand.
Daarom moet het scherm rustig, duidelijk en goed leesbaar zijn.
Gasten kunnen de voorraad alleen bekijken en niet wijzigen.

#### Medewerkers

Minimaal twee medewerkers gebruiken de beheerpagina op hun
telefoon. Zij moeten kunnen inloggen en de voorraad snel kunnen
verhogen, verlagen of instellen.

## 2. Eisen

### 2.1 Functionele eisen

Het systeem moet:

- productnamen, voorraad en beschikbaarheid tonen;
- meerdere producten kunnen opslaan;
- nieuwe producten kunnen toevoegen;
- voorraad met één kunnen verhogen en verlagen;
- voorraad op een gekozen aantal kunnen instellen;
- voorkomen dat de voorraad lager dan nul wordt;
- producten tijdelijk niet beschikbaar kunnen maken;
- minimaal twee medewerkersaccounts ondersteunen;
- het beheergedeelte beveiligen met een login;
- de publieke pagina zonder login tonen;
- de publieke voorraad iedere 60 seconden vernieuwen;
- gegevens na een serverherstart bewaren;
- ongeldige invoer en fouten duidelijk afhandelen.

### 2.2 Niet-functionele eisen

Het systeem moet:

- eenvoudig te gebruiken zijn;
- op een mobiele telefoon werken;
- duidelijke knoppen hebben;
- grote en goed leesbare tekst gebruiken;
- een hoog zwart-witcontrast hebben;
- geschikt zijn voor een e-inkscherm van ongeveer 9 inch;
- alle producten zonder scrollen op het e-inkscherm tonen;
- wachtwoorden veilig als hashes opslaan;
- begrijpelijke foutmeldingen tonen.

### 2.3 Buiten de scope

De eerste versie bevat geen:

- webshop;
- winkelmandje;
- online betalingen;
- klantaccounts;
- bestelfunctie;
- pushberichten;
- koppeling met een kassasysteem.

## 3. Gebruikersscenario's

### 3.1 Gast bekijkt de voorraad

**Gebruiker:** Gast  
**Beginsituatie:** Het publieke scherm staat aan.

1. De publieke voorraadpagina wordt geopend.
2. De gast bekijkt de beschikbare producten.
3. De gast ziet per product de naam, voorraad en status.
4. De gast gaat naar de receptie om een product te kopen.

**Verwacht resultaat:**  
De gast begrijpt binnen enkele seconden welke producten
beschikbaar of uitverkocht zijn.

### 3.2 Medewerker logt in

**Gebruiker:** Medewerker  
**Beginsituatie:** De medewerker heeft een geldig account.

1. De medewerker opent de inlogpagina.
2. De medewerker vult een gebruikersnaam en wachtwoord in.
3. De medewerker drukt op de knop `Inloggen`.
4. Na een geldige login wordt de beheerpagina geopend.

**Verwacht resultaat:**  
De medewerker krijgt toegang tot het beveiligde voorraadbeheer.

### 3.3 Verkoop verwerken

**Gebruiker:** Medewerker  
**Beginsituatie:** De medewerker is ingelogd en een gast koopt
één product.

1. De medewerker zoekt het verkochte product.
2. De medewerker drukt één keer op de knop `- 1`.
3. De nieuwe voorraad wordt opgeslagen.
4. De beheerpagina toont de aangepaste voorraad.
5. Het publieke scherm toont de wijziging uiterlijk na 60 seconden.

**Verwacht resultaat:**  
De voorraad wordt precies met één verlaagd en kan niet onder nul komen.

### 3.4 Voorraad aanvullen

**Gebruiker:** Medewerker  
**Beginsituatie:** Er is nieuwe voorraad binnengekomen.

1. De medewerker zoekt het juiste product.
2. De medewerker vult het nieuwe totale aantal in.
3. De medewerker drukt op de knop `Instellen`.
4. De nieuwe voorraad wordt opgeslagen.

**Verwacht resultaat:**  
De beheerpagina en de publieke pagina tonen de nieuwe voorraad.

### 3.5 Beschikbaarheid aanpassen

**Gebruiker:** Medewerker  
**Beginsituatie:** Een product kan tijdelijk niet worden verkocht.

1. De medewerker zoekt het product.
2. De medewerker maakt het product tijdelijk niet beschikbaar.
3. Het publieke scherm toont de aangepaste status.
4. De medewerker kan het product later weer beschikbaar maken.

**Verwacht resultaat:**  
De status verandert zonder dat de voorraadwaarde verloren gaat.

### 3.6 Nieuw product toevoegen

**Gebruiker:** Medewerker  
**Beginsituatie:** Een nieuw product wordt bij de receptie verkocht.

1. De medewerker vult de productnaam in.
2. De medewerker vult de beginvoorraad in.
3. De medewerker drukt op de knop `Toevoegen`.
4. Het nieuwe product verschijnt in het voorraadbeheer.
5. Het product verschijnt ook op de publieke pagina.

**Verwacht resultaat:**  
Het nieuwe product wordt blijvend in de database opgeslagen.

## 4. Schermontwerpen en wireframes

De wireframes hieronder laten schematisch zien hoe de belangrijkste
schermen zijn opgebouwd. Ze laten vooral de positie en functie van
onderdelen zien en zijn geen exacte screenshots.

### 4.1 Publiek e-inkscherm

```text
+------------------------------------------------------+
| CAMPING EN APPARTEMENTEN                             |
| VANDAAG BESCHIKBAAR                                  |
| Vraag bij de receptie naar deze producten            |
+----------------+----------------+--------------------+
| Verse melk     | Yoghurt        | IJsjes             |
| Beschikbaar    | Beschikbaar    | Uitverkocht        |
| 8 op voorraad  | 4 op voorraad  | 0 op voorraad      |
+----------------+----------------+--------------------+
| Frisdrank      | Boter          | Kip                |
| Beschikbaar    | Beschikbaar    | Niet beschikbaar   |
| 1 op voorraad  | 2 op voorraad  | 1 op voorraad      |
+----------------+----------------+--------------------+
```

Het publieke scherm gebruikt grote letters, weinig kleuren en een
hoog contrast. Alle producten moeten op het scherm passen zonder
dat de gast hoeft te scrollen. Uitverkochte en tijdelijk niet
beschikbare producten krijgen een zwarte achtergrond.

### 4.2 Mobiele inlogpagina

```text
+------------------------------+
| Voorraadbeheer               |
| Log in als medewerker        |
|                              |
| Gebruikersnaam               |
| [__________________________] |
|                              |
| Wachtwoord                   |
| [__________________________] |
|                              |
| [         INLOGGEN         ] |
|                              |
| Eventuele foutmelding        |
+------------------------------+
```

De inlogpagina bevat alleen de onderdelen die nodig zijn om in te
loggen. Bij verkeerde gegevens verschijnt een duidelijke melding
zonder te vertellen welk gegeven fout was.

### 4.3 Mobiele beheerpagina

```text
+------------------------------+
| Voorraadbeheer               |
| Ingelogd als medewerker1     |
| [ Uitloggen ]                |
+------------------------------+
| Nieuw product                |
| Naam:      [______________]  |
| Voorraad:  [____]            |
| [ Toevoegen ]                |
+------------------------------+
| Verse melk                   |
| Voorraad: 8                  |
| [ - 1 ]       [ + 1 ]        |
|                              |
| Voorraad instellen: [____]   |
| [ Instellen ]                |
|                              |
| [ Tijdelijk niet beschikbaar]|
+------------------------------+
| Volgend product              |
+------------------------------+
```

De beheerpagina gebruikt grote knoppen die gemakkelijk op een
telefoon aan te raken zijn. De belangrijkste knoppen voor min één
en plus één staan direct bij ieder product. De beheerpagina mag
verticaal scrollen wanneer er veel producten zijn.

## 5. Acceptatiecriteria

De applicatie wordt functioneel goedgekeurd wanneer aan de
volgende controleerbare voorwaarden wordt voldaan.

| ID | Acceptatiecriterium | Testgevallen |
|---|---|---|
| AC01 | De publieke pagina toont productnamen, voorraad en beschikbaarheid | T01, T03 en T04 |
| AC02 | Uitverkochte en tijdelijk niet beschikbare producten zijn duidelijk herkenbaar | T05 en T06 |
| AC03 | Voorraadwijzigingen verschijnen uiterlijk na ongeveer 60 seconden op het publieke scherm | T07 |
| AC04 | Alle producten passen op 800x600 en 600x800 zonder scrollen | T08 |
| AC05 | De beheerpagina werkt op een mobiel scherm en de voorraadknoppen zijn bruikbaar | T09 en T14 |
| AC06 | Alleen ingelogde medewerkers kunnen het voorraadbeheer en beveiligde API-routes gebruiken | T10, T11, T12 en T13 |
| AC07 | De voorraad kan niet negatief worden en ongeldige invoer wordt geweigerd | T15 en T17 |
| AC08 | Een medewerker kan een nieuw product toevoegen en dubbele namen worden geweigerd | T18 |
| AC09 | Een product kan tijdelijk worden uitgeschakeld zonder dat de voorraad verandert | T19 |
| AC10 | Gegevens blijven na een serverherstart bestaan en storingen worden duidelijk afgehandeld | T02 en T20 |

De volledige uitvoering en resultaten staan in het
[testplan](Testplan.md).

## 6. Conclusie

Het functioneel ontwerp beschrijft wat de slimme
voorraadweergave voor gasten en medewerkers moet doen.

Gasten kunnen zonder inloggen de actuele voorraad bekijken.
Medewerkers kunnen na het inloggen producten en voorraad beheren.
De publieke pagina is ontworpen voor een e-inkscherm en wordt
automatisch vernieuwd.

De testresultaten laten zien dat alle beschreven
acceptatiecriteria zijn behaald.