var moduloConsultas = {

	agregarContacto: function(db, callback, nombreadd, telefonoadd){
		var cargarContacto = db.collection('datos');
		cargarContacto.insert({
			"Nombre": nombreadd,
			"Telefono": telefonoadd
		}, function(err, result){
			if(err){
				console.log(err);
				return;
			};
			console.log(result);
			var NuevoContactoAgregado = result.Nombre;
			callback(NuevoContactoAgregado);
		});
	},
	modificarContacto: function(db, callback, nombre, telefono){
		var modificar = db.collection('datos');
	},
	listaContactos: function(db, callback){
		var contactos = db.collection('datos').find({});
		contactos.toArray(function(err, result){
			if(err){
				console.log(err);
				return;
			};
			var listaDeContactos = result;
			callback(listaDeContactos);
		})
	}
}
module.exports = moduloConsultas;