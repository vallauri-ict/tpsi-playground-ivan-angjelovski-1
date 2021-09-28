import * as http from "http";
import * as url from "url";
import * as fs from "fs";
import * as mime from "mime";

// non abbiamo il wrapper per questo piccolo json
// quindi lo dobbiamo richiamare tramite require
let HEADERS = require("/headers.json");

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
}