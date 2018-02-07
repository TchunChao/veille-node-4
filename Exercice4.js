const express = require('express');
const app = express();
const http = require("http"); 

app.use(express.static('public'));
app.use(express.static(__dirname + "/public"));

const transforme_en_tableau = (collection)=>{
	let html = "<head><link rel='stylesheet' type='text/css' href='/css/style.css'></head>";
	html += "<h1>Membres</h1><table>";
	let id = 0;

	for (elm of collection) {
		id+=1;
		for(p in elm) {
			html += "<tr><th>" + p + "</th><td>" + elm[p] + "</td></tr>";
		}
	}
	html += "<tr><th>id</th><td>" + id + "</td></tr>";
	html += "</table>";
	return html;
}


////////////////////////////////////// Route /html/01_form.html
app.get('/formulaire', (req, res) => {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/" + "02_form.html" );
})

////////////////////////////////////// Route /
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

////////////////////////////////////// Route /traiter_get
app.get('/traiter_get', (req, res)=> {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 courriel:req.query.courriel
 };
console.log(reponse);
 res.end(JSON.stringify(reponse));
})



////////////////////////////////////// Route /membres
app.get('/membres', (req, res) => {
	const fs = require("fs");
	fs.readFile( __dirname + "/public/data/" + "membres.txt", 'utf8', function (err, data) {
		if (err) throw err;
		console.log( data );
		res.end( transforme_en_tableau(JSON.parse('[' + data + ']')) );
	});
})

////////////////////////////////////// Route /traiter_membres
app.get('/traiter_membres', (req, res)=> {
	console.log('la route /traiter_membres');
	const fs = require("fs");
	let membre = {
	 prenom:req.query.prenom,
	 nom:req.query.nom,
	 tel:req.query.tel,
	 courriel:req.query.courriel
	};

	fs.appendFile('public/data/membres.txt', ","+ JSON.stringify(membre), function (err) {
	if (err) throw err;
		console.log('Sauvegardé');
	});

	res.end(JSON.stringify(membre));
})

let server = app.listen(8081, function () {
let host = server.address().address
let port = server.address().port
 
console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})