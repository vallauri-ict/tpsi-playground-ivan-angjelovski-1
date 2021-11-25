import * as mongodb from "mongodb";

const mongoClient = mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DBNAME = "5B";
const COLLECTION = "Facts";

const base64Chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
"K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
"Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
"m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"];

// ======= query =======
// query 2
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);

        let request = collection.aggregate([
            { "$match": { "$or": [ { "categories": { "$in": ["music"] } }, { "score": { "$gt": 620 } } ] } },
            { "$project": { "categories": 1, "score": 1 } }
        ]).toArray();

        request.then((data) => {
            console.log("Query 2: ", data);
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
        let collection = db.collection(COLLECTION);

        let _id = "";
        for (let i = 0; i < 22; i++) {
            _id += base64Chars[Math.floor(Math.random() * base64Chars.length)];
        }

        let new_fact: any = {
            "_id": _id,
            "value": `I'm inserting a new chuck norris's fact`,
            "created_at": new Date(),
            "updated_at": new Date(),
            "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
            "url": "https://api.chucknorris.io/jokes/" + _id,
            "score": 0
        };

        collection.insertOne(new_fact, function(err, data){
            if (!err)
                console.log("Query 3:", data)
            else
                console.log("Errore esecuzione query " + err.message);
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});












// // query 4
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);

        collection.deleteMany({ 
            "score": 0,
            "created_at": {
                "$gt": new Date("2021-11-15 00:00:00.000000")
            }}, (err, data) => {
            if (!err)
                console.log("Query 4:", data)
            else
                console.log("Errore esecuzione query " + err.message);
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
        let collection = db.collection(COLLECTION);

        let request = collection.aggregate([
            { "$unwind": "$categories" },
            { "$group": { "_id": "$categories", "media": { "$avg": "$score" } }},
            { "$project": { "_id": 1, "mediaScore": { "$round": [ "$media", 2 ] } } },
            { "$sort": { "mediaScore": -1, "_id": 1 } }
        ]).toArray();

        request.then((data) => {
            console.log("Query 5: ", data);
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


















// query 6a
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);

        let request = collection.aggregate([
            { "$unwind": "$categories" },
            { "$group": { "_id": "$categories" }},
        ]).toArray();

        request.then((data) => {
            console.log("QUERY 6a: ", data);
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

// query 6b
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);

        let request = collection.aggregate([
            { "$unwind": "$categories" },
            { "$group": { "_id": "$categories" }},
            { "$sort": { "_id": 1 } }
        ]).toArray();

        request.then((data) => {
            console.log("Query 6b: ", data);
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