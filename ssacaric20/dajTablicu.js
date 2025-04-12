const ds = require("fs");

exports.dajTablicu = function () {
    let podaci = ds.readFileSync("podaci/cjenik.json", "utf-8");
    let tablica = "";
    let json = JSON.parse(podaci);

    tablica += '<table id="stolic">';
    tablica += "<thead><tr>";
    tablica += "<th>Usluga</th>";
    tablica += "<th>Opis</th>";
    tablica += "<th>Cijena</th>";
    tablica += "</tr></thead>";


    for (row of json) {
        tablica += "<tr>";
        let unos = true;
        for (column in row) {
            if (unos == true) tablica += "<td>";
            else tablica += "<td>";
            tablica += row[column];
            tablica += "</td>";
            unos = false;
        }
        tablica += "</tr>";
    }
	
	/*
	tablica += "<tfoot>";
	tablica += "<tr>";
	tablica += '</td class="right" colspan="3">Polog se računa ovisno o odabranim opcijama.</td>';
	tablica += "</tr>";
	tablica += "</tfoot>";
    tablica += "</table>";
	*/

    return tablica;
};