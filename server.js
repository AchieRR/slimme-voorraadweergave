const database = require("./database");

const express = require("express");
const path = require("path");

const session = require("express-session");

const {
    controleerWachtwoord
} = require("./wachtwoorden");

const app = express();
const poort = 3000;
app.use(express.json());

const sessieGeheim = process.env.SESSIE_GEHEIM;

if (!sessieGeheim || sessieGeheim.length < 64) {
    throw new Error(
        "SESSIE_GEHEIM ontbreekt of is te kort."
    )
}

app.use(session({
    name: "voorraad.sid",
    secret: sessieGeheim,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 8 * 60 * 60 * 1000
    }
}));

function vereisLogin(request, response, next) {
    if (!request.session.medewerker) {
        return response.status(401).json({
            fout: "Je moet eerst inloggen."
        });
    }

    next();
}

const voegWijzigingToe = database.prepare(`
    INSERT INTO wijzigingen (
        product_id,
        medewerker_id,
        soort,
        oude_waarde,
        nieuwe_waarde
    )
    VALUES (?, ?, ?, ?, ?)
`);

function registreerWijziging({
    productId,
    medewerkerId,
    soort,
    oudeWaarde,
    nieuweWaarde
}) {
    const oudeTekst =
        oudeWaarde === null ||
            oudeWaarde === undefined
            ? null
            : String(oudeWaarde);

    const nieuweTekst =
        String(nieuweWaarde);

    voegWijzigingToe.run(
        productId,
        medewerkerId,
        soort,
        oudeTekst,
        nieuweTekst
    );
}

app.get("/beheer.html", (request, response) => {
    if (!request.session.medewerker) {
        return response.redirect("/inloggen.html");
    }

    return response.sendFile(
        path.join(__dirname, "public", "beheer.html")
    );
});

app.use(express.static(path.join(__dirname, "public")));


app.get("/api/producten", (request, response) => {
    try {
        const query = database.prepare(`
            SELECT id, naam, voorraad, prijs_cent, eenheid, beschikbaar
            FROM producten
            ORDER BY naam
    `);

        const producten = query.all();

        response.json(producten);
    } catch (error) {
        console.error("Databasefout:", error);

        response.status(500).json({
            fout: "De voorraad kon niet worden opgehaald."
        });
    }
});

app.post("/api/inloggen", (request, response) => {
    try {
        const gebruikersnaam =
            typeof request.body?.gebruikersnaam === "string"
                ? request.body.gebruikersnaam.trim()
                : "";

        const wachtwoord =
            typeof request.body?.wachtwoord === "string"
                ? request.body.wachtwoord
                : "";

        if (
            gebruikersnaam.length < 2 ||
            gebruikersnaam.length > 100 ||
            wachtwoord.length < 1 ||
            wachtwoord.length > 200
        ) {
            return response.status(400).json({
                fout: "Vul een geldige gebruikersnaam en wachtwoord in."
            });
        }

        const medewerker = database.prepare(`
            SELECT
                id,
    gebruikersnaam,
    wachtwoord_hash,
    zout
            FROM medewerkers
            WHERE gebruikersnaam = ?
    `).get(gebruikersnaam);

        const geldigeWachtwoord =
            medewerker &&
            controleerWachtwoord(
                wachtwoord,
                medewerker.zout,
                medewerker.wachtwoord_hash
            );

        if (!geldigeWachtwoord) {
            return response.status(401).json({
                fout: "Ongeldige gebruikersnaam of wachtwoord."
            });
        }

        request.session.regenerate((error) => {
            if (error) {
                console.error("Sessie regenereren mislukt:", error);

                return response.status(500).json({
                    fout: "Inloggen mislukt."
                });
            }

            request.session.medewerker = {
                id: medewerker.id,
                gebruikersnaam: medewerker.gebruikersnaam
            };

            return response.json({
                melding: "Inloggen gelukt.",
                medewerker: request.session.medewerker
            });
        });
    } catch (error) {
        console.error("Inloggen mislukt:", error);

        return response.status(500).json({
            fout: "Inloggen is tijdelijk niet mogelijk."
        });
    }
});

app.get("/api/sessie", (request, response) => {
    if (!request.session.medewerker) {
        return response.status(401).json({
            fout: "Niet ingelogd."
        });
    }

    return response.json({
        medewerker: request.session.medewerker
    });
});

app.get(
    "/api/wijzigingen",
    vereisLogin,
    (request, response) => {
        try {
            const wijzigingen = database.prepare(`
                SELECT
                    w.id,
                    p.naam AS productnaam,
                    m.gebruikersnaam AS medewerker,
                    w.soort,
                    w.oude_waarde,
                    w.nieuwe_waarde,
                    strftime(
                        '%Y-%m-%dT%H:%M:%SZ',
                        w.gewijzigd_op
                    ) AS gewijzigd_op
                FROM wijzigingen AS w
                JOIN producten AS p
                    ON p.id = w.product_id
                JOIN medewerkers AS m
                    ON m.id = w.medewerker_id
                ORDER BY w.id DESC
                LIMIT 100
            `).all();

            return response.json(wijzigingen);
        } catch (error) {
            console.error(
                "Historie ophalen mislukt:",
                error
            );

            return response.status(500).json({
                fout: "De wijzigingshistorie kon niet worden opgehaald."
            });
        }
    }
);

app.post("/api/uitloggen", vereisLogin, (request, response) => {
    request.session.destroy((error) => {
        if (error) {
            console.error("Uitloggen mislukt:", error);

            return response.status(500).json({
                fout: "Uitloggen is tijdelijk niet mogelijk."
            });
        }

        response.clearCookie(
            "voorraad.sid",
            { path: "/" }
        );

        return response.json({
            melding: "Je bent uitgelogd."
        });
    });
}
);


app.post("/api/producten", vereisLogin, (request, response) => {
    try {
        const naam = typeof request.body?.naam === "string"
            ? request.body.naam.trim()
            : "";

        const voorraad = request.body?.voorraad;

        const prijsCent = request.body?.prijs_cent;

        const eenheid =
            typeof request.body?.eenheid === "string"
                ? request.body.eenheid.trim().toLowerCase()
                : "";

        if (naam.length < 2 || naam.length > 100) {
            return response.status(400).json({
                fout: "Naam moet tussen 2 en 100 tekens bevatten."
            });
        }


        if (
            !Number.isInteger(voorraad) ||
            voorraad < 0 ||
            voorraad > 10000
        ) {
            return response.status(400).json({
                fout: "Voorraad moet een geheel getal tussen 0 en 10000 zijn."
            });
        }

        if (
            !Number.isInteger(prijsCent) ||
            prijsCent < 1 ||
            prijsCent > 1000000
        ) {
            return response.status(400).json({
                fout: "Prijs moet tussen 1 cent en 10.000 euro zijn."
            });
        }

        if (eenheid.length < 1 || eenheid.length > 30) {
            return response.status(400).json({
                fout: "Eenheid moet tussen 1 en 30 tekens bevatten."
            });
        }

        const bestaandProduct = database.prepare(`
        SELECT id
        FROM producten
        WHERE naam = ? COLLATE NOCASE
    `).get(naam);

        if (bestaandProduct) {
            return response.status(409).json({
                fout: "Er bestaat al een product met deze naam."
            });
        }

        const product = database.prepare(`
            INSERT INTO producten(
        naam,
        voorraad,
        prijs_cent,
        eenheid
    )
            VALUES(?, ?, ?, ?)
            RETURNING
                id,
    naam,
    voorraad,
    prijs_cent,
    eenheid,
    beschikbaar
        `).get(
            naam,
            voorraad,
            prijsCent,
            eenheid
        );

        registreerWijziging({
            productId: product.id,
            medewerkerId:
                request.session.medewerker.id,
            soort: "product_toegevoegd",
            oudeWaarde: null,
            nieuweWaarde:
                `Voorraad ${product.voorraad}, ` +
                `${product.prijs_cent} cent per ` +
                `${product.eenheid}`
        });

        return response.status(201).json(product);
    } catch (error) {
        console.error("Product toevoegen mislukt:", error);

        return response.status(500).json({
            fout: "Het product kon niet worden toegevoegd."
        });
    }
});


app.patch("/api/producten/:id/voorraad", vereisLogin, (request, response) => {
    try {
        const productId = Number(request.params.id);
        const verschil = request.body?.verschil;

        if (!Number.isInteger(productId) || productId < 1) {
            return response.status(400).json({
                fout: "Het productnummer is ongeldig."
            });
        }

        if (
            !Number.isInteger(verschil) ||
            verschil === 0 ||
            Math.abs(verschil) > 1000
        ) {
            return response.status(400).json({
                fout: "Verschil moet een geheel getal tussen -1000 en 1000 zijn en mag niet 0 zijn."
            });
        }

        const wijzigVoorraad = database.prepare(`
            UPDATE producten
            SET voorraad = voorraad + ?
    WHERE id = ?
        AND voorraad + ? >= 0
            RETURNING id, naam, voorraad, prijs_cent, eenheid, beschikbaar
    `);

        const product = wijzigVoorraad.get(
            verschil,
            productId,
            verschil
        );

        if (product) {
            registreerWijziging({
                productId: product.id,
                medewerkerId:
                    request.session.medewerker.id,
                soort: "voorraad",
                oudeWaarde:
                    product.voorraad - verschil,
                nieuweWaarde:
                    product.voorraad
            });

            return response.json(product);
        }

        const bestaandProduct = database
            .prepare("SELECT id FROM producten WHERE id = ?")
            .get(productId);

        if (!bestaandProduct) {
            return response.status(404).json({
                fout: "Product niet gevonden."
            });
        }

        return response.status(400).json({
            fout: "De voorraad mag niet lager dan 0 worden."
        });
    } catch (error) {
        console.error("Voorraad wijzigen mislukt:", error);

        return response.status(500).json({
            fout: "De voorraad kon niet worden gewijzigd."
        });
    }
});

app.put("/api/producten/:id/voorraad", vereisLogin, (request, response) => {
    try {
        const productId = Number(request.params.id);
        const voorraad = request.body?.voorraad;

        if (!Number.isInteger(productId) || productId < 1) {
            return response.status(400).json({
                fout: "Het productnummer is ongeldig."
            });
        }

        if (
            !Number.isInteger(voorraad) ||
            voorraad < 0 ||
            voorraad > 10000
        ) {
            return response.status(400).json({
                fout: "Voorraad moet een geheel getal tussen 0 en 10000 zijn."
            });
        }

        const vorigeSituatie = database.prepare(`
            SELECT voorraad
            FROM producten
            WHERE id = ?
        `).get(productId);

        if (!vorigeSituatie) {
            return response.status(404).json({
                fout: "Product niet gevonden."
            });
        }

        const product = database.prepare(`
            UPDATE producten
            SET voorraad = ?
    WHERE id = ?
        RETURNING id, naam, voorraad, prijs_cent, eenheid, beschikbaar
    `).get(voorraad, productId);

        if (!product) {
            return response.status(404).json({
                fout: "Product niet gevonden."
            });
        }

        if (vorigeSituatie.voorraad !== product.voorraad) {
            registreerWijziging({
                productId: product.id,
                medewerkerId:
                    request.session.medewerker.id,
                soort: "voorraad",
                oudeWaarde:
                    vorigeSituatie.voorraad,
                nieuweWaarde:
                    product.voorraad
            });
        }

        return response.json(product);
    } catch (error) {
        console.error("Voorraad wijzigen mislukt:", error);

        return response.status(500).json({
            fout: "De voorraad kon niet worden gewijzigd."
        });
    }
});

app.put(
    "/api/producten/:id/prijs",
    vereisLogin,
    (request, response) => {
        try {
            const productId = Number(request.params.id);
            const prijsCent = request.body?.prijs_cent;

            const eenheid =
                typeof request.body?.eenheid === "string"
                    ? request.body.eenheid.trim().toLowerCase()
                    : "";

            if (
                !Number.isInteger(productId) ||
                productId < 1
            ) {
                return response.status(400).json({
                    fout: "Het productnummer is ongeldig."
                });
            }

            if (
                !Number.isInteger(prijsCent) ||
                prijsCent < 1 ||
                prijsCent > 1000000
            ) {
                return response.status(400).json({
                    fout: "Prijs moet tussen 1 cent en 10.000 euro zijn."
                });
            }

            if (
                eenheid.length < 1 ||
                eenheid.length > 30
            ) {
                return response.status(400).json({
                    fout: "Eenheid moet tussen 1 en 30 tekens bevatten."
                });
            }

            const vorigeSituatie = database.prepare(`
                SELECT prijs_cent, eenheid
                FROM producten
                WHERE id = ?
                `).get(productId);

            if (!vorigeSituatie) {
                return response.status(404).json({
                    fout: "Product niet gevonden."
                });
            }

            const product = database.prepare(`
                UPDATE producten
                SET prijs_cent = ?,
    eenheid = ?
        WHERE id = ?
            RETURNING id, naam, voorraad, prijs_cent, eenheid, beschikbaar
    `).get(
                prijsCent,
                eenheid,
                productId
            );

            if (!product) {
                return response.status(404).json({
                    fout: "Product niet gevonden."
                });
            }

            const prijsIsGewijzigd =
                vorigeSituatie.prijs_cent !==
                product.prijs_cent ||
                vorigeSituatie.eenheid !==
                product.eenheid;

            if (prijsIsGewijzigd) {
                registreerWijziging({
                    productId: product.id,
                    medewerkerId:
                        request.session.medewerker.id,
                    soort: "prijs",
                    oudeWaarde:
                        `${vorigeSituatie.prijs_cent} cent ` +
                        `per ${vorigeSituatie.eenheid}`,
                    nieuweWaarde:
                        `${product.prijs_cent} cent ` +
                        `per ${product.eenheid}`
                });
            }

            return response.json(product);
        } catch (error) {
            console.error(
                "Prijs wijzigen mislukt:",
                error
            );

            return response.status(500).json({
                fout: "De prijs kon niet worden gewijzigd."
            });
        }
    }
);

app.put(
    "/api/producten/:id/beschikbaarheid",
    vereisLogin,
    (request, response) => {
        try {
            const productId = Number(request.params.id);
            const beschikbaar = request.body?.beschikbaar;

            if (
                !Number.isInteger(productId) ||
                productId < 1
            ) {
                return response.status(400).json({
                    fout: "Het productnummer is ongeldig."
                });
            }

            if (typeof beschikbaar !== "boolean") {
                return response.status(400).json({
                    fout: "Beschikbaarheid moet true of false zijn."
                });
            }

            const vorigeSituatie = database.prepare(`
                SELECT beschikbaar
                FROM producten
                WHERE id = ?
            `).get(productId);

            if (!vorigeSituatie) {
                return response.status(404).json({
                    fout: 'Product niet gevonden.'
                });
            }

            const product = database.prepare(`
                UPDATE producten
                SET beschikbaar = ?
    WHERE id = ?
        RETURNING id, naam, voorraad, prijs_cent, eenheid, beschikbaar
    `).get(
                beschikbaar ? 1 : 0,
                productId
            );

            if (!product) {
                return response.status(404).json({
                    fout: "Product niet gevonden."
                });
            }

            if (
                vorigeSituatie.beschikbaar !==
                product.beschikbaar
            ) {
                registreerWijziging({
                    productId: product.id,
                    medewerkerId:
                        request.session.medewerker.id,
                    soort: "beschikbaarheid",
                    oudeWaarde:
                        vorigeSituatie.beschikbaar === 1
                            ? "beschikbaar"
                            : "tijdelijk niet beschikbaar",
                    nieuweWaarde:
                        product.beschikbaar === 1
                            ? "beschikbaar"
                            : "tijdelijk niet beschikbaar"
                });
            }


            return response.json(product);
        } catch (error) {
            console.error(
                "Beschikbaarheid wijzigen mislukt:",
                error
            );

            return response.status(500).json({
                fout: "De beschikbaarheid kon niet worden gewijzigd."
            });
        }
    }
);


app.listen(poort, () => {
    console.log(`Server gestart op http://localhost:${poort}`);
});
