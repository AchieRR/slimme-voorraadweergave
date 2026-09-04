# Slimme voorraadweergave

Dit document legt de vaste begrippen van het voorraadsysteem vast, zodat code en documentatie dezelfde woorden gebruiken.

## Language

**Product**:
Een artikel dat een gast bij de camping kan kopen en waarvan de actuele voorraad wordt bijgehouden.
_Avoid_: Item, artikelsoort

**Voorraad**:
Het aantal verkoopeenheden van een product dat op dit moment aanwezig is.
_Avoid_: Hoeveelheid, saldo

**Verkoopeenheid**:
De eenheid waarop de getoonde prijs betrekking heeft, bijvoorbeeld liter, stuk, fles of pak.
_Avoid_: Meeteenheid, verpakkingstype

**Productprijs**:
De verkoopprijs van één verkoopeenheid van een product.
_Avoid_: Totaalprijs, voorraadwaarde

**Wijziging**:
Een door een ingelogde medewerker uitgevoerde aanpassing aan een product, met de oude waarde, nieuwe waarde en het tijdstip.
_Avoid_: Logregel, mutatie zonder nadere betekenis

**Medewerker**:
Een bevoegde gebruiker met een eigen account die producten mag beheren.
_Avoid_: Admin, beheerder
