import * as http from "http";

import HEADERS from "./headers.json";
import * as mongodb from "mongodb";

//  - es5 (commonjs) -> require per le export
//  - es6 -> import per le export, require() è reso disponibile grazie a types/node

import { Dispatcher } from "./dispatcher";

let dispatcher:Dispatcher = new Dispatcher();

const PORT:number = 1337;

let server = http.createServer((req:any, res:any) => {
    dispatcher.dispatch(req, res);
});

server.listen(PORT);
console.log("Server in ascolto sulla porta " + PORT);





/*==========MONGO SETTINGS===============*/
const mongoClient = mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DBNAME = "5B";
const COLLECTION = "Facts";




// ======= registrazione dei servizi =======
dispatcher.addListener("GET", "/api/facts", (req, res) => {
    mongoClient.connect(CONNECTIONSTRING, function (err, client) {
        if (!err) {
            let db = client.db(DBNAME);
            let collection = db.collection(COLLECTION);
    
            let request = collection.aggregate([
                { "$project": { "_id": 1, "value": 1 } }
            ]).toArray();
    
            request.then((data) => {
                console.log("QUERY 1a: ", data);

                res.writeHead(200, HEADERS.json);
                res.end(JSON.stringify(data));
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
});

dispatcher.addListener("POST", "/api/update", (req, res) => {
    mongoClient.connect(CONNECTIONSTRING, function (err, client) {
        if (!err) {
            let db = client.db(DBNAME);
            let collection = db.collection(COLLECTION);
    
            let _id = req["BODY"]._id;
            let value = req["BODY"].value;
            console.log(_id, value);

            let request = collection.updateOne({ "_id": _id }, { "$set": { "value": value, "updated_at": new Date().toString() } });
    
            request.then((data) => {
                console.log("QUERY 1b: ", data);

                res.writeHead(200, HEADERS.json);
                res.end(JSON.stringify(data));
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
});