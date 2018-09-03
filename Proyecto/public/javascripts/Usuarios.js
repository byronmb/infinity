$(document).ready(function () {
    ocultar();
});

function ListadoAdmin() {
    var html = "No existen Usuarios";
    var html2 = "No existen Administradores";
    $.ajax({
        type: "GET",
        url: "/mostrarPersonas",
        success: function (data) {
            $.ajax({
                type: "GET",
                url: "/mostrarCuentas",
                success: function (data2) {

                    $.ajax({
                        type: "GET",
                        url: "/log",
                        success: function (log) {
                            for (var i = 0; i < data.length; i++) {
                                var x = data[i].id;
                                console.log("*************************************" + x + "************************");
                                
                                if (data2[i].id_rol == 2) {
                                    html += "<tr>";
                                    html += "<td>" + data[i].id + "</td>";
                                    html += "<td>" + data[i].nombres + "</td>";
                                    html += "<td>" + data[i].apellidos + "</td>";
                                    html += "<td>" + data[i].correo + "</td>";
                                    html += "<td> usuario </td>";
                                    html += "<td><a id='btn_elegir_" + i + "' href='#'>Eliminar</a>\n\
                                <script>\n\
                                    $('#btn_elegir_" + i + "').click(function(){\n\
                                        var x = document.getElementById('eliminar');\n\
                                        x.style.display = '';\n\
                                        $('#id').val('" + data[i].id + "');\n\
                                        $('#nombres').val('" + data[i].nombres + "+" + data[i].apellidos + "');\n\
                                        $('#correo').val('" + data[i].correo + "');\n\
                                    }); \n\
                                </script>";
                                    html += "</td>";
                                    html += "</tr>";
                                }else{
                                    html2 += "<tr>";
                                    html2 += "<td>" + data[i].id + "</td>";
                                    html2 += "<td>" + data[i].nombres + "</td>";
                                    html2 += "<td>" + data[i].apellidos + "</td>";
                                    html2 += "<td>" + data[i].correo + "</td>";
                                    html2 += "<td> administrador </td>";
                                    html2 += "</tr>";

                                }

                            }
                            console.log(data);
                            $("#tabla tbody").html(html);
                            $("#tablaA tbody").html(html2);

                        }
                    });


                }
            });
        }
    });
}
function ocultar() {
    var x = document.getElementById('eliminar');
    x.style.display = 'none';
}
