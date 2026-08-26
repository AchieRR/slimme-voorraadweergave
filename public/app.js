const productenContainer = document.querySelector("#producten");

function maakProductElement(product) {
    const isUitverkocht = product.voorraad === 0;

    const productElement = document.createElement("article");
    productElement.classList.add("product");

    if (isUitverkocht) {
        productElement.classList.add("uitverkocht");
    }

    const informatieElement = document.createElement("div");

    const naamElement = document.createElement("h2");
    naamElement.textContent = product.naam;

    const statusElement = document.createElement("p");
    statusElement.classList.add("status");
    statusElement.textContent = isUitverkocht
        ? "Uitverkocht"
        : "Beschikbaar";

    informatieElement.append(naamElement, statusElement);

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
            throw new Error(`API-fout: ${response.status}`);
        }

        const producten = await response.json();

        productenContainer.replaceChildren();

        for (const product of producten) {
            const productElement = maakProductElement(product);
            productenContainer.append(productElement);
        }
    } catch (error) {
        console.error("Producten ophalen mislukt:", error);

        productenContainer.textContent =
            "De voorraad is tijdelijk niet beschikbaar.";
    }
}

laadProducten();

setInterval(laadProducten, 60_000);