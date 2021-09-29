import * as http from "http";
import * as _url from "url";
import * as fs from "fs";
import * as mime from "mime";
import { inherits } from "util";

// non abbiamo il wrapper per questo piccolo json
// quindi lo dobbiamo richiamare tramite require
let HEADERS = require("./headers.json");

let paginaErrore:string;

class Dispatcher {
    prompt:string = ">>>";
    //  - quando si definisce un json si mette any o object
    //    se non si vuole definire la struttura direttamente
    //  - i listeners sono suddivisi in base al tipo di chiamata
    //  - ogni listener è costituito da un json del tipo
    //    {"risorsa": callback}
    listeners:any = {
        "GET": {

        },
        "POST": {

        },
        "DELETE": {
            
        },
        "PATCH": {
            
        },
        "PUT": {
            
        }
    }
    constructor() {
        init();
    }
    // ogni volta che dal main vorremo aggiungere un listener
    // richiamiamo questo metodo, che andrà a registrare questo metodo
    // nel vettore dei listeners
    addListener(metodo:string, risorsa:string, callback:any) {
        metodo = metodo.toUpperCase();
        // per accedere a property e metodi di una classe
        // uso this
        /*if (this.listeners[metodo]) {
            
        }*/
        // equivalenti ^ v
        if (metodo in this.listeners) {
            // se il metodo esiste...
            this.listeners[metodo][risorsa] = callback;
        } else {
            throw new Error ("metodo non valido");
        }
    }
    dispatch(req, res) {
        let metodo = req.method;
        let url = _url.parse(req.url, true);
        let risorsa = url.pathname;
        let parametri = url.query;

        console.log(`${this.prompt} ${metodo}:${risorsa} ${JSON.stringify(parametri)}`);

        if (risorsa.startsWith("/api/")) {
            if (risorsa in this.listeners[metodo]) {
                let callback = this.listeners[metodo][risorsa];
                // lancio in esecuzione la callback
                callback(req, res);
            } else {
                res.writeHead(404, HEADERS.text);
                res.end("Servizio non trovato");
            }
        } else {
            staticListener(req, res, risorsa);
        }
    }
}

let staticListener = (req, res, risorsa) => {
    if (risorsa == "/") {
        risorsa = "/index.html";
    }
    let filename = "./static" + risorsa;
    fs.readFile(filename, (err, data) => {
        if (!err) {
            let header = {
                "Content-Type": mime.getType(filename)
            };
            res.writeHead(200, header);
            res.end(data);
        } else {
            // err.code contiene un codice di errore di node
            console.log(`       ${err.code}: ${err.message}`);
            res.writeHead(404, HEADERS.html);
            res.end(paginaErrore);
        }
    });
}

let init = () => {
    fs.readFile("./static/error.html", (err, data) => {
        if (!err) {
            paginaErrore = data.toString();
        } else {
            paginaErrore = "<h1>Pagina non trovata</h1>";
        }
    });
}

// dal main si importa solamente l'istanza
// di Dispatcher perchè è l'unica che esportiamo
module.exports = new Dispatcher();