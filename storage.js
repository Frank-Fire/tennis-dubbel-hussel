// storage.js
// Opslag voor DubbelMaker

const Storage = {

    save(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    },


    load(key, defaultValue = null) {

        const data = localStorage.getItem(key);

        if(data === null){
            return defaultValue;
        }

        return JSON.parse(data);

    },


    remove(key){

        localStorage.removeItem(key);

    },


    clearAll(){

        localStorage.clear();

    }

};


// standaard instellingen

if(Storage.load("players") === null){

    Storage.save("players", [
        "Roy",
        "Robert",
        "Mark",
        "Frank"
    ]);

}


if(Storage.load("settings") === null){

    Storage.save("settings", {

        courts:1

    });

}