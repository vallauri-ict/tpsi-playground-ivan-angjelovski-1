$(document).ready(function() {
    $("#btnInvia").on("click", function() {
        let request = inviaRichiesta("get", "/api/risorsa1", {"name":"Unico"});
        request.fail(errore);
        request.done(function(data) {
            console.log(data);
        });
    });

    $("#btnInvia2").on("click", function() {
        let request = inviaRichiesta("patch", "/api/risorsa2", {"name": "Unico", "vampires": 3});
        request.fail(errore);
        request.done(function(data) {
            if (data.modifiedCount > 0) {
                alert("Aggiornamento eseguito correttamente");                
            } else {
                alert("Nessuna corrispondenza trovata");
            }
        });
    });

    $("#btnInvia3").on("click", function() {
        let request = inviaRichiesta("get", "/api/risorsa3/m/brown");
        request.fail(errore);
        request.done(function(data) {
            console.log(data);
        });
    });
});
