"use strict"

import * as http from "http";
import * as fs from "fs";
import HEADERS from "./headers.json";
import { Dispatcher } from "./dispatcher";
import * as mongodb from "mongodb";
import { ObjectID } from "bson";
const mongoClient = mongodb.MongoClient;

const dispatcher: Dispatcher = new Dispatcher();

const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";

// MODELLO INSERIMENTO DI UN NUOVO RECORD
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
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
        };
        // uso la callback perchè se no mi esce fuori un errore che 
        // dice che non posso inserire mentre la connessione al db è chiusa
        collection.insertOne(student, (err, data) => {
            if (!err) {
                console.log("INSERT", data);
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


// MODELLO AGGIORNAMENTO DI UN RECORD
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    // client è l'oggetto che punta al database
    if (!err) {
        let db = client.db("5B_Studenti");
        let collection = db.collection("Studenti");
        // updateOne(filtro, azione)
        collection.updateOne({ "Nome": "Mario" }, { "$set": { "Residenza": "Fossano" } }, (err, data) => {
            if (!err) {
                console.log("UPDATE: ", data);
            } else {
                console.error("Errore nella connessione al database: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// MODELLO DI CANCELLAZIONE DI DATI NEL DATABASE
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    // client è l'oggetto che punta al database
    if (!err) {
        let db = client.db("5B_Studenti");
        let collection = db.collection("Studenti");
        collection.deleteMany({"Residenza": "Fossano"}, (err, data) => {
            if (!err) {
                console.log("DELETE", data);
                // bisogna chiudere la connessione
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});


// MODELLO DI ACCESSO AL DATABASE
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    // client è l'oggetto che punta al database
    if (!err) {
        let db = client.db("5B_Studenti");
        let collection = db.collection("Studenti");
        collection.find().toArray((err, data) => {
            if (!err) {
                console.log("FIND", data);
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

