const express = require("/usr/lib/node_modules/express");
const mojModul = require("./dajTablicu.js");

const fs = require("fs");
const RezervacijaDAO = require("./RezervacijaDAO.js");
const rdao = new RezervacijaDAO();


//ovo tu ne radi, probala sam zakomentirati/otkomentirati, ne radi na spideru, samo lokalno
//const portovi = require("/var/www/OWT/2023/portovi.js");
//const port = portovi.ssacaric20;
const port = 12460;
const server = express();
const putanja = __dirname;
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get("/javascript", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/jsk/ssacaric20.js");
});
server.use("/dokumenti", express.static(putanja + "/dokumenti"));
server.use("/css", express.static(putanja + "/css"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json()); 

// 8.a)
server.get("/api/rezervacije", (zahtjev, odgovor) => {
	odgovor.type("json");
	let data = rdao.dajRezervacije();
	odgovor.status(200);
	odgovor.send(JSON.stringify(data));
});

// 9.a)
server.get("/api/rezervacije/:id", (zahtjev, odgovor) => {
	odgovor.type("json");
	let id = zahtjev.params.id; 
	let data = rdao.dajRezervacije();
	if (data[id] == undefined) {
			odgovor.status(404);
			odgovor.send(
				JSON.stringify({
					poruka: "Nema resursa",
				})
			);
	} else {
		odgovor.status(200);
		odgovor.send(JSON.stringify(data[id]));
	}
});

// 8.b)
server.post("/api/rezervacije", (zahtjev, odgovor) => {
	let podaci = zahtjev.body;
	console.log(podaci);
	odgovor.type("json");
	if (podaci == null || podaci["Rezervacija"] == undefined) {
		odgovor.status(417);
		odgovor.send(JSON.stringify({ poruka: "Nevaljani podaci" }));
	} else {
		rdao.add(podaci);
		odgovor.status(200);
		odgovor.send(JSON.stringify({ poruka: "Podaci dodani" }));
	}
});

// 9.b)
server.post("/api/rezervacije/:id", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(405);
	odgovor.send({ poruka: "Metoda nije dopuštena" });
});

// 8.c)
server.put("/api/rezervacije", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(501);
	odgovor.send({ poruka: "Metoda nije implementirana" });
  });


// 9.c)
server.put("/api/rezervacije/:id", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(501);
	odgovor.send({ poruka: "Metoda nije implementirana" });
  });

// 8.d)
server.delete("/api/rezervacije", (zahtjev, odgovor) => {
	odgovor.type("json");
	odgovor.status(501);
	odgovor.send({ poruka: "Metoda nije implementirana" });
  });

// 9.d)
server.delete("/api/rezervacije/:id", (zahtjev, odgovor) => {
	odgovor.type("json");
	var id = zahtjev.params.id;
	rdao.delet(id);
	if (data[id] == undefined) {
		odgovor.status(501);
		odgovor.send(JSON.stringify({ poruka: "Nevaljani podaci" }));
	} else {
		rdao.delet(podaci);
		odgovor.status(200);
		odgovor.send(JSON.stringify({ poruka: "Podaci obrisani" }));
	}
  });

server.get("/javascript", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/jsk/ssacaric20.js");
});

server.get("/dinamicna", (zahtjev, odgovor) => {
	let prije = fs.readFileSync("podaci/zaglavlje.txt", "utf-8");
	let poslije = fs.readFileSync("podaci/podnozje.txt", "utf-8");
	odgovor.type("html");
	odgovor.write(prije);
	odgovor.write(mojModul.dajTablicu());
	odgovor.write(poslije);
	odgovor.end();
});

server.get("/grid", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/grid.html");
});

server.get("/dokumentacija", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/dokumentacija/dokumentacija.html");
});

server.get("/autor", (zahtjev, odgovor) => {
    odgovor.sendFile(putanja + "/dokumentacija/autor.html");
});

server.get("/", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/html/index.html");
});

server.use((zahtjev, odgovor) => {
	odgovor.status(404);
	odgovor.send("Stranica nije pronađena! <a href='/'>Početna stranica</a>");
});

server.listen(port, () => {
	console.log(`Server pokrenut na portu: ${port}`);
});