# Slimme voorraadweergave

Een MBO niveau 4-schoolproject voor een camping en
appartementenverhuur.

De applicatie toont de actuele productvoorraad op een publiek,
e-inkvriendelijk scherm. Medewerkers kunnen via een beveiligde
mobiele beheerpagina de voorraad aanpassen.

## Functies

### Publieke voorraadpagina

- productnamen en actuele voorraad tonen;
- beschikbaar, uitverkocht en tijdelijk niet beschikbaar tonen;
- automatisch vernieuwen iedere 60 seconden;
- laatst geladen gegevens behouden bij een tijdelijke storing;
- responsive zwart-witweergave zonder scrollen op het e-inkscherm.

### Medewerkeromgeving

- inloggen met een medewerkersaccount;
- nieuwe producten toevoegen;
- voorraad met één verhogen of verlagen;
- voorraad exact instellen;
- producten tijdelijk niet beschikbaar maken;
- uitloggen;
- mobielvriendelijke bediening.

### Backend en database

- beveiligde API-routes;
- invoervalidatie;
- duidelijke HTTP-statuscodes;
- wachtwoordhashing met scrypt;
- sessiegebaseerde authenticatie;
- permanente opslag in SQLite.

## Gebruikte technologieën

- HTML
- CSS
- JavaScript
- Node.js
- Express
- express-session
- SQLite via `node:sqlite`

## Benodigdheden

Voor dit project is nodig:

- Git;
- Node.js;
- npm;
- een moderne webbrowser.

Het project is tijdens de ontwikkeling getest met Node.js
`v24.16.0`.

## Installatie

### 1. Repository downloaden

```powershell
git clone https://github.com/AchieRR/slimme-voorraadweergave.git
cd slimme-voorraadweergave
```

De repository kan ook met GitHub Desktop worden gekloond.

### 2. Packages installeren

```powershell
npm install
```

### 3. Omgevingsbestand maken

Kopieer `.env.example` naar `.env`:

```powershell
Copy-Item .env.example .env
```

Open daarna `.env` en vul de drie variabelen in:

```env
MEDEWERKER_1_WACHTWOORD=
MEDEWERKER_2_WACHTWOORD=
SESSIE_GEHEIM=
```

Gebruik twee verschillende wachtwoorden van minimaal twaalf tekens.

Het sessiegeheim moet minimaal 64 tekens lang zijn. Een willekeurig
sessiegeheim kan worden gemaakt met:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

Plaats de uitvoer achter `SESSIE_GEHEIM=`.

Het `.env`-bestand bevat geheime gegevens en mag niet naar GitHub
worden gestuurd.

## Applicatie starten

Start de server vanuit de projectmap:

```powershell
node --env-file=.env server.js
```

Bij een succesvolle start verschijnt:

```text
Server gestart op http://localhost:3000
```

De database en benodigde tabellen worden automatisch aangemaakt
wanneer deze nog niet bestaan.

## Pagina's openen

Publieke voorraadpagina:

```text
http://localhost:3000
```

Inlogpagina voor medewerkers:

```text
http://localhost:3000/inloggen.html
```

De standaard gebruikersnamen zijn:

```text
medewerker1
medewerker2
```

De bijbehorende wachtwoorden zijn de wachtwoorden uit `.env`.

## Server stoppen

Druk in de terminal waarin de server draait op:

```text
Ctrl + C
```

## Projectstructuur

```text
voorraad/
|-- public/
|   |-- index.html
|   |-- style.css
|   |-- app.js
|   |-- inloggen.html
|   |-- inloggen.css
|   |-- inloggen.js
|   |-- beheer.html
|   |-- beheer.css
|   `-- beheer.js
|-- data/
|   `-- voorraad.db
|-- docs/
|   |-- FUNCTIONEEL-ONTWERP.md
|   |-- TECHNISCH-ONTWERP.md
|   |-- Testplan.md
|   `-- AI-LOGBOEK.md
|-- database.js
|-- wachtwoorden.js
|-- server.js
|-- package.json
|-- .env.example
`-- README.md
```

De lokale database en het echte `.env`-bestand worden door Git
genegeerd.

## Documentatie

- [Functioneel ontwerp](docs/FUNCTIONEEL-ONTWERP.md)
- [Technisch ontwerp](docs/TECHNISCH-ONTWERP.md)
- [Testplan en testresultaten](docs/Testplan.md)
- [AI-logboek](docs/AI-LOGBOEK.md)

## Huidige beperkingen

Dit project is een lokaal prototype.

Voor gebruik via internet zijn onder andere HTTPS, rate-limiting,
CSRF-bescherming en permanente sessieopslag nodig.

Het echte e-inkscherm is nog niet geleverd. De resolutie,
browserondersteuning en het refreshgedrag moeten na levering nog
worden getest.