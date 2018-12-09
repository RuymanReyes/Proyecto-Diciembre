$(document).ready(function () {
    let boton = $('#enviarInsert');
    let lista = $('#listaProyectos .row');

 
    //eliminar el evento con un boton.
    lista.on('click', '.eliminarProyecto', function () {

        let listItem = $(this);
        let id = listItem.parent().parent().attr('id');
        $.post('http://localhost:3000/vulcan/delete', { id: id }, function (response) {
            console.log(response)
            if (response.affectedRows === 1) {
                listItem.parent().parent().parent().remove();
            }
        });
    });


    //MODIFICAR LOS REGISTROS 

    lista.on('click', '.modificar', function () {
        let datosCard = $(this).parent();
        let origen = datosCard.find('.origen').text();
        let destino = datosCard.find('.destino').text();
        let descripcion = datosCard.find('.descripcion').text();
        let fecha = datosCard.find('.fecha').text();
        let nombre = datosCard.parent().find('.card-title').text();
        let id = datosCard.parent().parent().find('.card').attr('id');
        // Aqui add un parent() mas
        console.log(id);
        $('#origenUpdate').val(origen);
        $('#nombreUpdate').val(nombre);
        $('#destinoUpdate').val(destino);
        $('#descripcionUpdate').val(descripcion);
        $('#fechaUpdate').val(fecha);
        $('#idUpdate').val(id);
    });

    
    $('#botonUpdate').on('click',function(){
        let item= $(this).parent().parent();
        let name= item.find('#nombreUpdate').val();
        let origin =item.find('#origenUpdate').val();
        let destiny = item.find('#destinoUpdate').val();
        let description = item.find('#descripcionUpdate').val();
        let date = item.find('#fechaUpdate').val();
        let id = item.find('#idUpdate').val();
        $.post('http://localhost:3000/vulcan/update', {id:id, name:name, origin:origin, destiny:destiny, description:description, date:date}, function(ruta){
            console.log(ruta);
            item.html('<div class="col s12 m6 l4 xl3">' +
            '<div class="card" id="' + ruta.id + '">' +
            '<div class="card-image">' +
    
            '<img src="../img/elegir1.jpg">' +
            '<span class="card-title">' + ruta.nombre + '</span>' +
            '<a class="eliminarProyecto btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>'
            + '</div>'
            + '<div class="card-content">' +
            '<p> Origen: <span class="origen">' + ruta.origen + '</span></p>' +
            '<p> Destino: <span class="destino">' + ruta.destino + '</span></p>' +
            '<p> descrición: <span class="descripcion">' + ruta.descripcion + '</span></p>' +
            '<p> fecha: <span class="fecha">' + ruta.fecha + '</span></p>' +
            '<a class=" modificar waves-effect waves-light btn modal-trigger" href="#modal1">Modificar</a>'+
            '</div>' +
            '</div>');
            location.reload();
        });
    })

    boton.on('click', function () {
        let data = $('#insert').serialize();
        console.log(data)
        let nombre = $('#nombre').val();
        let origen= $('#origen').val();
        let destino = $ ('#destino').val();
        let descripcion = $ ('#descripción').val()
        let fecha = $ ('#fecha').val()
        let error= "";
        if (nombre==""||origen==""|| destino ==""|| descripcion == ""||fecha == ""){
            error= "Por favor revise sus datos"
            $('.error').append(error)
        }
        else{
        $('.error').remove()

        $.post('http://localhost:3000/vulcan/add', data, function (ruta) {
            lista.append(
                '<div class="col s12 m6 l4 xl3">' +
                '<div class="card" id="' + ruta.id + '">' +
                '<div class="card-image">' +
                '<img src="../img/elegir1.jpg">' +
                '<span class="card-title">' + ruta.nombre + '</span>' +
                '<a class="eliminarProyecto btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>'
                + '</div>'
                + '<div class="card-content">' +
                '<p> Origen: <span class="origen">' + ruta.origen + '</span></p>' +
                '<p> Destino: <span class="destino">' + ruta.destino + '</span></p>' +
                '<p> descrición: <span class="descripcion">' + ruta.descripcion + '</span></p>' +
                '<p> fecha: <span class="fecha">' + ruta.fecha + '</span></p>' +
                '<a class=" modificar waves-effect waves-light btn modal-trigger" href="#modal1">Modificar</a>' +

                '</div>' +
                '</div>')

        });
    }
    });


//agregarlo a pantalla 
$.get('http://localhost:3000/vulcan/', function (response) {
    response.forEach(ruta => {
        lista.append( // nos añade la carta cuando agregamos la ruta, contiene dos botones para modificar y borrar
            '<div class="col s12 m6 l4 xl3">' +
            '<div class="card" id="' + ruta.id + '">' +
            '<div class="card-image">' +
            '<img src="../img/elegir1.jpg">' +
            '<span class="card-title">' + ruta.nombre + '</span>' +
            '<a class="eliminarProyecto btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>'
            + '</div>'
            + '<div class="card-content">' +
            '<p> Origen: <span class="origen">' + ruta.origen + '</span></p>' +
            '<p> Destino: <span class="destino">' + ruta.destino + '</span></p>' +
            '<p> descrición: <span class="descripcion">' + ruta.descripcion + '</span></p>' +
            '<p> fecha: <span class="fecha">' + ruta.fecha + '</span></p>' +
            '<a class=" modificar waves-effect waves-light btn modal-trigger" href="#modal1">Modificar</a>' +
            '</div>' +
            '</div>');

    });
});
});