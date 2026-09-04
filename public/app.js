const productenContainer = document.querySelector("#producten");

const verbindingsstatusElement =
    document.querySelector("#verbindingsstatus");

function formatteerPrijs(prijsCent) {
    return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
    }).format(prijsCent / 100);
}

function maakProductElement(product) {
    const isUitverkocht = product.voorraad === 0;

    const isTijdelijkNietBeschikbaar =
        product.beschikbaar === 0;

    const isNietBeschikbaar =
        isUitverkocht || isTijdelijkNietBeschikbaar;

    const productElement = document.createElement("article");
    productElement.classList.add("product");

    if (isNietBeschikbaar) {
        productElement.classList.add("niet-beschikbaar");
    }

    const informatieElement = document.createElement("div");

    const naamElement = document.createElement("h2");
    naamElement.textContent = product.naam;

    const statusElement = document.createElement("p");
    statusElement.classList.add("status");
    if (isTijdelijkNietBeschikbaar) {
        statusElement.textContent =
            "Tijdelijk niet beschikbaar";
    } else if (isUitverkocht) {
        statusElement.textContent = "Uitverkocht";
    } else {
        statusElement.textContent = "Beschikbaar";
    }

    const prijsElement = document.createElement("p");
    prijsElement.classList.add("prijs");

    if (product.prijs_cent > 0) {
        prijsElement.textContent =
            `${formatteerPrijs(product.prijs_cent)} per ${product.eenheid}`;
    } else {
        prijsElement.textContent =
            "Prijs nog niet bekend";
    }

    informatieElement.append(
        naamElement,
        statusElement,
        prijsElement
    );

    const aantalElement = document.createElement("p");
    aantalElement.classList.add("aantal");

    const nummerElement = document.createElement("strong");
    nummerElement.textContent = product.voorraad;

    const omschrijvingElement = document.createElement("span");
    omschrijvingElement.textContent = "op voorraad";

    aantalElement.append(nummerElement, omschrijvingElement);
    productElement.append(informatieElement, aantalElement);

    return productElement;
}

async function laadProducten() {
    try {
        const response = await fetch("/api/producten");

        if (!response.ok) {
            throw new Error(`API - fout: ${response.status} `);
        }

        const producten = await response.json();
        verbindingsstatusElement.textContent = "";

        const aantalProducten = producten.length;
        const liggendScherm = window.innerWidth >= window.innerHeight;
        const schermFactor = liggendScherm ? 1.5 : 0.75;

        let kolommen;

        if (aantalProducten <= 2) {
            kolommen = Math.max(aantalProducten, 1);
        } else if (aantalProducten <= 4) {
            kolommen = 2;
        } else {
            kolommen = Math.ceil(
                Math.sqrt(aantalProducten * schermFactor)
            );
        }

        const rijen = Math.max(
            1,
            Math.ceil(aantalProducten / kolommen)
        );

        productenContainer.dataset.aantal = aantalProducten;

        productenContainer.style.setProperty(
            "--kolommen",
            kolommen
        );

        productenContainer.style.setProperty(
            "--rijen",
            rijen
        );

        productenContainer.replaceChildren();

        for (const product of producten) {
            const productElement = maakProductElement(product);
            productenContainer.append(productElement);
        }
    } catch (error) {
        console.error(
            "Producten ophalen mislukt:",
            error
        );

        const heeftBestaandeProducten =
            productenContainer.querySelector(".product") !== null;

        if (heeftBestaandeProducten) {
            verbindingsstatusElement.textContent =
                "Geen verbinding. De laatst geladen voorraad wordt getoond.";
        } else {
            verbindingsstatusElement.textContent =
                "Geen verbinding met de voorraad.";

            productenContainer.textContent =
                "De voorraad is tijdelijk niet beschikbaar.";
        }
    }
}

laadProducten();

setInterval(laadProducten, 30_000);