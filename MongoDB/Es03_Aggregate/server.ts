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

// query 3
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection("Unicorns");

        let request = collection.aggregate([
            { "$match": { "gender": { "$exists": true } } },
            { "$group": { "_id": "$gender", "totale": { "$sum": 1 } } }
        ]).toArray();

        request.then((data) => {
            console.log("QUERY 3: ", data);
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

// query 4
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection("Unicorns");

        let request = collection.aggregate([
            { "$group": { "_id": { "gender": "$gender" }, "mediaVampiri": { "$avg": "$vampires" } } }
        ]).toArray();

        request.then((data) => {
            console.log("QUERY 4: ", data);
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


// query 5
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection("Unicorns");

        let request = collection.aggregate([
            { "$match": { "gender": { "$exists": true } } },
            { "$group": { "_id": { "gender": "$gender", "hair": "$hair" }, "nEsemplari": { "$sum": 1 } } },
            { "$sort": { "nEsemplari": -1, "_id": -1 } }
        ]).toArray();

        request.then((data) => {
            console.log("QUERY 5: ", data);
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


// query 6
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection("Unicorns");

        let request = collection.aggregate([
            { "$match": { "gender": { "$exists": true } } },
            { "$group": { "_id": { "gender": "$gender", "hair": "$hair" }, "nEsemplari": { "$sum": 1 } } },
            { "$sort": { "nEsemplari": -1, "_id": -1 } }
        ]).toArray();

        request.then((data) => {
            console.log("QUERY 6: ", data);
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















// query 7
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DBNAME);
        let collection = db.collection("Unicorns");
        let req = collection.aggregate([
            { "$group":{
                "_id":{},
                "media":{"$avg":"$vampires"}
            }},
            {"$project":{"_id":0,"ris":{"$round":"$media"}}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 7",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// query 8
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DBNAME);
        let collection = db.collection("Quizzes");
        let req = collection.aggregate([
            // le funzioni di aggregazione usate dentro project lavorano solo
            // sui campi dei singoli record (in orizzontale)
            { "$project":{
                "quizAvg":{"$avg":"$quizzes"},
                "labAvg":{"$avg":"$labs"},
                "examAvg":{"$avg":["$midterm","$final"]}
            }},
            {  "$project":{
                "quizAvg":{"$round":["$quizAvg",1]},
                "labAvg":{"$round":["$labAvg",1]},
                "examAvg":{"$round":["$examAvg",1]},
            }},
            { "$group":{
                "_id":{},
                "mediaQuiz":{"$avg":"$quizAvg"},
                "mediaLab":{"$avg":"$labAvg"},
                "mediaExam":{"$avg":"$examAvg"},
            }},
            {  "$project":{
                "mediaQuiz":{"$round":["$mediaQuiz",2]},
                "mediaLab":{"$round":["$mediaLab",2]},
                "mediaExam":{"$round":["$mediaExam",2]},
            }}
        ]).toArray();
        req.then(function(data){
            console.log("Query 8",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// query 9
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DBNAME);
        let collection = db.collection("Students");
        let regex = new RegExp("F","i"); // sia f che F
        let req = collection.aggregate([
            {"$match":{"genere":{"$regex":regex}}},
            {"$project":{"nome":1,"genere":1,"media":{"$avg":"$voti"}}},
            {"$sort":{"media":-1}},
            {"$skip":1}, // salto il primo
            {"$limit":1} // prendo il primo (che equivale al secondo)
        ]).toArray();
        req.then(function(data){
            console.log("Query 9",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// query 10
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DBNAME);
        let collection = db.collection("Orders");
        let req = collection.aggregate([
            {"$project":{"status":1,"nDettagli":1}},
            {"$unwind":"$nDettagli"},
            {"$group":{"_id":"$status","sommaDettagli":{"$sum":"$nDettagli"}}}
        ]).toArray();
        req.then(function(data){
            console.log("Query 10",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});

// query 11
mongoClient.connect(CONNECTIONSTRING,function(err,client){
    if(!err){
        let db = client.db(DBNAME);
        let collection = db.collection("Students");
        let req = collection.find(
            {"$expr":{"$gte":[{"$year":"$nato"},2000]}}
        ).toArray();
        req.then(function(data){
            console.log("Query 11",data);
        });
        req.catch(function(err){
            console.log("Errore esecuzione query " + err.message);
        })
        req.finally(function(){
            client.close();
        })
    }
    else{
        console.log("Errore nella connessione al DB " + err.message);
    }
});