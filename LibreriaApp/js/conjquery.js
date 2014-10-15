

var mostrarMenu = function () {
    document.getElementById("menuAñadir").css("display", "block");
}

var borrarTabla = function () {

    // $("#tablaDatos").parent.remove($("#tablaDatos"))
    $("#tablaLibros").remove();

};

var cargarDatos = function (datos) {
    $("#contenido").append("<table id='tablaLibros'></table>");
    $.each(datos, function (i, dato) {
        var fila = "<tr>";
        fila += "<td>" + dato.isbn + "</td>";
        fila += "<td>" + dato.titulo + "</td>";
        fila += "<td>" + dato.paginas + "</td>";
        fila += "<td>" + dato.unidades + "</td>";
        fila += "</tr>";
        $("#tablaLibros").append(fila);

    });

};

var leer = function () {
    var url = "http://alumnos-mcsd2013.azure-mobile.net/tables/libros";;

    $.ajax(url, {
        method: "GET",
        contentType: "application/json",
        crossDomain: true,
        datatype: "json",
        beforeSend: function (xhr) {

            xhr.setRequestHeader("header", "valor");

        },
        success: function (xhr) {
            borrarTabla();
            cargarDatos(xhr);
        },
        error: function (err) {
            alert(err);

        }


    });


};

$(document).ready(function () {
    leer();
    mostrarMenu();

});