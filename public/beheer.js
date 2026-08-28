const productenContainer = document.querySelector("#beheer-producten");

const meldingElement = document.querySelector("#melding");

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

    productElement.append(
        naamElement,
        voorraadElement,
        knoppenElement
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

laadProducten();