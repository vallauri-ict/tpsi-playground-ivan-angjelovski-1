$(document).ready(function() {
    let lstCategorie = $("#lstCategorie");
    let mainWrapper = $("#mainWrapper");
    let btnInvia = $("#btnInvia");
    let btnAdd = $("#btnAdd");
    let newFact = $("#newFact");

    let request = inviaRichiesta("GET", "/api/categories");
    request.fail(errore);
    request.done(function(data) {
        console.log(data);
        for (const category of data.categories) {
            lstCategorie.append($("<option>").val(category).text(category));
        }

        filterFacts();
    });

    lstCategorie.on("change", filterFacts);

    btnInvia.on("click", function() {
        let ids = [];

        mainWrapper.children("input").each(function(index) {
            if ($(this).is(":checked")) {
                ids.push($(this).val());
            }
        });

        let request = inviaRichiesta("POST", "/api/rate", { "ids": ids });
        request.fail(errore);
        request.done(function(data) {
            console.log(data);
        });
    });

    btnAdd.on("click", function() {
        let request = inviaRichiesta("POST", "/api/add", { 
            "category": lstCategorie.val(),
            "value": newFact.val()
        });
        request.fail(errore);
        request.done(function(data) {
            if(data == "OK") {
                filterFacts();
            }
        });
    });

    function filterFacts() {
        mainWrapper.children("input").remove();
        mainWrapper.children("span").remove();
        mainWrapper.children("br").remove();

        request = inviaRichiesta("GET", "/api/facts", { "category": lstCategorie.val() });
        request.fail(errore);
        request.done(function(data) {
            console.log(data);

            data.filteredFacts.sort(function(a, b) {
                let score1 = a.score;
                let score2 = b.score;
                if (score1 < score2)
                return -1;
                else if (score1 > score2)
                return 1;
                else return 0;
            });

            for (const filteredFact of data.filteredFacts) {
                mainWrapper.children("h2").after(`<input type="checkbox" value="${filteredFact.id}"> <span> ${filteredFact.value} </span> <br>`);
            }
        });
    }
});