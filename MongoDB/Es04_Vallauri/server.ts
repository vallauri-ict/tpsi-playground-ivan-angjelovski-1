import * as http from "http";

import HEADERS from "./headers.json";
import * as mongodb from "mongodb";

//  - es5 (commonjs) -> require per le export
//  - es6 -> import per le export, require() è reso disponibile grazie a types/node

import { Dispatcher } from "./dispatcher";
import { start } from "repl";

let dispatcher:Dispatcher = new Dispatcher();

const PORT:number = 1337;

let server = http.createServer((req:any, res:any) => {
    dispatcher.dispatch(req, res);
});

server.listen(PORT);
console.log("Server in ascolto sulla porta " + PORT);



// I PARAMETRI VENGONO PASSATI TUTTI COME STRINGHE QUINDI DEVO PARSIFICARLI QUANDO ARRIVANO QUI!!!!!!!!!!!!!



/*==========MONGO SETTINGS===============*/
const mongoClient = mongodb.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";
const DBNAME = "5B";



// ======= registrazione dei servizi =======
dispatcher.addListener("GET", "/api/getStudents", (req, res) => {
    mongoClient.connect(CONNECTIONSTRING, function (err, client) {
        if (!err) {
            let startingDate = new Date(req["GET"].startingDate);
            let finalDate = new Date(req["GET"].finalDate);

            let db = client.db(DBNAME);
            let collection = db.collection("Vallauri");
    
            let request = collection.find({"dob": {"$gte": startingDate, "$lte": finalDate}}).toArray();
    
            request.then((data) => {
                console.log("QUERY: ", data);
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

dispatcher.addListener("GET", "/api/servizio2", (req, res) => {
    res.writeHead(200, HEADERS.json);
    let nome = req["GET"].nome;
    res.end(JSON.stringify({
        "ris": nome
    }));
});