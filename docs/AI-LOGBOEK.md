# Persoonlijk AI-logboek

## Afspraken

- De student typt de applicatiecode zelf.
- Codex geeft code alleen in kleine, uitlegbare stukken in de chat.
- Codex verandert geen applicatiecode zonder een uitdrukkelijk verzoek van de student.
- Relevante AI-interacties, controles en eigen keuzes worden tijdens het project aan dit bestand toegevoegd.
- De volledige chat blijft de primaire bron voor de volledige prompts en AI-antwoorden. Dit bestand is het gestructureerde inleverlogboek.

---

## Interactie 1 - Opdracht begrijpen

**Datum:** 21 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** De projectopdracht laten lezen en eenvoudig laten uitleggen

### Volledige prompt van de student

> Hey Codex, je bent de slimste software engineer and developer ooit, ja. Wat ik wil is nu gaat doen, is dat je Dat je het hele document gaat lezen en uiteindelijk gewoon alles in detail uitlegt aan mij, maar wel simpel. En daarna, wanneer ik heb gezegd ja, ga door, dan mag je het hele project gaan maken.
>
> Dit is een mbo 4 schoolproject. Schoolproject, ja, software developer. Dus leg het zo uit aan mij.

### Antwoord en advies van AI

Codex heeft alle elf pagina's van de PDF gelezen en de opdracht per onderwerp uitgelegd. De belangrijkste uitleg was:

- het systeem heeft een publieke voorraadweergave, een mobiele beheeromgeving, een backend/API, een database en authenticatie nodig;
- gasten mogen de voorraad alleen lezen;
- ingelogde medewerkers mogen de voorraad wijzigen;
- voorraad mag niet negatief worden;
- meerdere gelijktijdige wijzigingen moeten veilig worden verwerkt;
- de publieke pagina moet automatisch vernieuwen en geschikt zijn voor e-ink;
- testen, documentatie, security en kritisch AI-gebruik tellen mee voor het cijfer;
- door een kleine tegenstrijdigheid in de opdracht is geadviseerd om minimaal zeventien testgevallen te maken.

Het volledige AI-antwoord staat in de bijbehorende Codex-chat en wordt bij de uiteindelijke export aan dit logboek toegevoegd.

### Wat heb ik ermee gedaan?

Ik heb verduidelijkt dat ik de applicatiecode zelf wil typen en dat Codex mij stap voor stap moet begeleiden.

### Controle

De uitleg is vergeleken met de eisen, tabellen en beoordelingscriteria uit het volledige PDF-document.

### Eigen beslissing

Ik laat AI niet zelfstandig de volledige applicatie maken. Ik gebruik AI als uitleg- en controlehulpmiddel.

---

## Interactie 2 - Werkwijze bepalen

**Datum:** 21 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Zelf de code schrijven

### Volledige prompt van de student

> ik wil niet dat jij alles gaat uitvoeren ik wil dat je me uitlegt wat ik moet doen in stappen ik wil zelf de code typen

### Antwoord en advies van AI

Codex stelde een stapsgewijze werkwijze voor: eisen bepalen, technieken kiezen, wireframes maken, project opzetten, database en API bouwen, authenticatie toevoegen, de beheer- en publieke pagina bouwen, fouten afhandelen, testen en documenteren. Als eenvoudige voorlopige stack werden HTML, CSS, JavaScript, Node.js, Express en SQLite genoemd. Deze keuze is nog niet definitief.

### Wat heb ik ermee gedaan?

Ik heb besloten dat Codex code in kleine stukken in de chat mag geven, maar dat ik alle applicatiecode zelf typ.

### Controle

De voorgestelde werkwijze volgt de onderdelen en inleverproducten uit de projectopdracht.

### Eigen beslissing

Eerst leren en begrijpen, daarna pas ieder onderdeel zelf implementeren.

---

## Interactie 3 - Repository en logboek

**Datum:** 24 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Repository aanmaken en AI-logboek bijhouden

### Volledige prompt van de student

> ik wil wel dat je me de code geeft in stukjes mr wel in deze chat en dit is me logboek trouwens wil dat je t logboek altijd bij houdt zodat ik em later kan inleveren
>
> en trouwens maak me een repository voor dit project genaamd slimme voorraad weergave

### Antwoord en advies van AI

Codex heeft bevestigd dat de student de code zelf blijft typen en dat code alleen in kleine stukken wordt gegeven. De bestaande lege lokale Git-repository is ingericht voor het project **Slimme voorraadweergave**. Alleen de projectbeschrijving, `.gitignore` en dit AI-logboek zijn toegevoegd; er is nog geen applicatiecode geschreven.

### Wat heb ik ermee gedaan?

De lokale projectrepository en het gestructureerde logboek zijn als basis klaargezet.

### Controle

De repository wordt gecontroleerd met Git-status en de eerste commit wordt nagekeken.

### Eigen beslissing

De repository blijft voorlopig lokaal. Publicatie naar GitHub gebeurt pas na een bewuste keuze voor een publieke of privérepository.

---

## Interactie 4 - Openbare GitHub-repository

**Datum:** 24 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Zichtbaarheid van de GitHub-repository

### Volledige prompt van de student

> hij mag openbaar

### Antwoord en advies van AI

Codex heeft uitgelegd dat de openbare GitHub-repository de naam `slimme-voorraadweergave` krijgt, omdat GitHub-repositorynamen geen spaties gebruiken. De lokale repository wordt aan GitHub gekoppeld en de bestaande `main`-branch wordt gepubliceerd.

### Wat heb ik ermee gedaan?

De projectrepository wordt openbaar gemaakt, zodat het project via GitHub bekeken kan worden.

### Controle

Vooraf is gecontroleerd dat GitHub CLI is ingelogd op het juiste account en dat er nog geen repository met dezelfde naam bestaat. Na publicatie worden de zichtbaarheid, gekoppelde remote en gepushte commit gecontroleerd.

### Eigen beslissing

Ik heb zelf gekozen dat de GitHub-repository openbaar mag zijn.

---

## Interactie 5 - Repository toevoegen aan GitHub Desktop

**Datum:** 24 augustus 2026  
**AI-tool:** Codex met Windows Computer Use  
**Onderwerp:** Lokale repository openen in GitHub Desktop

### Volledige prompt van de student

> voeg toe aan git desktop

### Antwoord en advies van AI

Codex heeft GitHub Desktop geopend en via **Add existing repository** de lokale map `C:\Users\ahmad\Documents\ChatGPT\voorraad` toegevoegd. GitHub Desktop herkende de repository als `slimme-voorraadweergave`, op branch `main`, gekoppeld aan de bestaande GitHub-remote.

### Wat heb ik ermee gedaan?

De repository kan nu vanuit GitHub Desktop worden bekeken en later worden gebruikt om wijzigingen te controleren, committen, pushen en ophalen.

### Controle

In GitHub Desktop is gecontroleerd dat de huidige repository `slimme-voorraadweergave` is, de huidige branch `main` is en er geen lokale wijzigingen aanwezig waren voordat deze logboeknotitie werd toegevoegd.

### Eigen beslissing

Ik wil GitHub Desktop gebruiken om de Git-geschiedenis en wijzigingen van het schoolproject zichtbaar te beheren.

---

## Interactie 6 - Eerste ontwikkelsprint kiezen

**Datum:** 24 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Een haalbare eerste taak van ongeveer dertig minuten

### Volledige prompt van de student

> oke hoe gaan we beginnen geef me iets wat ik in een half uurtje zou kunnen doen

### Antwoord en advies van AI

Codex adviseerde om te beginnen met een statische publieke voorraadpagina in gewone HTML en CSS. De eerste sprint bevat bewust nog geen JavaScript, backend, database of authenticatie. De pagina toont drie voorbeeldproducten en gebruikt een rustig zwart-witontwerp met grote tekst, zodat meteen rekening wordt gehouden met de leesbaarheid van een e-inkscherm.

### Wat heb ik ermee gedaan?

Ik maak zelf de map `public` en de bestanden `index.html` en `style.css`. Daarna typ ik de kleine codeblokken uit de chat over en open ik de pagina in een browser.

### Controle

Ik controleer of de titel, drie producten, voorraadaantallen en de status uitverkocht zichtbaar zijn. Daarna stuur ik mijn resultaat of code naar Codex voor controle.

### Eigen beslissing

Ik begin met een eenvoudige zichtbare versie en voeg ingewikkeldere onderdelen pas toe wanneer ik deze basis begrijp.

---

## Interactie 7 - Stap 2: producten met JavaScript tonen

**Datum:** 24 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Vervolgstap na de statische voorraadpagina

### Volledige prompt van de student

> oke wat is stap 2

### Antwoord en advies van AI

Codex heeft eerst gecontroleerd dat `public/index.html` en `public/style.css` aanwezig zijn. De HTML-structuur en de koppeling met het stylesheet waren correct aanwezig. Als tweede sprint is geadviseerd om de drie hardgecodeerde productblokken te vervangen door één JavaScript-gegevenslijst en een functie die de HTML opbouwt.

### Wat heb ik ermee gedaan?

Ik voeg zelf `public/app.js` toe, koppel het bestand aan `index.html` en laat JavaScript de producten op de pagina plaatsen.

### Controle

Na de wijziging controleer ik of dezelfde drie producten zichtbaar blijven, of voorraad nul automatisch de status `Uitverkocht` krijgt en of er fouten in de browserconsole staan.

### Eigen beslissing

Ik leer eerst hoe productgegevens los van de HTML worden beheerd. Later vervangen we deze tijdelijke JavaScriptlijst door gegevens uit de backend en database.

---

## Interactie 8 - Controle van stap 2 en start backend

**Datum:** 24 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** JavaScript controleren en de derde ontwikkelsprint bepalen

### Volledige prompt van de student

> oke t werkt wat is stap 3

### Antwoord en advies van AI

Codex controleerde `public/index.html` en `public/app.js`. De JavaScriptlijst, lus, automatische uitverkochtstatus en veilige plaatsing met `textContent` waren aanwezig. In `index.html` werd wel een dubbele geneste productensectie gevonden. De browser kon dit tonen, maar de HTML-structuur was onnodig en moest eerst worden gecorrigeerd. Daarna is als derde sprint geadviseerd om een eenvoudige Node.js/Express-backend en een eerste alleen-lezen API-endpoint te maken.

### Wat heb ik ermee gedaan?

Ik verwijder zelf de buitenste dubbele productensectie. Daarna initialiseer ik Node.js, installeer ik Express en typ ik zelf een `server.js` die de publieke bestanden aanbiedt en voorbeeldproducten als JSON teruggeeft.

### Controle

Ik controleer eerst of er nog precies één productensectie bestaat. Voor de backend controleer ik vervolgens `http://localhost:3000` en `http://localhost:3000/api/producten`.

### Eigen beslissing

De eerste API is bewust alleen-lezen en gebruikt nog tijdelijke gegevens. De koppeling van de frontend met de API volgt in een aparte stap, zodat ik ieder onderdeel afzonderlijk kan begrijpen en testen.

---

## Interactie 9 - Stap 4: frontend koppelen aan de API

**Datum:** 26 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Producten met `fetch` ophalen uit de backend

### Volledige prompt van de student

> stap 4

### Antwoord en advies van AI

Codex controleerde eerst de bestanden uit stap 3. `server.js`, Express, `package.json`, `package-lock.json` en het publieke API-endpoint waren aanwezig. De server is lokaal gestart en `GET /api/producten` gaf de drie verwachte producten als JSON terug. De bestanden van stap 3 waren op dat moment nog niet gecommit. Voor stap 4 is geadviseerd om de tijdelijke productlijst uit `public/app.js` te verwijderen en de gegevens met de JavaScriptfunctie `fetch` uit `/api/producten` op te halen.

### Wat heb ik ermee gedaan?

Ik commit eerst mijn eigen werk uit stap 3. Daarna pas ik zelf `public/app.js` aan zodat de publieke pagina de backend als gegevensbron gebruikt.

### Controle

Ik controleer of de pagina via `http://localhost:3000` dezelfde drie producten toont, of de browserconsole geen fouten bevat en of een gewijzigde voorraad in `server.js` na een serverherstart zichtbaar wordt.

### Eigen beslissing

De frontend bevat vanaf deze stap geen eigen voorraadlijst meer. De backend wordt de enige gegevensbron, zodat verschillende schermen later dezelfde voorraad kunnen gebruiken.

---

## Interactie 10 - Stap 5: blijvende opslag met SQLite

**Datum:** 26 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Tijdelijke servergegevens vervangen door een database

### Volledige prompt van de student

> stap 5 aub

### Antwoord en advies van AI

Codex controleerde dat stap 4 in `public/app.js` aanwezig was. De pagina haalt producten met `fetch` op, verwerkt API-fouten en vernieuwt zichzelf iedere zestig seconden. De wijziging was nog niet gecommit. Voor stap 5 adviseerde Codex SQLite als lokale database. Omdat het project Node.js 24.16.0 gebruikt en `node:sqlite` lokaal beschikbaar is, is geen extern SQLite-pakket nodig. De officiële Node.js-documentatie is gebruikt om deze keuze te controleren.

### Wat heb ik ermee gedaan?

Ik commit eerst stap 4. Daarna maak ik zelf `database.js`, laat ik daarin de tabel `producten` aanmaken en vervang ik de tijdelijke array in `server.js` door een SQL-query.

### Controle

Ik controleer of `data/voorraad.db` wordt aangemaakt, of de API de producten uit SQLite teruggeeft en of de gegevens na het stoppen en opnieuw starten van de server blijven bestaan.

### Eigen beslissing

Ik gebruik de ingebouwde SQLite-module van Node.js 24. Dit houdt het project klein en begrijpelijk. Ik accepteer daarbij dat het project minimaal een recente Node.js 24-versie nodig heeft.

---

## Interactie 11 - Omvang en resterende stappen plannen

**Datum:** 26 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Inschatten hoeveel ontwikkelstappen het project nodig heeft

### Volledige prompt van de student

> als we zo door gaan met de stappen hoeveel stappen ong zijnn er

### Antwoord en advies van AI

Codex schatte dat de verplichte basis ongeveer achttien overzichtelijke stappen nodig heeft. De student werkt momenteel aan stap 5, waardoor er ongeveer dertien stappen overblijven. Moeilijke onderwerpen zoals authenticatie en testen kunnen tijdens het uitvoeren in kleinere deelstappen worden verdeeld. Bonusopdrachten vallen buiten deze schatting.

### Wat heb ik ermee gedaan?

Ik gebruik de routekaart om mijn voortgang te volgen en blijf per keer aan één klein en controleerbaar onderdeel werken.

### Controle

De geplande stappen zijn vergeleken met de verplichte software, security, test-, documentatie- en presentatieonderdelen uit de projectopdracht.

### Eigen beslissing

Ik bouw eerst alle verplichte onderdelen. Bonusfuncties worden alleen toegevoegd wanneer de basis volledig werkt en getest is.

---

## Interactie 12 - Stap 6: voorraad wijzigen via de API

**Datum:** 26 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Een veilige API-route voor voorraadmutaties

### Volledige prompt van de student

> nu stap 6

### Antwoord en advies van AI

Codex controleerde `database.js`, `server.js`, `.gitignore` en de Git-status. Stap 5 was gecommit en de echte aanvraag naar `GET /api/producten` gaf de drie producten uit SQLite terug. Voor stap 6 adviseerde Codex een `PATCH /api/producten/:id/voorraad`-route. De route ontvangt een geheel getal `verschil`, gebruikt een geparametriseerde en atomaire SQL-update en weigert een wijziging die de voorraad onder nul zou brengen.

### Wat heb ik ermee gedaan?

Ik voeg zelf JSON-verwerking en de PATCH-route aan `server.js` toe. Daarna test ik verhogen, verlagen, een onbekend product en een ongeldige negatieve eindvoorraad.

### Controle

Ik controleer de HTTP-statuscodes en JSON-antwoorden, kijk via `GET /api/producten` naar de nieuwe voorraad en herstart de server om te bevestigen dat de wijziging in SQLite blijft staan.

### Eigen beslissing

Ik gebruik één atomaire SQL-update voor een voorraadmutatie. Hierdoor kan een tweede verzoek niet tussen het lezen en schrijven van dezelfde voorraad komen.

---

## Interactie 13 - Foutdiagnose: Cannot GET /api/producten

**Datum:** 28 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Verdwenen GET-route na het toevoegen van de PATCH-route

### Volledige prompt van de student

> ik zat net bij de 2 commands for terminal om melk min 1 te maken mr er staat nu cannot get Api/producten

### Antwoord en advies van AI

Codex reproduceerde de fout met een echte GET-aanvraag. Zowel `/api/producten` als `/Api/producten` gaf statuscode 404 en `Cannot GET`. Daarna is `server.js` gecontroleerd. De nieuwe PATCH-route stond correct in het bestand, maar de eerdere `app.get("/api/producten")`-route was verdwenen. Een PATCH-aanvraag met het ongeldige verschil nul bereikte de nieuwe route en gaf correct statuscode 400, waarmee werd bevestigd dat de server en PATCH-route wel werkten.

### Wat heb ik ermee gedaan?

Ik plaats de GET-route zelf terug boven de PATCH-route, sla `server.js` op en herstart de server. Daarna test ik eerst GET en vervolgens opnieuw de voorraadwijziging.

### Controle

De fout is reproduceerbaar vastgelegd als HTTP 404. Na de correctie moet `GET /api/producten` statuscode 200 met een JSON-lijst geven en moet `PATCH /api/producten/1/voorraad` een geldig productantwoord geven.

### Eigen beslissing

Wanneer ik een nieuwe route toevoeg, controleer ik voortaan dat bestaande routes blijven staan en test ik iedere route afzonderlijk voordat ik commit.

---

## Interactie 14 - Producten blijven onzichtbaar na routeherstel

**Datum:** 28 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Oude Node-server draaide nog na wijziging van `server.js`

### Volledige prompt van de student

> ik zie me producten nogsteeds niet

### Antwoord en advies van AI

Codex testte de volledige keten opnieuw. De hoofdpagina en `app.js` werden met statuscode 200 geladen, maar `GET /api/producten` gaf nog steeds statuscode 404. De draaiende Node-server was om 09:13 gestart, terwijl `server.js` om 09:23 was gewijzigd. Hierdoor draaide de server nog met de oude code. Daarnaast bevatte het opgeslagen bestand nu wel de GET-route, maar was de PATCH-route opnieuw verdwenen.

### Wat heb ik ermee gedaan?

Ik plaats GET en PATCH allebei in hetzelfde `server.js`, sla het bestand op, stop de oude server volledig met `Ctrl + C` en start hem opnieuw. Ik open de pagina via `http://localhost:3000` en niet rechtstreeks als lokaal HTML-bestand.

### Controle

Na de herstart moet `GET /api/producten` statuscode 200 geven. Daarna moet de publieke pagina drie `.product`-elementen tonen en moet een geldige PATCH-aanvraag voorraad kunnen wijzigen.

### Eigen beslissing

Na iedere wijziging aan servercode herstart ik de Node-server voordat ik opnieuw test. Ik controleer bovendien dat nieuwe routes naast bestaande routes worden toegevoegd.

---

## Interactie 15 - Codex herstart en test de applicatie

**Datum:** 28 augustus 2026  
**AI-tool:** Codex met HTTP- en Playwright-test  
**Onderwerp:** Zelfstandig controleren of de producten weer verschijnen

### Volledige prompt van de student

> probeer jij is

### Antwoord en advies van AI

Codex controleerde dat poort 3000 werd gebruikt door het oude proces `node server.js`, stopte alleen dat proces en startte de opgeslagen servercode opnieuw. Daarna gaf `GET /api/producten` statuscode 200 met drie producten. De hoofdpagina en `app.js` gaven eveneens statuscode 200. Met een reeds geïnstalleerde Chrome-browser is de pagina headless geopend. De test vond drie `.product`-elementen: IJsjes met voorraad 0, Verse melk met voorraad 5 en Verse yoghurt met voorraad 3.

### Wat heb ik ermee gedaan?

De server draait opnieuw met de actuele code. Ik kan de pagina openen op `http://localhost:3000` en eventueel hard vernieuwen met `Ctrl + F5`.

### Controle

De API-test gaf status 200. De browsertest telde exact drie producten en een tweede netwerkcontrole vond geen mislukte responses.

### Eigen beslissing

Ik controleer voortaan na een serverwijziging zowel het API-adres als de zichtbare pagina. Zo kan ik onderscheid maken tussen een backendfout en een frontendfout.

---

## Interactie 16 - Stap 6 opnieuw afronden

**Datum:** 28 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** PATCH-route toevoegen zonder de GET-route te verwijderen

### Volledige prompt van de student

> oke we moeten nu nog stap 6

### Antwoord en advies van AI

Codex controleerde de actuele `server.js`. De GET-route stond op regel 12 en `app.listen` begon op regel 33; er was geen PATCH-route aanwezig. Codex gaf daarom opnieuw één afgebakend PATCH-codeblok met de uitdrukkelijke instructie om dit tussen de bestaande GET-route en `app.listen` te plaatsen en geen bestaande code te verwijderen.

### Wat heb ik ermee gedaan?

Ik voeg zelf de PATCH-route op de aangewezen plaats toe, sla het bestand op en herstart de server. Daarna test ik eerst GET en vervolgens een verlaging en verhoging van de melkvoorraad.

### Controle

Na de wijziging moeten zowel `GET /api/producten` als `PATCH /api/producten/1/voorraad` werken. De eindvoorraad wordt weer teruggezet op de oorspronkelijke waarde.

### Eigen beslissing

Ik verander bestaande routes niet wanneer ik een nieuwe route toevoeg. Ik controleer vóór het opslaan dat zowel `app.get` als `app.patch` in hetzelfde bestand staan.

---

## Interactie 17 - Stap 7: mobiele beheerpagina

**Datum:** 28 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Voorraad bedienen met plus- en minknoppen

### Volledige prompt van de student

> stap 7

### Antwoord en advies van AI

Codex controleerde dat GET, PATCH en `app.listen` tegelijk in `server.js` aanwezig waren en dat stap 6 was gecommit. Een echte controletest verlaagde melk van 5 naar 4 en verhoogde de voorraad daarna weer naar 5. Vervolgens adviseerde Codex een aparte mobiele beheerpagina met `beheer.html`, `beheer.css` en `beheer.js`. De pagina haalt producten via GET op en gebruikt de bestaande PATCH-route voor plus en min.

### Wat heb ik ermee gedaan?

Ik maak zelf de drie beheerbestanden in de map `public`. Ik bouw eerst de pagina, voeg daarna de styling toe en verbind tot slot de knoppen met de API.

### Controle

Ik test de pagina op `http://localhost:3000/beheer.html`, verlaag en verhoog voorraad, controleer de publieke pagina en controleer dat voorraad nul niet verder kan worden verlaagd.

### Eigen beslissing

De beheerpagina blijft voorlopig lokaal en onbeveiligd. Ik zet de applicatie nog niet online voordat authenticatie en autorisatie zijn toegevoegd.

---

## Interactie 18 - Beheerpagina op mobiel testen

**Datum:** 28 augustus 2026  
**AI-tool:** Codex  
**Onderwerp:** Responsieve simulatie en testen op een echte telefoon

### Volledige prompt van de student

> hoe testen we dit op mobiel

### Antwoord en advies van AI

Codex adviseerde twee controles: eerst de mobiele apparaatweergave van Chrome DevTools en daarna een echte telefoon op hetzelfde wifi-netwerk. Het lokale wifi-adres van de ontwikkelcomputer was `10.252.34.172`. De draaiende Node-server luisterde op alle interfaces en een echte HTTP-controle van `http://10.252.34.172:3000/beheer.html` gaf statuscode 200 met de titel `Voorraadbeheer`.

### Wat heb ik ermee gedaan?

Ik test de beheerpagina eerst met Chrome Device Toolbar en open daarna op mijn telefoon `http://10.252.34.172:3000/beheer.html` terwijl telefoon en computer hetzelfde wifi-netwerk gebruiken.

### Controle

Ik controleer op mobiel of de tekst leesbaar is, de knoppen gemakkelijk aanraakbaar zijn, min en plus werken en de publieke pagina dezelfde voorraad toont.

### Eigen beslissing

De mobiele netwerktoegang wordt alleen voor lokaal testen gebruikt. De beheerpagina wordt nog niet publiek gehost zolang login en API-beveiliging ontbreken.
