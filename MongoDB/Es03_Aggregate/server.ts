"use strict"

import * as mongodb from "mongodb";

const mongoClient = mongodb.MongoClient;

const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DBNAME = "5B";
const COLLECTION = "Orders";

// query 1
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);

        // in group i nomi di campi devono essere sempre preceduti da $
        // SE VIENE USATO COME **VALORE** (A DESTRA DEI ':') VIENE USATO IL $
        let request = collection.aggregate([
            { "$match": { "status": "A" } },
            // questo produce un recordset di due colonne (_id e totale)
            // dopo di qui c'è solo questo recordset, non quello completo
            { "$group": { "_id": "$cust_id", "totale": { "$sum": "$amount" } } },
            { "$sort": { "totale": -1 } }
        ]).toArray();

        request.then((data) => {
            console.log("QUERY 1: ", data);
        });

        request.catch((err) => {
            console.error("Errore esecuzione query: " + err.message);
        });

        request.finally(() => {
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 2
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);

        let request = collection.aggregate([
            { "$group": { "_id": "$cust_id", "avgAmount": { "$avg": "$amount" }, "avgTotal": { "$avg": { "$multiply": ["$qta", "$amount"] } } } }
        ]).toArray();

        request.then((data) => {
            console.log("QUERY 2: ", data);
        });

        request.catch((err) => {
            console.error("Errore esecuzione query: " + err.message);
        });

        request.finally(() => {
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});




