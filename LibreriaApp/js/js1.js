var url = "http://alumnos-mcsd2013.azure-mobile.net/tables/";

var mostrarMenu = function() {
    document.getElementById("menuAñadir").css("display", "block");
}

var borrarTabla = function () {

    document.getElementById("contenido").removeChild(
        document.getElementById("tablaLibros"));
};

var cargarTabla = function (libros) {
    var tabla = document.createElement("table");
    tabla.setAttribute("id", "tablaLibros");

    for (var i = 0; i < libros.length; i++) {
        var fila = document.createElement("tr");
        var c1 = document.createElement("td");
        var c2 = document.createElement("td");
        var c3 = document.createElement("td");
        var c4 = document.createElement("td");
        var c5 = document.createElement("td");
        var t1 = document.createTextNode(libros[i].isbn);
        var t2 = document.createTextNode(libros[i].titulo);
        var t3 = document.createTextNode(libros[i].paginas);
        var t4 = document.createTextNode(libros[i].unidades);
        var t5 = document.createElement("a");
        t5.setAttribute("id", "Borrar-" + libros[i].id);
        t5.setAttribute("href", "#");
        t5.onclick = borrar;

        var t6 = document.createElement("a");
        t6.setAttribute("id", "Modificar-" + libros[i].id);
        t6.setAttribute("href", "#");
        t6.onclick = modificar;

        var tt5 = document.createTextNode("Borrar");
        var tt6 = document.createTextNode("Modificar");
        t6.appendChild(tt6);
        t5.appendChild(tt5);
        c1.appendChild(t1);
        c2.appendChild(t2);
        c3.appendChild(t3);
        c5.appendChild(t4);
        c5.appendChild(t5);
        fila.appendChild(c1);
        fila.appendChild(c2);
        fila.appendChild(c3);
        fila.appendChild(c4);
        fila.appendChild(c4);

        tabla.appendChild(fila);
    }
    document.getElementById("contenido").appendChild(tabla);
};
var leerDatos = function () {
    var urlFinal = url + "libros";//Repasar esto, ahora mismo no sé si lo necesito o puedo funcionar sin ello, y claro si no lo voy a usar cambiar lo de urlfinal


    var ajax = new XMLHttpRequest();
    ajax.open("GET", urlFinal);
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            borrarTabla();
            var datos = eval(ajax.responseText);
            cargarTabla(datos);

        } else {
            alert("Error recuperando informacion");
        }

    };
    ajax.send(null);

};

var modificar = function (evt) {
    var idelemento = evt.target.getAttribute("id");
    var urlFinal = url + "libros/" + idelemento.split("-")[1];//Repasar esto, ahora mismo no sé si lo necesito o puedo funcionar sin ello, y claro si no lo voy a usar cambiar lo de urlfinal


    var ajax = new XMLHttpRequest();
    ajax.open("GET", urlFinal);
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            var obj = eval('(' + ajax.responseText + ')');
            document.getElementById("hdnId").value = obj.id;
            document.getElementById("txtIsbn").value = obj.isbn;
            document.getElementById("txtTitulo").value = obj.titulo;
            document.getElementById("txtPaginas").value = obj.paginas;
            document.getElementById("txtUnidades").value = obj.unidades;


        } else {

            alert("Error leyendo datos");
        }

    };

    ajax.send(null);
}


var escribirDatos = function () {
    var urlFinal = url + "libros";//Repasar esto, ahora mismo no sé si lo necesito o puedo funcionar sin ello, y claro si no lo voy a usar cambiar lo de urlfinal

    var ajax = new XMLHttpRequest();
    var id = document.getElementById("hdnId").value;
    var json = {
        isbn: document.getElementById("txtIsbn").value,
        titulo: document.getElementById("txtTitulo").value,
        paginas: document.getElementById("txtPaginas").value,
        unidades: document.getElementById("txtUnidades").value
    };
    if (isNaN(id)) {
        ajax.open("POST", urlFinal);


    } else {
        urlFinal += "/" + id;
        json.id = id;
        ajax.open("PUT", urlFinal);
    }


    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            document.getElementById("hdnId").value = "";
            leerDatos();

        } else {

            alert("Error escribiendo datos");
        }

    };


    var jsonText = JSON.stringify(json);
    ajax.send(jsonText);

};
var borrar = function (evt) {
    var idelemento = evt.target.getAttribute("id");
    var urlFinal = url + "libros/" + idelemento.split("-")[1];

    var ajax = new XMLHttpRequest();
    ajax.open("DELETE", urlFinal);

    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            leerDatos();

        } else {

            alert("Error borrando datos");
        }

    };

    ajax.send(null);


};
(function () {
    document.getElementById("btnGuardar").onclick = escribirDatos;
    leerDatos();
    document.getElementById("btnAñadir").onclick = mostrarMenu;

    //var enlaces = document.querySelectorAll("a");

    //for (var i = 0; i < enlaces.length; i++) {
    //    enlaces[i].onclick = borrar;

    //}

})();