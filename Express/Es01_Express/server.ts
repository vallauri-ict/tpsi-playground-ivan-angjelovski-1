import express from "express";
import * as http from "http";
import * as fs from "fs";
import * as body_parser from "body-parser";
import HEADERS from "./headers.json";

const PORT:number = 1337;
let app = express();

let server = http.createServer(app);

// questa collback va in esecuzione quando il server ascolta
server.listen(PORT, () => {
    console.log("Server in ascolto sulla porta " + PORT);
    init();
});

let pagina_errore = "";
let init = () => {
    fs.readFile("./static/error.html", (err, data) => {
        if(!err) {
            // data è un buffer, occorre serializzarlo
            pagina_errore = data.toString();
        } else {
            pagina_errore = "<h2>Risorsa non trovata</h2>";
        };
    });
};






/* ******************************************************************
                elenco delle route di tipo middleware
   ****************************************************************** */
// 1 - log
app.use("/", (req, res, next) => {
    console.log(" -----> " + req.method + " : " + req.originalUrl);
    next();
});

// 2 - static-route
// .static va a cercare la risorsa all'interno
// della cartella static
app.use("/", express.static("./static"));

// 3 - route di lettura dei parametri post
app.use("/", body_parser.json());
// extend fa in modo che vengano intercettati
// eventuali json all'interno del body
app.use("/", body_parser.urlencoded({ "extended": true }));

// 4 - log dei parametri
app.use("/", (req, res, next) => {
    if(Object.keys(req.query).length) {
        console.log("parametri GET: ", req.query);
    }

    if(Object.keys(req.body).length) {
        console.log("parametri BODY: ", req.body);
    };
    next();
});





   



/* ******************************************************************
               elenco delle route di risposta al client
   ****************************************************************** */
app.get("/api/risorsa1", function (req, res, next) {
    let nome = req.query.nome;
    res.send({"nome": nome});
});

app.post("/api/risorsa1", function (req, res, next) {
    let nome = req.body.nome;
    res.send({"nome": nome});
});








/* ******************************************************************
   default route (risorsa non trovata) e route di gestione degli errori
   ****************************************************************** */
app.use("/", (req, res, next) => {
    res.status(404);
    if(req.originalUrl.startsWith("/api/")) {
        res.send("Risorsa non trovato");
    } else {
        res.send(pagina_errore);
    };
});