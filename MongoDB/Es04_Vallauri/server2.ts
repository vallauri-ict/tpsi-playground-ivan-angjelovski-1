import * as mongodb from "mongodb";
const mongoClient = mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DBNAME = "5B";



// ======= query =======
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection("Vallauri");

        let request = collection.aggregate([
            { "$project": { "classe": 1, "avgItaliano": { "$avg": "$italiano" }, "avgMatematica": { "$avg": "$matematica" }, "avgInformatica": { "$avg": "$informatica" }, "avgSistemi": { "$avg": "$sistemi" } } },
            { "$project": { "classe": 1, "avgGenerale": { "$avg": [ "$avgItaliano", "$avgMatematica", "$avgInformatica", "$avgSistemi" ] } } },
            { "$group": { "_id": "$classe", "avgClasse": { "$avg": "$avgGenerale" } } }
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

mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection("Vallauri");

        let request = collection.aggregate([
            { "$match": { "genere": "f", "classe": "4A" } },
            { "$set": { "informatica": { "$concatArrays": ["$informatica", [7]] } } }
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

mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection("Vallauri");

        let request = collection.deleteMany({ "sistemi": { "$in": [3] } }, (err, data) => {
            if (!err) {
                console.log("QUERY 4: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection("Vallauri");

        let request = collection.aggregate([
            { "$group": { "_id": "$classe", "totaleAssenze": { "$sum": "$assenze" } } },
            { "$sort": { "totaleAssenze": -1 } }
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