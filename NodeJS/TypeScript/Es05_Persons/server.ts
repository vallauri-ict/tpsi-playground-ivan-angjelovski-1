import * as http from "http";

let HEADERS = require("./headers.json");
let PERSONS = require("./persons.json");
let dispatcher = require("./dispatcher.ts");

const PORT:number = 1337;

let server = http.createServer((req:any, res:any) => {
    dispatcher.dispatch(req, res);
});

server.listen(PORT);
console.log("Server in ascolto sulla porta " + PORT);

// _________________________________________
// ******* registrazione dei servizi *******
// _________________________________________
dispatcher.addListener("GET", "/api/nazioni", (req, res) => {
    res.writeHead(200, HEADERS.json);

    let nazioni = [];
    for (const person of PERSONS.results) {
        if (!nazioni.includes(person.location.country)) {
            nazioni.push(person.location.country);
        }
    }
    nazioni.sort();
    res.end(JSON.stringify({
        "nazioni": nazioni
    }));
});