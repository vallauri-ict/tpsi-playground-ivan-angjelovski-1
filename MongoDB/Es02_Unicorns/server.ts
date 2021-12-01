"use strict"

import * as http from "http";
import * as fs from "fs";
import HEADERS from "./headers.json";
import { Dispatcher } from "./dispatcher";
import * as mongodb from "mongodb";
import { ObjectID } from "bson";
const mongoClient = mongodb.MongoClient;

const dispatcher: Dispatcher = new Dispatcher();

// const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";

// accesso su atlas
const CONNECTIONSTRING = "mongodb+srv://admin:admin@cluster0.jit30.mongodb.net/5B?retryWrites=true&w=majority";
const DBNAME = "5B";
const COLLECTION = "Unicorns";

// query 1
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.find({ "weight": { "$lte": 800, "$gte": 700 } }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 1: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 1 b
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);

        let request = collection.find({ "weight": { "$lte": 800, "$gte": 700 } }).toArray();

        request.then((data) => {
            console.log("QUERY 1 B: ", data);
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
        // se volessimo cercare l'unicorno che vuole esattamente olo l'uva
        // (o anche altra roba che aggiungiamo nel vettore) usiamo "loves": ["grape"]

        // se volessimo cercare l'unicorno che vuole o uva o anguria 
        // (ed eventualmente altra roba) usiamo "loves": {"$in": ["grape", "watermelon"]}

        // ATTENZIONE PER TROVARE UN UNICORNO CHE AMA SOLO GRAPE E WATERMELON
        // NON CI SONO DEGLI OPERATORI PRECISI !!!
        collection.find({ "$and": [{ "gender": "m" }, { "loves": "grape" }, { "vampires": { "$gt": 60 } }] }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 2: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
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
        collection.find({ "$or": [{ "gender": "f" }, { "weight": { "$lte": 700 } }] }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 3: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
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
        let collection = db.collection(COLLECTION);
        // ad in gli passo un vettore e i valori che gli passo controlla
        // che siano presenti all'interno del campo indicato, in questo caso loves
        collection.find({ "$and": [{ "loves": { "$in": ["apple", "grape"] } }, { "vampires": { "$gte": 60 } }] }).toArray((err, data) => {
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

// query 5
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        // all controlla che tutti i valori che passo devono essere
        // contenuti all'interno di loves

        // a differenza del vettore statico, i valori qui non devono
        // essere nello stesso ordine
        collection.find({ "loves": { "$all": ["watermelon", "grape"] } }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 5: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 6 A
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.find({ "$or": [{ "hair": "brown" }, { "hair": "grey" }] }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 6 A: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 6 B
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.find({ "hair": { "$in": ["grey", "brown"] } }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 6 B: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 7
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.find({ "$and": [{ "vaccinated": { "$exists": true } }, { "vaccinated": true }] }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 7: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 9
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        let regex = new RegExp("^A", "i");
        collection.find({ "$and": [{ "name": { "$regex": regex } }, { "gender": "f" }] }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 9: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 10
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.find({ "_id": new mongodb.ObjectId("61823ae5e294691b96e1ee96") }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 10: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 11 A
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.find({ "gender": "m" }).project({ "name": 1, "vampires": 1, "_id": 0 }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 11 A: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 11 B
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        // il secondo parametro del sort è chiamato in causa quando si trova
        // un parimerito nel primo
        collection.find({ "gender": "m" }).project({ "name": 1, "vampires": 1, "_id": 0 }).sort({ "vampires": -1, "name": 1 }).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 11 B (" + data.length + " Record): ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 11 C
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        // il secondo parametro del sort è chiamato in causa quando si trova
        // un parimerito nel primo
        collection.find({ "gender": "m" }).project({ "name": 1, "vampires": 1, "_id": 0 }).sort({ "vampires": -1, "name": 1 }).skip(1).limit(3).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 11 C (" + data.length + " Record): ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 12
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.find({ "weight": { "$gt": 500 } }).count((err, data) => {
            if (!err) {
                console.log("QUERY 12: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 13
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.findOne({ "name": "Aurora" }, { "projection": { "hair": 1, "weight": 1 } }, (err, data) => {
            if (!err) {
                console.log("QUERY 13: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 14
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.distinct("loves", { "gender": "f" }, (err, data) => {
            if (!err) {
                console.log("QUERY 14: ", data);
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
            client.close();
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});

// query 15
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.insertOne({ "name": "pippo", "gender": "m", "loves": ["apple", "lemon"] }, (err, data) => {
            if (!err) {
                console.log("QUERY 15: ", data);
                collection.deleteMany({ "name": "pippo" }, (err, data) => {
                    if (!err) {
                        console.log("QUERY 15 B: ", data);
                    } else {
                        console.error("Errore esecuzione query: " + err.message);
                    }
                    client.close();
                });
            } else {
                console.error("Errore esecuzione query: " + err.message);
            }
        });
    } else {
        console.error("Errore nella connessione al database: " + err.message);
    }
});













// ====================================================
// query 16
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.updateOne(
            { name: "pilot" },
            { $inc: { vampires: 1 } }, // se vampires non esiste crea lui il campo
            { "upsert": true }, // se record pluto non esiste viene creato
            (err, data) => {
                if (!err) {
                    console.log("QUERY 16: ", data);
                } else {
                    console.log("Errore esecuzione query " + err.message);
                }
                client.close();
            }
        );
    } else {
        console.log("Errore connessione al db");
    }
});

// query 17
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.updateOne(
            { "name": "Aurora" },
            { "$addToSet": { "loves": "carrot" }, "$inc": { "weight": 10 } },
            (err, data) => {
                if (!err) {
                    console.log("QUERY 17: ", data);
                } else {
                    console.log("Errore esecuzione query " + err.message);
                }
                client.close();
            }
        );
    } else {
        console.log("Errore connessione al db");
    }
});

// query 18
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.updateOne({ name: "Minnie" }, { $inc: { vampires: 1 } }, { upsert: true },
            (err, data) => {
                if (!err) {
                    console.log("QUERY 18: ", data);
                } else {
                    console.log("Errore esecuzione query " + err.message);
                }
                client.close();
            }
        );
    } else {
        console.log("Errore connessione al db");
    }
});

// query 19
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.updateMany({ vaccinated: { $exists: false } }, { $set: { vaccianted: true } },
            (err, data) => {
                if (!err) {
                    console.log("QUERY 19: ", data);
                } else {
                    console.log("Errore esecuzione query " + err.message);
                }
                client.close();
            }
        );
    } else {
        console.log("Errore connessione al db");
    }
});

// query 20
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        collection.deleteMany({ loves: { $all: ["grape", "carrot"] } },
            (err, data) => {
                if (!err) {
                    console.log("QUERY 20: ", data);
                } else {
                    console.log("Errore esecuzione query " + err.message);
                }
                client.close();
            }
        );
    } else {
        console.log("Errore connessione al db");
    }
});

// query 21
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        // EQUIVALENTE, MA COL FINDONE NON VA .project
        // collection.find({ "gender": "f" }).sort({ "vampires": - 1 }).limit(1).project({"name": 1, "vampires": 1, "_id": 0}).toArray((err, data) => {
        collection.find({ "gender": "f" } , {"projection": {"name": 1, "vampires": 1, "_id": 0}}).sort({ "vampires": - 1 }).limit(1).toArray((err, data) => {
            if (!err) {
                console.log("QUERY 21: ", data);
            } else {
                console.log("Errore esecuzione query " + err.message);
            }
            client.close();
        });
    } else {
        console.log("Errore connessione al db");
    }
});

// query 22
mongoClient.connect(CONNECTIONSTRING, function (err, client) {
    if (!err) {
        let db = client.db(DBNAME);
        let collection = db.collection(COLLECTION);
        // replaceone cancella TUTTI i campi del record trovato e li sostituisce con quelli
        // che gli passiamo. Attenzione _id è l'unico campo che non viene cancellato
        // il campo _id non si può nemmeno cambiare, perchè è immutabile
        collection.replaceOne({"name": "Pluto"}, {"name": "Pluto", "residenza": "Fossano", "loves": ["apple", "grape"]}, (err, data) => {
            if (!err) {
                console.log("QUERY 22: ", data);
            } else {
                console.log("Errore esecuzione query " + err.message);
            }
            client.close();
        });
    } else {
        console.log("Errore connessione al db");
    }
});