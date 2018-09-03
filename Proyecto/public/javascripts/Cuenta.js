$(document).ready(function () {
    ocultar();
});

function ListadoRevista() {
    var html = "Ningun Dato que mostrar";
    $.ajax({
        type: "GET",
        url: "/mostrarRevista",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td><img src= '" + data[i].link_imagen + "' width='200' height='300'</td>";
                html += "<td>" + data[i].titulo + "</td>";
                html += "<td>" + data[i].autor + "</td>";
                html += "<td>" + data[i].plataforma + "</td>";
                html += "<td><a href='" + data[i].link + "'>Link</a></td>";
                html += "</tr>";
            }

            console.log(data);
            $("#tabla tbody").html(html);
        }
    });
}


function ListadoRevistaAdmin() {
    var html = "Ningun Dato que mostrar";
    $.ajax({
        type: "GET",
        url: "/mostrarRevista",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td><img src= '" + data[i].link_imagen + "' width='200' height='300'</td>";
                html += "<td>" + data[i].titulo + "</td>";
                html += "<td>" + data[i].autor + "</td>";
                html += "<td>" + data[i].plataforma + "</td>";
                html += "<td><a href='" + data[i].link + "'>Link</a></td>";
                html += "<% if (loginA == 'administrador') {%><td><a id='btn_elegir_" + i + "' href='#'>Elegir</a>\n\
                                <script>\n\
                                    $('#btn_elegir_" + i + "').click(function(){\n\
                                        var x = document.getElementById('editar');\n\
                                        x.style.display = '';\n\
                                        $('#id').val('" + data[i].id + "');\n\
                                        $('#link_imagen').val('" + data[i].link_imagen + "');\n\
                                        $('#v_titulo').val('" + data[i].titulo + "');\n\
                                        $('#autor').val('" + data[i].autor + "');\n\
                                        $('#plataforma').val('" + data[i].plataforma + "');\n\
                                        $('#link').val('" + data[i].link + "');\n\
                                        $('#id_doc').val('" + data[i].id + "');\n\
                                    }); \n\
                                </script>";
                html += "</td><%}%>";
                html += "</tr>";
            }

            console.log(data);
            $("#tabla tbody").html(html);
        }
    });
}

function ListadoLibro() {
    var html = "Ningun Dato que mostrar";
    $.ajax({
        type: "GET",
        url: "/mostrarLibro",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td><img src= '" + data[i].link_imagen + "' width='200' height='300'</td>";
                html += "<td  WIDTH='100'>" + data[i].titulo + "</td>";
                html += "<td>" + data[i].autor + "</td>";
                html += "<td>" + data[i].plataforma + "</td>";
                html += "<td><a href='" + data[i].link + "'>Link</a></td>";
                html += "</tr>";
            }

            console.log(data);
            $("#tabla tbody").html(html);
        }
    });
}


function ListadoLibroAdmin() {
    var html = "Ningun Dato que mostrar";
    $.ajax({
        type: "GET",
        url: "/mostrarLibro",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td><img src= '" + data[i].link_imagen + "' width='200' height='300'</td>";
                html += "<td WIDTH='100'>" + data[i].titulo + "</td>";
                html += "<td>" + data[i].autor + "</td>";
                html += "<td>" + data[i].plataforma + "</td>";
                html += "<td><a href='" + data[i].link + "'>Link</a></td>";
                html += "<% if (loginA == 'administrador') {%><td><a id='btn_elegir_" + i + "' href='#'>Elegir</a>\n\
                                <script>\n\
                                    $('#btn_elegir_" + i + "').click(function(){\n\
                                        var x = document.getElementById('editar');\n\
                                        x.style.display = '';\n\
                                        $('#id').val('" + data[i].id + "');\n\
                                        $('#link_imagen').val('" + data[i].link_imagen + "');\n\
                                        $('#v_titulo').val('" + data[i].titulo + "');\n\
                                        $('#autor').val('" + data[i].autor + "');\n\
                                        $('#plataforma').val('" + data[i].plataforma + "');\n\
                                        $('#link').val('" + data[i].link + "');\n\
                                        $('#id_doc').val('" + data[i].id + "');\n\
                                    }); \n\
                                </script>";
                html += "</td><%}%>";
                html += "</tr>";
            }

            console.log(data);
            $("#tabla tbody").html(html);
        }
    });
}
function ListadoArticulo() {
    var html = "Ningun Dato que mostrar";
    $.ajax({
        type: "GET",
        url: "/mostrarArticulo",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td><img src= '" + data[i].link_imagen + "' width='200' height='300'</td>";
                html += "<td>" + data[i].titulo + "</td>";
                html += "<td>" + data[i].autor + "</td>";
                html += "<td>" + data[i].plataforma + "</td>";
                html += "<td><a href='" + data[i].link + "'>Link</a></td>";
                html += "</tr>";
            }

            console.log(data);
            $("#tabla tbody").html(html);
        }
    });
}


function ListadoArticuloAdmin() {
    var html = "Ningun Dato que mostrar";
    $.ajax({
        type: "GET",
        url: "/mostrarArticulo",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td><img src= '" + data[i].link_imagen + "' width='200' height='300'</td>";
                html += "<td>" + data[i].titulo + "</td>";
                html += "<td>" + data[i].autor + "</td>";
                html += "<td>" + data[i].plataforma + "</td>";
                html += "<td><a href='" + data[i].link + "'>Link</a></td>";
                html += "<% if (loginA == 'administrador') {%><td><a id='btn_elegir_" + i + "' href='#'>Elegir</a>\n\
                                <script>\n\
                                    $('#btn_elegir_" + i + "').click(function(){\n\
                                        var x = document.getElementById('editar');\n\
                                        x.style.display = '';\n\
                                        $('#id').val('" + data[i].id + "');\n\
                                        $('#link_imagen').val('" + data[i].link_imagen + "');\n\
                                        $('#v_titulo').val('" + data[i].titulo + "');\n\
                                        $('#autor').val('" + data[i].autor + "');\n\
                                        $('#plataforma').val('" + data[i].plataforma + "');\n\
                                        $('#link').val('" + data[i].link + "');\n\
                                        $('#id_doc').val('" + data[i].id + "');\n\
                                    }); \n\
                                </script>";
                html += "</td><%}%>";
                html += "</tr>";
            }

            console.log(data);
            $("#tabla tbody").html(html);
        }
    });
}
function ocultar() {
    var x = document.getElementById('editar');
    x.style.display = 'none';
}




