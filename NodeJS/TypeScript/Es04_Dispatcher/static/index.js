$(document).ready(function() {
    $("#btnInvia").on("click", function() {
<<<<<<< HEAD
        let request = inviaRichiesta("post", "/api/servizio1", {"nome":"pippo"});
=======
        let request = inviaRichiesta("get", "/api/servizio1", {"nome":"pippo"});
>>>>>>> ff83700c25cd62334609fde367533e9e36db0c18
        request.fail(errore);
        request.done(function(data) {
            alert(JSON.stringify(data));
        });
    });

    $("#btnInvia2").on("click", function() {
        let request = inviaRichiesta("get", "/api/servizio2", {"nome":"pippo"});
        request.fail(errore);
        request.done(function(data) {
            alert(JSON.stringify(data));
        });
    });
});
