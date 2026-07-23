// app.js
// Navigatie en basisfunctionaliteit

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => page.classList.remove("active"));

    document
        .getElementById(pageId)
        .classList.add("active");
}


// ---------- Home knoppen ----------

document.getElementById("btnPlayers").addEventListener("click", () => {

    if (typeof renderPlayers === "function") {
        renderPlayers();
    }

    showPage("players");

});

document.getElementById("btnPlay").addEventListener("click", () => {

    if (typeof renderAttendance === "function") {
        renderAttendance();
    }

    showPage("session");

});

document.getElementById("btnSettings").addEventListener("click", () => {

    showPage("settings");

});


// ---------- Home knoppen onderaan ----------

document.querySelectorAll("[data-home]").forEach(button => {

    button.addEventListener("click", () => {

        showPage("home");

    });

});


// ---------- Teams maken ----------

document.getElementById("generateTeams").addEventListener("click", () => {

    const selectedPlayers = [];

    document
        .querySelectorAll("#attendanceList input:checked")
        .forEach(player => {

            selectedPlayers.push(player.value);

        });

    if (selectedPlayers.length < 4) {

        alert("Selecteer minimaal 4 spelers.");

        return;

    }

    const courts = parseInt(
        document.getElementById("courtCount").value
    );

    const matches = createTeams(
        selectedPlayers,
        courts
    );

    showMatches(matches);

    showPage("result");

});


// ---------- WhatsApp ----------

document.getElementById("shareWhatsApp").addEventListener("click", () => {

    let text = "🎾 DubbelMaker\n\n";

    document.querySelectorAll(".matchCard").forEach(card => {

        text += card.innerText + "\n\n";

    });

    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent(text),
        "_blank"
    );

});


// ---------- Nieuwe ronde ----------

document.getElementById("nextRound").addEventListener("click", () => {

    showPage("session");

});


// ---------- Service Worker ----------

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("service-worker.js");

    });

}