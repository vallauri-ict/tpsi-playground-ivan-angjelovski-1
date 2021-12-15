"use strict"

$(document).ready(function () {
  let divIntestazione = $("#divIntestazione")
  let divCollections = $("#divCollections")
  let table = $("#mainTable")
  let divDettagli = $("#divDettagli")
  
  let currentCollection = "";

  let request = inviaRichiesta("get", "/api/getCollections");
  request.fail(errore)
  request.done(function (collections) {
    console.log(collections);
    let label = divCollections.children("label");
    for (const collection of collections) {
      let clone = label.clone();
      clone.appendTo(divCollections);
      clone.children("input").val(collection.name);
      clone.children("span").text(collection.name);
      divCollections.append("<br>");
    }
    label.remove();
  });




  divCollections.on("click", "input[type='radio']", function() {
    currentCollection = $(this).val();



    let request = inviaRichiesta("GET", "/api/" + currentCollection);
    request.fail(errore);
    request.done((data) => {
      console.log(data);
      divIntestazione.find("strong").eq(0).text(currentCollection);
      divIntestazione.find("strong").eq(1).text(data.length);


      let tbody = table.children("tbody");
      tbody.empty();
      for (const item of data) {
        let tr = $("<tr>");
        tbody.append(tr);

        let td = $("<td>");
        td.appendTo(tr);
        td.text(item._id);


        td = $("<td>");
        td.appendTo(tr);
        td.text(item.name);

        td = $("<td>");
        td.appendTo(tr);

        for (let i = 0; i < 3; i++) {
          $("<div>").appendTo(td);
        }
      }
    });
  });
});