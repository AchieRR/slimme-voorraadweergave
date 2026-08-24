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
