const productenContainer = document.querySelector("#beheer-producten");

const meldingElement = document.querySelector("#melding");

const nieuweProductFormulier =
    document.querySelector("#nieuw-product-formulier");

const productnaamInvoer =
    document.querySelector("#productnaam");

const beginvoorraadInvoer =
    document.querySelector("#beginvoorraad");

const productprijsInvoer =
    document.querySelector("#productprijs");

const producteenheidInvoer =
    document.querySelector("#producteenheid");

const medewerkernaamElement =
    document.querySelector("#medewerkernaam");

const wijzigingenContainer =
    document.querySelector("#wijzigingen");

const uitlogknop =
    document.querySelector("#uitlogknop");

async function leesApiAntwoord(response) {
    if (response.status === 401) {
        window.location.replace("/inloggen.html");

        throw new Error(
            "Je sessie is verlopen. Log opnieuw in."
        );
    }

    const inhoudstype =
        response.headers.get("content-type") || "";

    if (!inhoudstype.includes("application/json")) {
        throw new Error(
            "De server gaf een onverwacht antwoord. Probeer het opnieuw."
        );
    }

    return response.json();
}

function formatteerPrijs(prijsCent) {
    return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR"
    }).format(prijsCent / 100);
}

function formatteerWijzigingssoort(soort) {
    const namen = {
        product_toegevoegd: "Product toegevoegd",
        voorraad: "Voorraad gewijzigd",
        prijs: "Prijs gewijzigd",
        beschikbaarheid: "Beschikbaarheid gewijzigd"
    };

    return namen[soort] || soort;
}

function maakWijzigingElement(wijziging) {
    const artikel = document.createElement("article");
    artikel.classList.add("wijziging");

    const titel = document.createElement("h3");
    titel.textContent =
        `${wijziging.productnaam}: ` +
        formatteerWijzigingssoort(wijziging.soort);

    const verandering = document.createElement("p");
    verandering.classList.add("wijziging-waarden");

    const oudeWaarde =
        wijziging.oude_waarde ?? "Geen vorige waarde";

    verandering.textContent =
        `${oudeWaarde} naar ${wijziging.nieuwe_waarde}`;

    const datum = new Date(wijziging.gewijzigd_op);

    const informatie = document.createElement("p");
    informatie.classList.add('wijziging-informatie');
    informatie.textContent =
        `${wijziging.medewerker} - ` +
        datum.toLocaleString("nl-NL", {
            dateStyle: "short",
            timeStyle: "short"
        });

    artikel.append(
        titel,
        verandering,
        informatie
    );

    return artikel;
}

function maakProductElement(product) {
    const productElement = document.createElement("article");
    productElement.classList.add("product");

    const isBeschikbaar = product.beschikbaar === 1;

    if (!isBeschikbaar) {
        productElement.classList.add("niet-beschikbaar");
    }

    const naamElement = document.createElement("h2");
    naamElement.textContent = product.naam;


    const voorraadElement = document.createElement("p");
    voorraadElement.classList.add("voorraad");

    const voorraadGetal = document.createElement("strong");
    voorraadGetal.textContent = product.voorraad;

    voorraadElement.append(
        "voorraad: ",
        voorraadGetal,
    );

    const prijsElement = document.createElement("p");
    prijsElement.classList.add("productprijs");

    if (product.prijs_cent === 0) {
        prijsElement.textContent =
            "Prijs: nog niet ingesteld";
    } else {
        prijsElement.textContent =
            `Prijs: ${formatteerPrijs(product.prijs_cent)} per ${product.eenheid} `;
    }

    const statusElement = document.createElement("p");
    statusElement.classList.add("productstatus");

    statusElement.textContent = isBeschikbaar
        ? "Status: beschikbaar"
        : "Status: tijdelijk niet beschikbaar";





    const knoppenElement = document.createElement("div");
    knoppenElement.classList.add("knoppen");

    const minKnop = maakVoorraadKnop(
        "- 1",
        product,
        -1
    );

    const plusKnop = maakVoorraadKnop(
        "+ 1",
        product,
        1
    );

    if (product.voorraad === 0) {
        minKnop.disabled = true;
    }

    knoppenElement.append(minKnop, plusKnop);

    const instelFormulier =
        maakInstelFormulier(product);

    const beschikbaarheidsknop =
        maakBeschikbaarheidsKnop(product);

    const prijsFormulier =
        maakPrijsFormulier(product);

    productElement.append(
        naamElement,
        voorraadElement,
        prijsElement,
        prijsFormulier,
        knoppenElement,
        instelFormulier,
        beschikbaarheidsknop,
        statusElement
    );

    return productElement;
}

function maakVoorraadKnop(tekst, product, verschil) {
    const knop = document.createElement("button");

    knop.type = "button";
    knop.classList.add("voorraadknop");
    knop.textContent = tekst;

    knop.addEventListener("click", async () => {
        knop.disabled = true;

        await wijzigVoorraad(product.id, verschil);

        knop.disabled = false;
    });

    return knop;
}

function maakBeschikbaarheidsKnop(product) {
    const knop = document.createElement("button");
    const isBeschikbaar = product.beschikbaar === 1;

    knop.type = "button";
    knop.classList.add("beschikbaarheidsknop");

    knop.textContent = isBeschikbaar
        ? "Tijdelijk niet beschikbaar maken"
        : "Weer beschikbaar maken";

    knop.addEventListener("click", async () => {
        knop.disabled = true;

        await stelBeschikbaarheid(
            product.id,
            !isBeschikbaar
        );

        knop.disabled = false;
    });

    return knop;
}

function maakInstelFormulier(product) {
    const formulier = document.createElement("form");
    formulier.classList.add("instel-formulier");

    const label = document.createElement("label");
    label.textContent = "Voorraad instellen:";
    label.htmlFor = `voorraad - ${product.id} `;

    const invoer = document.createElement("input");
    invoer.id = `voorraad - ${product.id} `;
    invoer.classList.add("voorraad-invoer");
    invoer.type = "number";
    invoer.min = 0;
    invoer.max = 10000;
    invoer.step = 1;
    invoer.required = true;
    invoer.value = product.voorraad;

    const knop = document.createElement("button");
    knop.classList.add("instelknop");
    knop.type = "submit";
    knop.textContent = "Instellen";

    formulier.append(label, invoer, knop);

    formulier.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nieuweVoorraad = Number(invoer.value);

        knop.disabled = true;

        await stelVoorraadin(
            product.id,
            nieuweVoorraad
        );

        knop.disabled = false;

    });

    return formulier;
}

function maakPrijsFormulier(product) {
    const formulier = document.createElement("form");
    formulier.classList.add("prijs-formulier");

    const prijsVeld = document.createElement("label");
    prijsVeld.textContent = "Prijs in euro:";

    const prijsInvoer = document.createElement("input");
    prijsInvoer.type = "number";
    prijsInvoer.min = "0.01";
    prijsInvoer.max = "10000";
    prijsInvoer.step = "0.01";
    prijsInvoer.required = true;


    prijsInvoer.value =
        product.prijs_cent > 0
            ? (product.prijs_cent / 100).toFixed(2)
            : "";

    prijsVeld.append(prijsInvoer);

    const eenheidVeld = document.createElement("label");
    eenheidVeld.textContent = "Prijs per:";

    const eenheidInvoer = document.createElement("input");
    eenheidInvoer.type = "text";
    eenheidInvoer.minLength = 1;
    eenheidInvoer.maxLength = 30;
    eenheidInvoer.required = true;
    eenheidInvoer.value = product.eenheid;

    eenheidVeld.append(eenheidInvoer);

    const knop = document.createElement("button");
    knop.type = "submit";
    knop.textContent = "Prijs instellen";

    formulier.append(
        prijsVeld,
        eenheidVeld,
        knop
    );

    formulier.addEventListener(
        "submit",
        async (event) => {
            event.preventDefault();

            const prijs =
                Number(prijsInvoer.value);

            const prijsCent =
                Math.round(prijs * 100);

            const eenheid =
                eenheidInvoer.value.trim();

            knop.disabled = true;

            await stelPrijsIn(
                product.id,
                prijsCent,
                eenheid
            );

            knop.disabled = false;
        }
    );

    return formulier;
}

async function laadProducten() {
    try {
        const response = await fetch("/api/producten");

        if (!response.ok) {
            throw new Error(`API - fout: ${response.status} `);
        }

        const producten = await leesApiAntwoord(response);

        productenContainer.replaceChildren();

        for (const product of producten) {
            const productElement =
                maakProductElement(product);

            productenContainer.append(productElement);

        }

    } catch (error) {
        console.error("Producten ophalen mislukt:", error);

        productenContainer.textContent =
            "Producten kunnen niet worden opgehaald.";
    }
}

async function laadWijzigingen() {
    try {
        const response = await fetch("/api/wijzigingen");
        const wijzigingen = await leesApiAntwoord(response);

        if (!response.ok) {
            throw new Error(
                wijzigingen.fout ||
                "De wijzigingshistorie kon niet worden opgehaald."
            );

        }
        wijzigingenContainer.replaceChildren();

        if (wijzigingen.length === 0) {
            wijzigingenContainer.textContent =
                "Er zijn nog geen wijzigingen.";
            return;
        }

        for (const wijziging of wijzigingen) {
            const wijzigingElement =
                maakWijzigingElement(wijziging);

            wijzigingenContainer.append(wijzigingElement);
        }
    } catch (error) {
        console.error("Historie ophalen mislukt:", error);

        wijzigingenContainer.textContent =
            error.message;
    }
}

async function wijzigVoorraad(productId, verschil) {
    meldingElement.textContent = "Voorraad aanpassen...";

    try {
        const response = await fetch(
            `/api/producten/${productId}/voorraad`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ verschil })
            }
        );

        const resultaat = await leesApiAntwoord(response);

        if (!response.ok) {
            throw new Error(resultaat.fout || "De voorraad kon niet worden gewijzigd."
            );
        }

        meldingElement.textContent =
            `${resultaat.naam} voorraad is aangepast naar ${resultaat.voorraad}.`;

        await Promise.all([
            laadProducten(),
            laadWijzigingen()
        ]);
    } catch (error) {
        console.error("Voorraad wijzigen mislukt:", error);

        meldingElement.textContent = error.message;
    }
}

async function stelVoorraadin(productId, voorraad) {
    meldingElement.textContent =
        "Voorraad instellen...";

    try {
        const response = await fetch(
            `/api/producten/${productId}/voorraad`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    voorraad: voorraad
                })
            }
        );

        const resultaat = await leesApiAntwoord(response);

        if (!response.ok) {
            throw new Error(
                resultaat.fout ||
                "De voorraad kon niet worden ingesteld."
            );
        }

        meldingElement.textContent =
            `${resultaat.naam} voorraad is ingesteld op ${resultaat.voorraad}.`;

        await Promise.all([
            laadProducten(),
            laadWijzigingen()
        ]);
    } catch (error) {
        console.error("Voorraad instellen mislukt:", error);

        meldingElement.textContent = error.message;
    }
}

async function stelPrijsIn(
    productId,
    prijsCent,
    eenheid
) {
    meldingElement.textContent =
        "Prijs aanpassen...";

    try {
        const response = await fetch(
            `/api/producten/${productId}/prijs`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prijs_cent: prijsCent,
                    eenheid: eenheid
                })
            }
        );

        const resultaat =
            await leesApiAntwoord(response);

        if (!response.ok) {
            throw new Error(
                resultaat.fout ||
                "De prijs kon niet worden aangepast."
            );
        }

        meldingElement.textContent =
            `${resultaat.naam} kost nu ` +
            `${formatteerPrijs(resultaat.prijs_cent)} ` +
            `per ${resultaat.eenheid}.`;

        await Promise.all([
            laadProducten(),
            laadWijzigingen()
        ]);
    } catch (error) {
        console.error(
            "Prijs aanpassen mislukt:",
            error
        );

        meldingElement.textContent = error.message;
    }
}

async function stelBeschikbaarheid(
    productId,
    beschikbaar
) {
    meldingElement.textContent =
        "Beschikbaarheid aanpassen...";

    try {
        const response = await fetch(
            `/api/producten/${productId}/beschikbaarheid`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    beschikbaar: beschikbaar
                })
            }
        );

        const resultaat = await leesApiAntwoord(response);

        if (!response.ok) {
            throw new Error(
                resultaat.fout ||
                "De beschikbaarheid kon niet worden aangepast."
            );
        }

        const statusTekst =
            resultaat.beschikbaar === 1
                ? "beschikbaar"
                : "tijdelijk niet beschikbaar";

        meldingElement.textContent =
            `${resultaat.naam} is nu ${statusTekst}.`;

        await Promise.all([
            laadProducten(),
            laadWijzigingen()
        ]);
    } catch (error) {
        console.error(
            "Beschikbaarheid aanpassen mislukt:",
            error
        );

        meldingElement.textContent = error.message;
    }
}

nieuweProductFormulier.addEventListener("submit", async (event) => {
    event.preventDefault();

    const naam = productnaamInvoer.value.trim();
    const voorraad = Number(beginvoorraadInvoer.value);
    const prijs = Number(productprijsInvoer.value);
    const prijsCent = Math.round(prijs * 100);
    const eenheid = producteenheidInvoer.value.trim();
    const knop = nieuweProductFormulier.querySelector("button");

    knop.disabled = true;
    meldingElement.textContent = "Product toevoegen...";

    try {
        const response = await fetch("/api/producten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                naam: naam,
                voorraad: voorraad,
                prijs_cent: prijsCent,
                eenheid: eenheid
            })
        });

        const resultaat = await leesApiAntwoord(response);

        if (!response.ok) {
            throw new Error(
                resultaat.fout ||
                "Het product kon niet worden toegevoegd."
            );
        }

        meldingElement.textContent =
            `${resultaat.naam} is toegevoegd.`;

        nieuweProductFormulier.reset();
        beginvoorraadInvoer.value = 0;
        producteenheidInvoer.value = "stuk";

        await Promise.all([
            laadProducten(),
            laadWijzigingen()
        ]);
    } catch (error) {
        console.error("Product toevoegen mislukt:", error);
        meldingElement.textContent = error.message;
    } finally {
        knop.disabled = false;
    }
});

async function controleerSessie() {
    try {
        const response = await fetch("/api/sessie");

        if (response.status === 401) {
            window.location.replace("/inloggen.html");
            return false;
        }

        if (!response.ok) {
            throw new Error(
                "De sessie kon niet worden gecontroleerd."
            );
        }

        const resultaat = await leesApiAntwoord(response);

        medewerkernaamElement.textContent =
            resultaat.medewerker.gebruikersnaam;

        return true;
    } catch (error) {
        console.error(
            "Sessie controleren mislukt:",
            error
        );


        meldingElement.textContent = error.message;
        return false;
    }
}

uitlogknop.addEventListener("click", async () => {
    uitlogknop.disabled = true;

    try {
        const response = await fetch(
            "/api/uitloggen",
            {
                method: "POST"
            }
        );

        if (!response.ok && response.status !== 401) {
            const resultaat = await leesApiAntwoord(response);

            throw new Error(
                resultaat.fout ||
                "Uitloggen is mislukt."
            );
        }

        window.location.replace("/inloggen.html");
    } catch (error) {
        console.error("Uitloggen mislukt:", error);
        meldingElement.textContent = error.message;
        uitlogknop.disabled = false;
    }
});

async function startBeheer() {
    const ingelogd = await controleerSessie();

    if (ingelogd) {
        await Promise.all([
            laadProducten(),
            laadWijzigingen()
        ]);
    }
}

startBeheer();
