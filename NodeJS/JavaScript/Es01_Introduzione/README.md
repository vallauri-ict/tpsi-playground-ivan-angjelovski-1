# Es01_Introduzione
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" alt="NodeJS" style="height: 30px;"><img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Javascript-736400_960_720.png" alt="JavaScript" style="height: 30px;">

L'obiettivo del progetto è quello di realizzare un server che, alla richiesta dal client, al client una pagina HTML contenente le tre informazioni ricevute in fase di richiesta:
 - Risorsa richiesta;
 - Dominio del web server;
 - Metodo di chiamata;
 - Parametri della chiamata.

Il progetto NodeJS si basa sul metodo, della libreria nativa **http**, **createServer()** che crea e restituisce un server HTTP. L'unico parametro della funzione è una funzione di callback gestita dal programmatore, che verrà eseguita ogni volta che il server riceverà una richiesta. In corrispondenza di ogni richiesta, alla funzione di callback verranno automaticamente iniettati due parametri:
 - **Request**, un oggetto di tipo IncomingMessage all'interno del quale sono contenute tutte le informazioni relative alla richiesta del client;
 - **Response**, un oggetto di tipo ServerResponse all'interno del quale il server scriverà la risposta da inviare al client;  

NB: Per avviare il server occorre aprire un terminale sulla directory contenente il server ed eseguire il comando:
```bash
node [server].js
```
Per provare effettivamente il funzionamento del server occorre aprire un browser e digitare localhost:[porta], oppure, se non lo si è impostato in loopback, digitare l'indirizzo IP della macchina host e :[porta].
