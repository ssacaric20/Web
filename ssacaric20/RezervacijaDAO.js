const ds = require("fs");

class RezervacijaDAO {
	dajRezervacije = function(){
        var podaci = ds.readFileSync("podaci/rezervacije.csv","utf-8");

        var ret = [[]];

        var redovi = podaci.split("\n");
        let first = true;
        for( var red of redovi )
        {
            if( !first )
                ret.push( [] );

            first = false;

            var kolone = red.split(";");
            for( var atr of kolone )
            {
                ret[ret.length-1].push(atr);
            }
        }

        console.log(ret);
    }

	add = function (rezervacija) {
		var rezervacije = this.dajRezervacije();
		rezervacije.push(rezervacija);
		var novaRezervacijaDodana = rezervacije.map((row) => row.join(";")).join("\n");
		fs.writeFile('podaci/rezervacije.csv', novaRezervacijaDodana, { flag: 'w' }, (greska) => {
			if (greska) console.log(greska);
		});
	}

	delet = function(id) {
		var rezervacije = this.dajRezervacije();
		var obrisanaRezervacija = new Array();
		var obrisana = "";
		for (var index in rezervacije) {
		  if (index != id) {
			obrisanaRezervacija.push(rezervacije[index]);
		  } else {
			obrisana = rezervacije[index];
		  }
		}
		console.log(obrisanaRezervacija);
	  
		const csvData = obrisanaRezervacija.map(row => row.join(';')).join('\n');
	  
		fs.writeFile('podaci/rezervacije.csv', csvData, { flag: 'w' }, (error) => {
		  if (error) {
			console.error('Greška pri pisanju u datoteku:', error);
		  }
		});
	  
		return obrisana;
	  }
	  

	  update = function(id, noviPodaci) {
		var rezervacije = this.dajRezervacije();
		for (var index in rezervacije) {
		  if (index == id) {
			rezervacije[index] = noviPodaci;
			break;
		  }
		}
		
		const csvData = rezervacije.map(row => row.join(';')).join('\n');
	  
		fs.writeFile('podaci/rezervacije.csv', csvData, { flag: 'w' }, (error) => {
		  if (error) {
			console.error('Greška pri pisanju u datoteku:', error);
		  }
		});
	  }
}

module.exports = RezervacijaDAO;
