# Es02_ReadFile
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" alt="NodeJS" style="height: 30px;"><img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Javascript-736400_960_720.png" alt="JavaScript" style="height: 30px;">

L'obiettivo del progetto è quello di realizzare un server che restituisca al client i servizi o le pagine richieste dal client utilizzando il modulo fs, FileSystem, per la lettura dei file ed il modulo mime per indicare il campo Content-Type per consentire la conversione corretta dei dati da parte del client.

**FileSystem**:
 - Permette di leggere l'intero contenuto dei file presenti nel file system del server tramite il metodo readFile().  
 - Parametri: 
   - Il percorso del file da leggere;
   - La funzione di callback, alla quale vengono iniettati due parametri:
     - Parametro di eventuale errore;
     - Parametro contentente i dati del file letto.
