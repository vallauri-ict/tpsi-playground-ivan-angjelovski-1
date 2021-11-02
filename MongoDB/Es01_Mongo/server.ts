"use strict"

import * as http from "http";
import * as fs from "fs";
import HEADERS from "./headers.json";
import { Dispatcher } from "./dispatcher";
import * as mongodb from "mongodb";
import { ObjectID } from "bson";
const mongoClient = mongodb.MongoClient;

const dispatcher: Dispatcher = new Dispatcher();

const PORT: number = 1337;

let server = http.createServer((req: any, res: any) => {
    dispatcher.dispatch(req, res);
});

server.listen(PORT);
console.log("Server in ascolto sulla porta " + PORT);

// MODELLO INSERIMENTO DI UN NUOVO RECORD
mongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    // client è l'oggetto che punta al database
    if (!err) {
        let db = client.db("5B_Studenti");
        let collection = db.collection("Studenti");
        let student = {
            "studente": true,
            "nome": "Fabio",
            "cognome": "Cavallero",
            "indirizzo": "Informatica",
            "sezione": "B",
            "hobbies": [ "nuoto", "calcio" ],
            "residenza": {
                "citta": "Genola",
                "Provincia": "Cuneo",
                "CAP": "12045"
            },
            "_id": new ObjectID(23),
        };
        // uso la callback perchè se no mi esce fuori un errore che 
        // dice che non posso inserire mentre la connessione al db è chiusa
        collection.insertOne(student, (err, data) => {
            if (!err) {
                console.log(data);
                client.close();
            } else {
                console.error("Errore esecuzione query: " + err.message);
                client.close();
            }
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});


// MODELLO DI ACCESSO AL DATABASE
mongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    // client è l'oggetto che punta al database
    if (!err) {
        let db = client.db("5B_Studenti");
        let collection = db.collection("Studenti");
        collection.find().toArray((err, data) => {
            if (!err) {
                console.log(data);
                // bisogna chiudere la connessione
                client.close();
            } else {
                console.error("Errore esecuzione query: " + err.message);
                client.close();
            }
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

