$(document).ready(function(){
	var agregarbtn = $('#agregarbtn');
	var modificarbtn = $('#modificarbtn');

	/*Agregar contacto*/
	agregarbtn.on('click', function(){
	var nuevoContactoInput = $('#nuevoContactoInput').val();
	var nuevoTelefonoInput = $('#nuevoTelefonoInput').val();

	if(nuevoContactoInput==="" && nuevoTelefonoInput!=""){
		alert("Nombre Vacio");
	}
	if(nuevoContactoInput!="" && nuevoTelefonoInput===""){
		alert("Telefono Vacio");
	}
	if(nuevoContactoInput==="" && nuevoTelefonoInput===""){
		alert("Nombre & Telefono Vacio");
	}

		$.ajax({
			type:'POST',
			url: '/add',
			dataType: 'json',
			headers:{
				nombreadd: nuevoContactoInput,
				telefonoadd: nuevoTelefonoInput},
			success: function(data){
				console.log("Se cargo correctamete el contacto"+data);
				location.reload();
			},
			error: function(data){
				alert("Fallo la carga del usuario");
			}
		});
	});
	
	/*Mostrar Contactos en Pantallas*/
	$.ajax({
		type: 'GET',
		url: '/listaContactos',
		dataType: 'json',
		success: function(data){
			data.forEach(function(valor){
				$('#listaContactos').append('<tr>'+
					'<td>'+valor.Nombre+'</td>'+
					'<td>'+valor.Telefono+'</td>'+
					'<td><button type="button" class="modificar btn btn-primary btn-sm" data-toggle="modal" data-target="#myModalModificar">Modify</button></td>'+
					'<td><button type="button" class="borrar btn btn-primary btn-sm">Delete</button></td>'+
					'</tr>');
			});
		},
		error: function(data){
			console.log("Error"+data);
		}
	});

	/*Modificar Contacto*/
	modificarbtn.on('click', function(){
	var modificarContactoInput = $('#modificarContactoInput').val();
	var modificarTelefonoInput = $('#modificarTelefonoInput').val();

		$.ajax({
			type: 'POST',
			url: '/modify',
			datatype: 'json',
			headers:{
				nombreModidy: modificarContactoInput,
				teledonoModify: modificarTelefonoInput},
			success: function(data){
				console.log("Se Modifico correctamente el contacto"+data);
				location.reload();
			},
			error: function(data){
				console.log("Error"+data);
			}
		});
	});

});