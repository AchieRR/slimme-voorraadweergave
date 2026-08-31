const inlogformulier =
    document.querySelector("#inlogformulier");

const gebruikersnaamInvoer =
    document.querySelector("#gebruikersnaam");

const wachtwoordInvoer =
    document.querySelector("#wachtwoord");

const inlogknop =
    document.querySelector("#inlogknop");

const meldingElement =
    document.querySelector("#inlogmelding");

async function controleerBestaandeSessie() {
    try {
        const response = await fetch("/api/sessie");

        if (response.ok) {
            window.location.replace("/beheer.html");
        }
    } catch (error) {
        console.error(
            "Sessie controleren mislukt:",
            error
        );
    }
}

inlogformulier.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        inlogknop.disabled = true;
        meldingElement.textContent = "Inloggen...";

        try {
            const response = await fetch(
                "/api/inloggen",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        gebruikersnaam:
                            gebruikersnaamInvoer.value.trim(),
                        wachtwoord:
                            wachtwoordInvoer.value
                    })
                }
            );

            const resultaat = await response.json();

            if (!response.ok) {
                throw new Error(
                    resultaat.fout ||
                    "Inloggen is mislukt."
                );
            }

            window.location.replace("/beheer.html");
        } catch (error) {
            console.error("Inloggen mislukt:", error);
            meldingElement.textContent = error.message;
        } finally {
            inlogknop.disabled = false;
        }
    }
);

controleerBestaandeSessie();

