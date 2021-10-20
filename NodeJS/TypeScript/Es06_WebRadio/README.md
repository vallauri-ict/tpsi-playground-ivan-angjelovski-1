# Es06_WebRadio
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" alt="NodeJS" style="height: 30px;"><img src="https://devexp.io/wp-content/uploads/2019/05/ts.png" alt="TypeScript" style="height: 30px;">

L'obiettivo del progetto è quello di realizzare un'applicazione relativa alle web radio italiane basata sui 2 seguenti file:
 - **states.json** contenente sotto forma di json array l’elenco delle 20 regioni italiane e il numero di stazioni presenti in ognuna di esse;
 - **radios.json** contenente sotto forma di json array l’elenco delle principali 120 web radio italiane.

1) Realizzare una utility lato server scritta in node.js che:
 - Legga il file states.json;
 - Sulla base dl contenuto del file radios.json provveda ad aggiornare il campo **stationcount** di states.json conteggiando il numero di stazioni esistenti per ciascuna regione;
 - Provveda a salvare su disco il file states.json.
NB: Per utilizzare la utility tramite nodemon, evitando loop (per conto del salvataggio del file alla fine della scrittura), eseguire il seguente comando:
```bash
nodemon --ignore 'states.js'
```

2) Realizzare un web server Node che, in corrispondenza della richiesta **/elenco** invii al client l’elenco delle regioni italiane andando a leggere il file aggiornato dalla utility precedente. Il client invia la richiesta /elenco all’avvio, in corrispondenza del ricevimento della pagina html.
Ricevuti i dati, li visualizza all’interno di un apposito ListBox avente come prima voce la voce **tutti**.

Scelta di una voce dal listbox:
 - Il client invia al server una richiesta POST **/radios** passando come parametro il nome della regione selezionata. Il server risponde con un elenco contenente SOLTANTO le 
web radio di quella regione, che verranno visualizzate all’interno di una apposita tabella, in cui:
   - All’inizio viene visualizzato il logo della web radio indicato all’interno del campo favicon con una larghezza fissa pari a 40px;
   - In coda viene aggiunto un pulsante di LIKE che consente all’utente di esprimere un apprezzamento per quella web radio.

Click sul pulsante like:
Il client invia al server una richiesta **POST /like** contenente l’ID della web radio scelta. In corrispondenza della richiesta il server legge il file delle web radios, 
incrementa di 1 il campo **votes**, risalva il file e restituisce al client l’elenco completo aggiornato delle web radio (oppure anche il solo valore aggiornato del campo votes della web radio scelta).