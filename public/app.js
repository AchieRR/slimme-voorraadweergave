const producten = [
    {
        naam: "Verse melk",
        voorraad: 6
    },
    {
        naam: "Verse yoghurt",
        voorraad: 3
    },
    {
        naam: "IJsjes",
        voorraad: 0
    }
];

const productenContainer = document.querySelector("#producten");

for (const product of producten) {
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
    productenContainer.append(productElement);
}









