"use strict"
$(document).ready(function() {
    let _lstNazioni = $("#lstNazioni");
    let _tabStudenti = $("#tabStudenti");
    let _divDettagli = $("#divDettagli");

    _divDettagli.hide()

    let request = inviaRichiesta("GET", "/api/nazioni");
    request.fail(errore);
    request.done((data) => {
        console.log(data);
    });
})