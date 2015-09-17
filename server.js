var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var moduloConsultas = require('./moduloConsultas.js');

var app = express();
var url = 'mongodb://localhost:27017/contactos';
var db;

MongoClient.connect(url, function(err, dataBase) {
	if(err){
		console.log(err);
		return;
	};
	console.log("Se conecto correctamente la conexion con:"+url);
	db = dataBase;
});

app.use(express.static('public'));
/*Agregar Contacto*/
app.post('/add', function(req, res){
	var nuevoContactoInput = req.headers.nombreadd;
	var nuevoTelefonoInput = req.headers.telefonoadd;

	console.log(nuevoContactoInput+" "+nuevoTelefonoInput);

	moduloConsultas.agregarContacto(db, function(){
		res.send(JSON.stringify(nuevoContactoInput));
	},nuevoContactoInput, nuevoTelefonoInput);
	
});
/*Lista de Contactos*/
app.get('/listaContactos', function(req, res){
	if(!db){
		res.send("error");
		return;
	}
	moduloConsultas.listaContactos(db, function(listaDeContactos){
		console.log(listaDeContactos);
		res.send(JSON.stringify(listaDeContactos));
	});
});
/*Modificar Contacto*/
app.post('/modify', function(req, res){
	var modificarContactoInput = req.headers.nombreModify;
	var modificarTelefonoInput = req.headers.telefonoModify;

});

var port = 4000;
var server = app.listen(port, function(){
	console.log('Se ejectuco el servidor localhost:'+port);
});

/*var server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end(index);
});
server.listen(5000);
console.log("Server running in the port 5000");*/