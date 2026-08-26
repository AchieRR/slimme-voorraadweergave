const express = require("express");
const path = require("path");

const app = express();
const poort = 3000;

const producten = [
    {
        id: 1,
        naam: "Verse melk",
        voorraad: 6
    },
    {
        id: 2,
        naam: "Verse yoghurt",
        voorraad: 3
    },
    {
        id: 3,
        naam: "IJsjes",
        voorraad: 0
    }
];

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/producten", (request, response) => {
    response.json(producten);
});

app.listen(poort, () => {
    console.log(`Server gestart op http://localhost:${poort}`);
});