const productenContainer = document.querySelector("#beheer-producten");

const meldingElement = document.querySelector("#melding");

const nieuweProductFormulier =
    document.querySelector("#nieuw-product-formulier");

const productnaamInvoer =
    document.querySelector("#productnaam");

const beginvoorraadInvoer =
    document.querySelector("#beginvoorraad");

const medewerkernaamElement =
    document.querySelector("#medewerkernaam");

const uitlogknop =
    document.querySelector("#uitlogknop");


function maakProductElement(product) {
    const productElement = document.createElement("article");
    productElement.classList.add("product");

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
        maakiInstelFormulier(product);

    productElement.append(
        naamElement,
        voorraadElement,
        knoppenElement,
        instelFormulier
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

function maakiInstelFormulier(product) {
    const formulier = document.createElement("form");
    formulier.classList.add("instel-formulier");

    const label = document.createElement("label");
    label.textContent = "Voorraad instellen:";
    label.htmlFor = `voorraad-${product.id}`;

    const invoer = document.createElement("input");
    invoer.id = `voorraad-${product.id}`;
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

async function laadProducten() {
    try {
        const response = await fetch("/api/producten");

        if (!response.ok) {
            throw new Error(`API-fout: ${response.status}`);
        }

        const producten = await response.json();

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


async function wijzigVoorraad(productId, verschil) {
    meldingElement.textContent = "Voorraaad aanpassen...";

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

        const resultaat = await response.json();

        if (!response.ok) {
            throw new Error(resultaat.fout || "De voorraad kon niet worden gewijzigd."
            );
        }

        meldingElement.textContent =
            `${resultaat.naam} voorraad is aangepast naar ${resultaat.voorraad}.`;

        await laadProducten();
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

        const resultaat = await response.json();

        if (!response.ok) {
            throw new Error(
                resultaat.fout ||
                "De voorraad kon niet worden ingesteld."
            );
        }

        meldingElement.textContent =
            `${resultaat.naam} voorraad is ingesteld op ${resultaat.voorraad}.`;

        await laadProducten();
    } catch (error) {
        console.error("Voorraad instellen mislukt:", error);

        meldingElement.textContent = error.message;
    }
}

nieuweProductFormulier.addEventListener("submit", async (event) => {
    event.preventDefault();

    const naam = productnaamInvoer.value.trim();
    const voorraad = Number(beginvoorraadInvoer.value);
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
                voorraad: voorraad
            })
        });

        const resultaat = await response.json();

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

        await laadProducten();
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
            window.location.replace(".inloggen.html");
            return false;
        }

        if (!response.ok) {
            throw new Error(
                "De sessie kon niet worden gecontroleerd."
            );
        }

        const resultaat = await response.json();

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
            const resultaat = await response.json();

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
        await laadProducten();
    }
}

startBeheer();        