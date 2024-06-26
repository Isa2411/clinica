//se almacena la url de la api
let url = "http://localhost:8082/api/v1/medico/";
function listarMedico() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {//Success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let curpoTablaMedico = document.getElementById("curpoTablaMedico");
            curpoTablaMedico.innerHTML = "";
            for (let i = 0; i < result.length; i++) {
                //Se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//Fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaTipoDocumento = document.createElement("td");
                let celdaNumeroDocumento = document.createElement("td");
                let celdaPrimerNombre = document.createElement("td");
                let celdaSegundoNombre = document.createElement("td");
                let celdaPrimerApellido = document.createElement("td");
                let celdaSegundoApellido = document.createElement("td");
                let celdaCelular = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaEstado = document.createElement("td");
                let celdaEditar = document.createElement("td");

                //Almacenamos en valor

                celdaId.innerText = result[i]["id_medico"];
                celdaTipoDocumento.innerText = result[i]["tipo_documento"];
                celdaNumeroDocumento.innerText = result[i]["numero_documento"];
                celdaPrimerNombre.innerText = result[i]["primer_nombre"];
                celdaSegundoNombre.innerText = result[i]["segundo_nombre"];
                celdaPrimerApellido.innerText = result[i]["primer_apellido"];
                celdaSegundoApellido.innerText = result[i]["segundo_apellido"];
                celdaCelular.innerText = result[i]["celular"];
                celdaCorreo.innerText = result[i]["correo_electronico"];
                celdaEstado.innerText = result[i]["estado"];

                let buttonHTML = "<button id=" + result[i]["id_medico"] + " class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Editar</button>";
                let button = document.createElement('button');
                button.classList.add('btn', 'btn-primary');
                button.setAttribute('data-bs-toggle', 'modal');
                button.setAttribute('data-bs-target', '#exampleModal');
                button.setAttribute('id', result[i]["id_medico"]);
                button.innerText = 'Editar';
                celdaEditar.appendChild(button);


                //Agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTipoDocumento);
                trRegistro.appendChild(celdaNumeroDocumento);
                trRegistro.appendChild(celdaPrimerNombre);
                trRegistro.appendChild(celdaSegundoNombre);
                trRegistro.appendChild(celdaPrimerApellido);
                trRegistro.appendChild(celdaSegundoApellido);
                trRegistro.appendChild(celdaCelular);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaEstado);
                trRegistro.appendChild(celdaEditar);

                curpoTablaMedico.appendChild(trRegistro);//Se traen todos los registros

            }
        },
        error: function (error) {
            alert("Error en la peticion ${error}");
        }
    })
}
function registrarMedico() {

    let tipo_documento = document.getElementById("tipo_documento").value;
    let numero_documento = document.getElementById("numero_documento").value;
    let primer_nombre = document.getElementById("primer_nombre").value;
    let segundo_nombre = document.getElementById("segundo_nombre").value;
    let primer_apellido = document.getElementById("primer_apellido").value;
    let segundo_apellido = document.getElementById("segundo_apellido").value;
    let correo_electronico = document.getElementById("correo_electronico").value;
    let celular = document.getElementById("celular").value;
    let estado = document.getElementById("estado").value;

    let formData = {

        "tipo_documento": tipo_documento,
        "numero_documento": numero_documento,
        "primer_nombre": primer_nombre,
        "segundo_nombre": segundo_nombre,
        "primer_apellido": primer_apellido,
        "segundo_apellido": segundo_apellido,
        "celular": celular,
        "correo": correo_electronico,
        "estado": estado
    };
    var jsonData = JSON.stringify(formData);
    if (validarCampos()) {

        $.ajax({
            url: url,
            type: "POST",
            data: jsonData,
            contentType: 'application/json',
            success: function (reslt) {
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Su registro se guardó correctamente.",
                    icon: "success"
                });
                // Llamar a la función para limpiar los campos del formulario
                limpiarCampos();
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: xhr.responseText,
                    icon: "danger"
                });
            }
        });
    } else {
        // alert("llena los campos correctamente")
        Swal.fire({
            title: "Error",
            text: "Complete los campos correctamente",
            icon: "error"
        });
    }
}
// Función para limpiar los campos del formulario después de un registro exitoso
function limpiarCampos() {
    document.getElementById("tipo_documento").value = "";
    document.getElementById("numero_documento").value = "";
    document.getElementById("primer_nombre").value = "";
    document.getElementById("segundo_nombre").value = "";
    document.getElementById("primer_apellido").value = "";
    document.getElementById("segundo_apellido").value = "";
    document.getElementById("correo_electronico").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("estado").value = "";
}
function validarCampos() {
    let numero_documento = document.getElementById("numero_documento");
    var primer_nombre = document.getElementById("primer_nombre");
    var primer_apellido = document.getElementById("primer_apellido");
    var celular = document.getElementById("celular");

    return validarNumeroDocumento(numero_documento) && validarNombreApellido(primer_nombre)
        && validarNombreApellido(primer_apellido) && validarCelular(celular);
}
function validarNumeroDocumento(cuadroNumero) {
    let valor = cuadroNumero.value;
    let valido = true;
    if (valor.length < 5 || valor.length > 11) {
        valido = false
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid"
    }
    else {
        cuadroNumero.className = "form-control is-invalid"
    }
    return valido;
}

function validarNombreApellido(campo) {
    var valido = true;
    var regex = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]*$/; // Expresión regular para permitir solo letras, espacios y letras acentuadas

    if (campo.value.length < 3 || campo.value.length > 30 || !regex.test(campo.value)) {
        valido = false;
        alert("Por favor, ingrese un " + (campo.id === 'correo_electronico' ? "correo electrónico" : "nombre o apellido") + " válido en el campo " + campo.id);
    }

    if (valido) {
        campo.className = "form-control is-valid";
    } else {
        campo.className = "form-control is-invalid";
    }

    return valido;
}



function validarCelular(Numero) {

    let valor = Numero.value;
    let valido = true;
    if (valor.length < 10 || valor.length > 10) {
        valido = false
    }

    if (valido) {
        Numero.className = "form-control is-valid"
    }
    else {
        Numero.className = "form-control is-invalid"
    }
    return valido;
}

function consultarIdMedico() {
    $.ajax({
        url: url + id_medico,
        type: 'GET',
        success: function (result) {
            console.log(result);
            listarMedico();
        }

    });
}
function updateMedico(id_medico) {
    let formData = {
        "id_medico": document.getElementById('id_medico').value,
        "primer_nombre": document.getElementById('primer_nombre').value,
        "segundo_nombre": document.getElementById("segundo_nombre").value,
        "primer_apellido": document.getElementById('primer_apellido').value,
        "segundo_apellido": document.getElementById("segundo_apellido").value,
        "celular": document.getElementById("celular").value,
        "correo_electronico": document.getElementById("correo_electronico").value,
        "estado": document.getElementById("estado").value
    }

}

$(document).ready(function () {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var tabla = $('#cuerpoTablaMedico tbody');
            tabla.empty();

            $.each(data, function (index, item) {
                tabla.append('<tr id="dato' + item.id + '">' +
                    '<td>' + item.id_medico + '</td>' +
                    '<td>' + item.tipo_documento + '</td>' +
                    '<td>' + item.numero_documento + '</td>' +
                    '<td>' + item.primer_nombre + '</td>' +
                    '<td>' + item.segundo_nombre + '</td>' +
                    '<td>' + item.primer_apellido + '</td>' +
                    '<td>' + item.segundo_apellido + '</td>' +
                    '<td>' + item.celular + '</td>' +
                    '<td>' + item.correo + '</td>' +
                    '<td>' + item.estado + '</td>' +
                    '<td><button class="btn btn-success actualizar" data-id="' + item.id_medico + '">Editar</button><button id="' + item.id_medico + '" class="eliminar-dato btn btn-danger" data-id="' + item.id_medico + '">Eliminar</button></td>' +
                    '</tr>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus, errorThrown);
        }
    });
});
$(document).ready(function () {
    $("#cuerpoTablaMedico").on("click", ".eliminar-dato", function () {
        var id = $(this).data("id");
        $.ajax({
            url: url + "eliminarPermanente/" + id,
            method: "DELETE",
            data: { id: id },
            success: function (response) {
                $("#dato-" + id).remove();
                console.log("Dato eliminado correctamente");
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error("Error al eliminar el dato:", error);
            }
        });
    });
});

$(document).ready(function () {
    $("#cuerpoTablaMedico").on("click", ".actualizar", function () {
        var id = $(this).data("id");
        var url = "medicoactualizar.html?medico=" + encodeURIComponent(id);
        window.location.href = url;
    });
});

if (getParameterByName('medico') != null) {
    $(document).ready(function () {
        $.ajax({
            url: url + getParameterByName('medico'),
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                $('#resultado').text(response);
                document.getElementById('numero_documento').value = response.numero_documento;
                document.getElementById('primer_nombre').value = response.primer_nombre;
                document.getElementById('segundo_nombre').value = response.segundo_nombre;
                document.getElementById('primer_apellido').value = response.primer_apellido;
                document.getElementById('segundo_apellido').value = response.segundo_apellido;
                document.getElementById('celular').value = response.celular;
                document.getElementById('correo_electronico').value = response.correo;
                document.getElementById('estado').value = response.estado;
                document.getElementById('tipo_documento').value = response.tipo_documento;
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener el dato:", error);
            }
        });
    });
}
function actualizarMedico() {
    let tipo_documento = document.getElementById("tipo_documento").value;
    let numero_documento = document.getElementById("numero_documento").value;
    let primer_nombre = document.getElementById("primer_nombre").value;
    let segundo_nombre = document.getElementById("segundo_nombre").value;
    let primer_apellido = document.getElementById("primer_apellido").value;
    let segundo_apellido = document.getElementById("segundo_apellido").value;
    let correo_electronico = document.getElementById("correo_electronico").value;
    let celular = document.getElementById("celular").value;
    let estado = document.getElementById("estado").value;

    let formData = {

        "tipo_documento": tipo_documento,
        "numero_documento": numero_documento,
        "primer_nombre": primer_nombre,
        "segundo_nombre": segundo_nombre,
        "primer_apellido": primer_apellido,
        "segundo_apellido": segundo_apellido,
        "celular": celular,
        "correo": correo_electronico,
        "estado": estado
    };

    $.ajax({
        url: url + getParameterByName('medico'),
        method: 'PUT',
        data: formData,
        success: function (response) {
            console.log("Dato actualizado correctamente:", response);
            window.location.href = 'listamedico.html';
        },
        error: function (xhr, status, error) {
            console.error("Error al actualizar el dato:", error);
        }
    });
}



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function filtrarMedico() {
    var filtro = document.getElementById('filtroMedico').value;
    var urlFiltro = '';
    if (filtro == '') {
        urlFiltro = url;
    } else {
        urlFiltro = url + "busquedafiltro/" + filtro
    }
    $.ajax({
        url: urlFiltro,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var tabla = $('#cuerpoTablaMedico tbody');
            tabla.empty();

            $.each(data, function (index, item) {
                tabla.append('<tr id="dato' + item.id + '">' +
                    '<td>' + item.id_medico + '</td>' +
                    '<td>' + item.tipo_documento + '</td>' +
                    '<td>' + item.numero_documento + '</td>' +
                    '<td>' + item.primer_nombre + '</td>' +
                    '<td>' + item.segundo_nombre + '</td>' +
                    '<td>' + item.primer_apellido + '</td>' +
                    '<td>' + item.segundo_apellido + '</td>' +
                    '<td>' + item.celular + '</td>' +
                    '<td>' + item.correo + '</td>' +
                    '<td>' + item.estado + '</td>' +
                    '<td><button class="btn btn-success actualizar" data-id="' + item.id_medico + '">Editar</button><button id="' + item.id_medico + '" class="eliminar-dato btn btn-danger" data-id="' + item.id_medico + '">Eliminar</button></td>' +
                    '</tr>');
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus, errorThrown);
        }
    });
}