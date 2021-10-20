# Es05_Persons
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" alt="NodeJS" style="height: 30px;"><img src="https://devexp.io/wp-content/uploads/2019/05/ts.png" alt="TypeScript" style="height: 30px;">

L'obiettivo del progetto è quello di creare una applicazione Client - Server che esponga e gestisca un elenco di dati di persone generati casualmente (https://randomuser.me/).

All'avvio:
 - Il **server** legge e mantiene in memoria il contenuto del file persons.ts (tramite import) ___ il server costruisce il vettore sulla base del campo **location.country** facendo attenzione a ripetere ogni nazione una sola volta ed ordinare le nazioni in ordine alfabetico;
 - Il **client** invia al server una richiesta **/api/nazioni** e visualizza una lista con tutte le nazioni ricevute in risposta;

Scelta una nazione:
 - Il client invia al server una richiesta /api/persone relativa alle persone appartenenti alla nazione selezionata. Il server, in corrispondenza della richiesta, invia un vettore 
enumerativo di oggetti aventi i seguenti campi: **name = title + " " + first + " " + lastcity, state, cell** dove name è univoco all’interno del database;
 - Il client visualizza tutti i campi ricevuti all’interno di una apposita tabella.

Click sul pulsante dettagli:
 - Il client richiede al server l’elenco di tutti i dettagli relativi alla persona indicata (sulla base di name) e visualizza nella sezione Dettagli (inizialmente nascosta) tutti i **dettagli**.

Click sul pulsante elimina:
 - Il client richiede al server l’eliminazione della persona indicata (sulla base di name). In corrispondenza di un eventuale OK esegue un refresh della pagina.