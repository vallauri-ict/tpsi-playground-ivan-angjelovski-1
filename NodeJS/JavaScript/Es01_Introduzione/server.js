let _http = require("http");
let _url = require("url");
let _colors = require("colors");

let HEADERS = require("./headers.json");

let port = 1337;

// req contiene tutti i dati della richiesta e res tutti i dati della risposta che definirò
let server=_http.createServer(function (req, res) {
    // funzione che verrà eseguita tutte le volte che arriva una richiesta da un client

    // req è la richiesta del client
    // il server, sull'oggetto res, va a scrivere la risposta che restituisce al client
    
    /*
        --- PRIMA PROVA ---
    // scrittura intestazione risposta
    res.writeHead(200, HEADERS.text);

    // corpo della risposta -> creazione
    res.write("richiesta eseguita correttamente");

    // invio risposta
    res.end();

    console.log("richiesta eseguita");
    */

    // parsing della url ricevuta   parsificata url e parsificati dati (true, per default non vengono parsificati)
    // lettura di metodo, risorsa e parametri
    let metodo = req.method;
    let url = _url.parse(req.url, true);
    let risorsa = url.pathname;
    let parametri = url.query;

    let dominio = req.headers.host;

    res.writeHead(200, HEADERS.html);
    res.write("<h1>Informazioni relative alla richiesta ricevuta</h1>");
    res.write("<br>");
    res.write(`<p><b>Risorsa richiesta: </b>${risorsa}</p>`);
    res.write(`<p><b>Metodo: </b>${metodo}</p>`);
    res.write(`<p><b>Parametri: </b>${JSON.stringify(parametri)}</p>`);
    res.write(`<p><b>Dominio richiesto: </b>${dominio}</p>`);
    res.write("<p>Grazie per la richiesta</p>");
    res.end();

    console.log(`richiesta ricevuta: ${req.url.yellow}`);
});

// se non si specifica l'indirizzo IP di ascolto il server viene avviato su tutte le interfacce e sul loopback
// se specifico IP, il server verrà definito sull'interfaccia definita
server.listen(port);
console.log("server in ascolto sulla porta " + port);