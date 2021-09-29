import * as http from "http";

let HEADER = require("./headers.json");

// due modelli di import export:
//  - es5 (commonjs) -> require per le export
//  - es6 -> import per le export, require() è reso disponibile grazie a types/node

let dispatcher = require("./dispatcher.ts");

const PORT:number = 1337;

let server = http.createServer((req:any, res:any) => {
    dispatcher.dispatch(req, res);
});

server.listen(PORT);

console.log("Server in ascolto sulla porta " + PORT);

// ======= registrazione dei servizi =======
dispatcher.addListener("POST", "/api/servizio1", (req, res) => {
    res.writeHead(200, HEADER.json);
    res.end(JSON.stringify({
        "ris": "ok"
    }));
});