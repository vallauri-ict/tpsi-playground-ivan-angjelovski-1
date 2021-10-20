"use strict"

import * as http from "http";
import * as fs from "fs";
import HEADERS from "./headers.json";
import { Dispatcher } from "./dispatcher";
import FACTS from "./facts.json";

let dispatcher:Dispatcher = new Dispatcher();

const PORT:number = 1337;

let server = http.createServer((req:any, res:any) => {
    dispatcher.dispatch(req, res);
});

server.listen(PORT);
console.log("Server in ascolto sulla porta " + PORT);



// const categories = []
const categories = ["career","money","explicit","history","celebrity","dev","fashion","food","movie","music","political","religion","science","sport","animal","travel"]

const icon_url = "https://assets.chucknorris.host/img/avatar/chuck-norris.png";
const api_url = "https://api.chucknorris.io"
const base64Chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"]

// ======= registrazione dei servizi =======
dispatcher.addListener("GET", "/api/categories", (req, res) => {
    // ___statico___
    // res.writeHead(200, HEADERS.json);
    // res.end(JSON.stringify({
    //     "categories": categories,
    // }));

    // ___dinamico___
    let categories = [];
    for (const fact of FACTS.facts) {
        for (const category of fact.categories) {
            if (!categories.includes(category)) {
                categories.push(category);
            }
        }
    }
    res.writeHead(200, HEADERS.json);
    res.end(JSON.stringify({
        "categories": categories,
    }));
});

dispatcher.addListener("GET", "/api/facts", (req, res) => {
    let category = req["GET"].category;
    let filteredFacts = [];
    for (const fact of FACTS.facts) {
        if (fact.categories.includes(category)) {
            filteredFacts.push(fact);
        }
    }

    res.writeHead(200, HEADERS.json);
    res.end(JSON.stringify({
        "filteredFacts": filteredFacts,
    }));
});

dispatcher.addListener("POST", "/api/rate", (req, res) => {
    let ids = req["BODY"].ids;

    for (const fact of FACTS.facts) {
        for (const id of ids) {
            if (fact.id == id) {
                fact.score++;
            }
        }
    }

    fs.writeFile("./facts.json", JSON.stringify(FACTS), (err) => {
        if (err) {
            res.writeHead(500, HEADERS.text);
            res.end(JSON.stringify("Salvataggio non riuscito, problema interno al server."));
        } else {
            res.writeHead(200, HEADERS.text);
            res.end(JSON.stringify("OK"));
        }
    });
});

dispatcher.addListener("POST", "/api/add", (req, res) => {
    let category = req["BODY"].category;
    let value = req["BODY"].value;

    let id;
    let alreadyExists;
    do {
        alreadyExists = false;

        id = "";
        for (let i = 0; i < 22; i++) {
            id += base64Chars[generaNumero(0, base64Chars.length - 1)];
        }

        for (const fact of FACTS.facts) {
            if (fact.id == id) {
                alreadyExists = true;
            }
        }
    } while (alreadyExists);
    

    let newFact = {
        "categories": [
            category
         ],
         "created_at": new Date().toString(),
         "icon_url": icon_url,
         "id": id,
         "updated_at": new Date().toString(),
         "url": api_url,
         "value": value,
         "score": 0
    }

    FACTS.facts.push(newFact);

    fs.writeFile("./facts.json", JSON.stringify(FACTS), (err) => {
        if (err) {
            res.writeHead(500, HEADERS.text);
            res.end(JSON.stringify("Salvataggio non riuscito, problema interno al server."));
        } else {
            res.writeHead(200, HEADERS.text);
            res.end(JSON.stringify("OK"));
        }
    });
});

function generaNumero(a, b){
	return Math.floor((b - a + 1) * Math.random()) + a;
}