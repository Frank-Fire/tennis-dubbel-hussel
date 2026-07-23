// service-worker.js
// Offline ondersteuning voor DubbelMaker


const CACHE_NAME = "dubbelmaker-v1";


const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./players.js",
    "./matches.js",
    "./storage.js",
    "./manifest.json"

];



// Installeren

self.addEventListener(
"install",
event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(
                FILES_TO_CACHE
            );

        })

    );

});




// Laden vanuit cache

self.addEventListener(
"fetch",
event => {


    event.respondWith(

        caches.match(
            event.request
        )
        .then(response=>{


            return response ||
            fetch(event.request);


        })

    );


});




// Oude cache opruimen

self.addEventListener(
"activate",
event=>{


    event.waitUntil(

        caches.keys()
        .then(keys=>{

            return Promise.all(

                keys.map(key=>{

                    if(
                    key !== CACHE_NAME
                    ){

                        return caches.delete(
                            key
                        );

                    }

                })

            );

        })

    );

});