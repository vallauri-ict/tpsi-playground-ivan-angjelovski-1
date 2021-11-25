$(document).ready(function() {
    let lstFacts = $("#lstFacts");
    let txtFact = $("#txtFact");
    let btnSave = $("#btnSave");

    let request = inviaRichiesta("GET", "/api/facts");
    request.done((facts) => {
        console.log(facts);
        for (const fact of facts) {
            lstFacts.append($("<option>").text(fact._id).val(fact.value));
        }
        lstFacts.prop("selectedIndex", -1);
    });
    request.fail(errore);


    lstFacts.on("change", () => {
        txtFact.val(lstFacts.val());
        // x ottenere id
        // $( "#myselect option:selected" ).text();
    });

    btnSave.on("click", () => {
        if (lstFacts.prop("selectedIndex") != -1) {
            request = inviaRichiesta("POST", "/api/update", {
                "_id": $("#lstFacts option:selected").text(),
                "value": txtFact.val(),
            });
            request.done((data)=>{
                console.log(data);
                if (data.acknowledged) {
                    alert("Modifica avvenuta correttamente");
                }
            })
            request.fail(errore);
        } else {
            alert("Seleziona un id dalla lista")
        }
    });
});