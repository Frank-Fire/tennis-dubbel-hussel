// matches.js
// Teamgenerator voor DubbelMaker


function shuffle(array){

    let currentIndex = array.length;
    
    while(currentIndex !== 0){

        let randomIndex =
        Math.floor(Math.random() * currentIndex);

        currentIndex--;

        [
            array[currentIndex],
            array[randomIndex]
        ] =
        [
            array[randomIndex],
            array[currentIndex]
        ];

    }

    return array;

}



function createTeams(selectedPlayers, courts){


    let players =
    [...selectedPlayers];


    shuffle(players);


    let matches = [];


    let index = 0;


    for(let c = 1; c <= courts; c++){


        if(index + 3 < players.length){


            matches.push({

                court:c,

                team1:
                players[index] +
                " & " +
                players[index+1],


                team2:
                players[index+2] +
                " & " +
                players[index+3]

            });


            index += 4;


        }

    }


    return matches;

}




function showMatches(matches){


    const container =
    document.getElementById(
        "matchesContainer"
    );


    container.innerHTML="";


    matches.forEach(match=>{


        const card =
        document.createElement(
            "div"
        );


        card.className =
        "matchCard";


        card.innerHTML = `

        🎾 Baan ${match.court}

        <br><br>

        ${match.team1}

        <br>

        🆚

        <br>

        ${match.team2}

        `;


        container.appendChild(card);


    });


}