"use strict"

$(document).ready(function () {
  let filters = $(".card").first();
  let divIntestazione = $("#divIntestazione")
  let divCollections = $("#divCollections")
  let table = $("#mainTable")
  let divDettagli = $("#divDettagli")
  
  let currentCollection = "";

  filters.hide();

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
      if (currentCollection == "Unicorns") {
        filters.show();
      } else {
        filters.hide();
      };


      let tbody = table.children("tbody");
      tbody.empty();
      for (const item of data) {
        let tr = $("<tr>");
        tbody.append(tr);

        let td = $("<td>");
        td.appendTo(tr);
        td.text(item._id);
        td.prop("id", item._id);
        td.on("click", visualizzaDettagli);

        td = $("<td>");
        td.appendTo(tr);
        td.text(item.name);
        td.prop("id", item._id);
        td.on("click", visualizzaDettagli);

        td = $("<td>");
        td.appendTo(tr);

        for (let i = 0; i < 3; i++) {
          $("<div>").appendTo(td);
        }
      }
    });
  });

  function visualizzaDettagli() {
    // attenzione, in questo caso non sarebbe andato
    // fare this con la arrow func, in quanto non avrebbe
    // modificato il this
    let request = inviaRichiesta("get", "/api/" + currentCollection + "/" + $(this).prop("id"));
    request.fail(errore);
    request.done((data) => {
      divDettagli.empty();
      
      console.log(data);
      let content = "";
      for (const key in data[0]) {
        content += "<strong>" + key + ":</strong> " + data[0][key] + "<br>";
      }

      divDettagli.append(content);
    });
  };
});