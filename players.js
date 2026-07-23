// players.js
// Beheer van spelers

let players = Storage.load("players", []);


function renderPlayers(){

    const list = document.getElementById("playersList");

    if(!list) return;

    list.innerHTML = "";


    players.forEach((player, index)=>{


        const card = document.createElement("div");

        card.className = "playerCard";


        card.innerHTML = `

            <span>${player}</span>

            <div class="playerButtons">

                <button 
                class="smallButton deleteButton"
                onclick="deletePlayer(${index})">
                    🗑️
                </button>

            </div>

        `;


        list.appendChild(card);


    });

}



function addPlayer(){

    const input = document.getElementById("playerName");

    const name = input.value.trim();


    if(name === ""){

        alert("Vul eerst een naam in");

        return;

    }


    players.push(name);


    Storage.save(
        "players",
        players
    );


    input.value="";


    renderPlayers();

}



function deletePlayer(index){


    const confirmDelete =
    confirm(
        "Speler verwijderen?"
    );


    if(confirmDelete){


        players.splice(index,1);


        Storage.save(
            "players",
            players
        );


        renderPlayers();

    }

}



document.addEventListener(
"DOMContentLoaded",
()=>{


    const addButton =
    document.getElementById(
        "addPlayerBtn"
    );


    if(addButton){

        addButton.onclick =
        addPlayer;

    }


    renderPlayers();


});