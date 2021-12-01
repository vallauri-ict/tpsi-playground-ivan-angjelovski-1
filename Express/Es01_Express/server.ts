import express from "express";
import * as http from "http";
import HEADERS from "./headers.json";

const PORT:number = 1337;
let app = express();

let server = http.createServer(app);

// questa collback va in esecuzione quando il server ascolta
server.listen(PORT, () => {
    console.log("Server in ascolto sulla porta " + PORT);
});






// ========================== elenco delle route (listeners) ==========================
app.use("*", function (req, res, next) {
    console.log(" -----> " + req.method + " : " + req.originalUrl);
    next();
});

app.get("*", function (req, res, next) {
    res.send("this is the response");
});
   