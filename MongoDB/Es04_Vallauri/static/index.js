$(document).ready(function() {
    $("#btnStudents").on("click", () => {
        let finalDate = $("#finalDate").val();
        let startingDate = $("#startingDate").val();

        let request = inviaRichiesta("GET", "/api/getStudents", {"startingDate": startingDate, "finalDate": finalDate});
        request.done((data) => {
            console.log(data);
        });
        request.fail(errore);
    });
    
});