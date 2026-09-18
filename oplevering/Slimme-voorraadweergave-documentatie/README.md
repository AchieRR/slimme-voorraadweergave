# Slimme voorraadweergave

Een MBO niveau 4-schoolproject voor een camping en appartementenverhuur.

De applicatie toont producten, prijzen, verkoopeenheden en actuele voorraad op een publiek, e-inkvriendelijk scherm. Medewerkers beheren deze informatie via een beveiligde mobiele webpagina. Het systeem bewaart ook wie welke productwijziging heeft uitgevoerd.

## Functies

### Publieke voorraadpagina

- toont productnaam, prijs per verkoopeenheid, actuele voorraad en status;
- onderscheidt `Beschikbaar`, `Uitverkocht` en `Tijdelijk niet beschikbaar`;
- vernieuwt automatisch iedere 30 seconden;
- behoudt de laatst geladen gegevens bij een tijdelijke storing;
- gebruikt een rustige zwart-witweergave voor een e-inkscherm van ongeveer 9 inch;
- bevat geen knoppen waarmee gasten gegevens kunnen wijzigen.

### Beheeromgeving voor medewerkers

- inloggen met een eigen medewerkersaccount;
- producten toevoegen met naam, beginvoorraad, prijs en verkoopeenheid;
- voorraad met één verhogen of verlagen;
- voorraad exact instellen;
- prijs en verkoopeenheid van bestaande producten wijzigen;
- producten tijdelijk niet beschikbaar maken en opnieuw beschikbaar maken;
- de honderd nieuwste productwijzigingen bekijken;
- zien welke medewerker een wijziging heeft uitgevoerd;
- uitloggen.

### Backend en database

- publieke en beveiligde API-routes;
- validatie van productnummer, naam, voorraad, prijs, eenheid en beschikbaarheid;
- duidelijke HTTP-statuscodes en JSON-foutmeldingen;
- wachtwoordhashing met `scrypt`;
- sessiegebaseerde authenticatie;
- permanente opslag in SQLite;
- wijzigingshistorie voor toevoegen, voorraad, prijs en beschikbaarheid.

## Gebruikte technologieën

- HTML, CSS en JavaScript;
- Node.js 24;
- Express 5;
- `express-session`;
- SQLite via de ingebouwde module `node:sqlite`;
- Git en GitHub.

Er is gekozen voor gewone HTML, CSS en JavaScript omdat dit prototype uit enkele overzichtelijke pagina's bestaat en geen buildproces nodig heeft. SQLite past bij een lokaal systeem met weinig gebruikers en vereist geen aparte databaseserver.

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

Vul daarna deze variabelen in:

```env
MEDEWERKER_1_WACHTWOORD=
MEDEWERKER_2_WACHTWOORD=
SESSIE_GEHEIM=
```

Gebruik twee verschillende wachtwoorden van minimaal twaalf tekens. Het sessiegeheim moet minimaal 64 tekens bevatten. Een willekeurig sessiegeheim kan worden gemaakt met:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

Het echte `.env`-bestand bevat geheimen en staat daarom in `.gitignore`.

## Applicatie uitvoeren

Controleer eerst alle JavaScriptbestanden:

```powershell
npm run check
```

Start daarna de server:

```powershell
npm start
```

Bij een succesvolle start verschijnt:

```text
Server gestart op http://localhost:3000
```

Open vervolgens:

- publieke voorraadpagina: `http://localhost:3000`;
- medewerkerslogin: `http://localhost:3000/inloggen.html`;
- beheerpagina na inloggen: `http://localhost:3000/beheer.html`.

De standaard gebruikersnamen zijn `medewerker1` en `medewerker2`. De wachtwoorden komen uit `.env`.

Stop de server met `Ctrl+C` in de terminal waarin deze draait.

## Belangrijkste API-routes

| Methode | Route | Login nodig | Doel |
|---|---|---|---|
| GET | `/api/producten` | Nee | Producten voor het publieke scherm ophalen |
| POST | `/api/inloggen` | Nee | Medewerker inloggen |
| GET | `/api/sessie` | Ja | Actieve medewerkerssessie controleren |
| POST | `/api/uitloggen` | Ja | Medewerker uitloggen |
| GET | `/api/wijzigingen` | Ja | De honderd nieuwste wijzigingen ophalen |
| POST | `/api/producten` | Ja | Product met prijs en eenheid toevoegen |
| PATCH | `/api/producten/:id/voorraad` | Ja | Voorraad relatief wijzigen |
| PUT | `/api/producten/:id/voorraad` | Ja | Voorraad exact instellen |
| PUT | `/api/producten/:id/prijs` | Ja | Prijs en verkoopeenheid wijzigen |
| PUT | `/api/producten/:id/beschikbaarheid` | Ja | Beschikbaarheid wijzigen |

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
|   |-- PROJECTDOCUMENTATIE-VERBETERD.docx
|   `-- AI-LOGBOEK.md
|-- database.js
|-- wachtwoorden.js
|-- server.js
|-- CONTEXT.md
|-- package.json
|-- .env.example
`-- README.md
```

De lokale SQLite-database, het echte `.env`-bestand en `node_modules` worden niet naar GitHub gestuurd.

## Documentatie

- [Functioneel ontwerp](docs/FUNCTIONEEL-ONTWERP.md)
- [Technisch ontwerp](docs/TECHNISCH-ONTWERP.md)
- [Testplan en testresultaten](docs/Testplan.md)
- [Inleverbare projectdocumentatie](docs/PROJECTDOCUMENTATIE-VERBETERD.docx)
- [Persoonlijk AI-logboek](docs/AI-LOGBOEK.md)
- [Begrippenlijst van het project](CONTEXT.md)

## Huidige beperkingen

Dit project is een lokaal prototype. Voor gebruik via internet zijn onder andere HTTPS, rate-limiting, CSRF-bescherming, permanente sessieopslag en databaseback-ups nodig.

Het echte e-inkscherm is nog niet geleverd. De applicatie is op meerdere gesimuleerde resoluties getest, maar resolutie, browserondersteuning, wifi, slaapstand, ghosting en refreshgedrag moeten na levering op de echte hardware opnieuw worden gecontroleerd.
