// app.js
// Hoofdlogica DubbelMaker


let currentMatches = [];


// scherm wisselen

function showScreen(screenId){

    document
    .querySelectorAll(".screen")
    .forEach(screen=>{
        screen.classList.add("hidden");
    });


    document
    .getElementById(screenId)
    .classList.remove("hidden");

}



// aanwezigheid tonen

function renderAttendance(){

    const list =
    document.getElementById(
        "attendanceList"
    );


    if(!list) return;


    list.innerHTML="";


    const players =
    Storage.load("players",[]);


    players.forEach(player=>{


        const label =
        document.createElement("label");


        label.innerHTML = `

        <input 
        type="checkbox"
        value="${player}">

        ${player}

        `;


        list.appendChild(label);


    });

}



// teams maken

function generateMatches(){


    const selected =
    [...document.querySelectorAll(
        "#attendanceList input:checked"
    )]
    .map(input=>input.value);



    const courts =
    Number(
        document.getElementById(
            "courtCount"
        ).value
    );



    if(selected.length < 4){

        alert(
        "Selecteer minimaal 4 spelers"
        );

        return;

    }



    currentMatches =
    createTeams(
        selected,
        courts
    );



    showMatches(
        currentMatches
    );


    showScreen(
        "resultScreen"
    );

}



// WhatsApp delen

function shareWhatsApp(){


    let text =
    "🎾 Tennisindeling\n\n";


    currentMatches.forEach(match=>{

        text +=
        "Baan " +
        match.court +
        ":\n" +
        match.team1 +
        " 🆚 " +
        match.team2 +
        "\n\n";

    });



    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent(text)
    );


}



// start

document.addEventListener(
"DOMContentLoaded",
()=>{


    // navigatie

    document
    .getElementById(
        "playersBtn"
    )
    .onclick =
    ()=>{
        showScreen(
            "playersScreen"
        );
    };



    document
    .getElementById(
        "newSessionBtn"
    )
    .onclick =
    ()=>{
        renderAttendance();

        showScreen(
            "sessionScreen"
        );
    };



    document
    .getElementById(
        "settingsBtn"
    )
    .onclick =
    ()=>{
        showScreen(
            "settingsScreen"
        );
    };



    document
    .getElementById(
        "generateBtn"
    )
    .onclick =
    generateMatches;



    document
    .getElementById(
        "shareBtn"
    )
    .onclick =
    shareWhatsApp;



    // terugknoppen

    [
        "backHome1",
        "backHome2",
        "backHome3",
        "backHome4"
    ]
    .forEach(id=>{

        const button =
        document.getElementById(id);


        if(button){

            button.onclick =
            ()=>{
                showScreen(
                    "homeScreen"
                );
            };

        }

    });


});
// Service worker registreren voor app-functionaliteit

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
            .register("service-worker.js")
            .then(() => {

                console.log(
                    "DubbelMaker service worker actief"
                );

            })
            .catch(error => {

                console.log(
                    "Service worker fout:",
                    error
                );

            });

        }
    );

}