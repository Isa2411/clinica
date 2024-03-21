//se almacena la url de la api
let url = "http://localhost:8081/api/v1/ingreso/";
function listarIngreso() {
  $.ajax({
    url: url,
    type: "GET",
    success: function (result) {
      //success: funcion que se ejecuta cuando la peticion tiene exito
      console.log(result);
      let curpoTablaIngreso = document.getElementById("curpoTablaIngreso");
      curpoTablaIngreso.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        //se crea una etiqueta tr por cada registro
        let trRegistro = document.createElement("tr"); //fila por cada registro de la tabla
        let celdaId = document.createElement("td");
        let celdaHabitacion = document.createElement("td");
        let celdaCama = document.createElement("td");
        let celdaFechaIngreso = document.createElement("td");
        let celdaFechaSalida = document.createElement("td");
        let celdaIdMedico = document.createElement("td");
        let celdaIdPaciente = document.createElement("td");
        let celdaEstado = document.createElement("td");
        let celdaEditar = document.createElement("td");

        //almacenamos en valor

        celdaId.innerText = result[i]["id_ingreso"];
        celdaHabitacion.innerText = result[i]["habitacion"];
        celdaCama.innerText = result[i]["cama"];
        celdaFechaIngreso.innerText = result[i]["fecha_ingreso"];
        celdaFechaSalida.innerText = result[i]["fecha_salida"];
        celdaIdMedico.innerText = nombre_completo_medico =
          result[i]["medico"]["Primer_nombre"] +
          " " +
          result[i]["medico"]["Segundo_nombre"] +
          " " +
          result[i]["medico"]["Primer_apellido"] +
          " " +
          result[i]["medico"]["Segundo_apellido"];

        celdaIdPaciente.innerText = nombre_completo =
          result[i]["paciente"]["Primer_nombre"] +
          " " +
          result[i]["paciente"]["Segundo_nombre"] +
          " " +
          result[i]["paciente"]["Primer_apellido"] +
          " " +
          result[i]["paciente"]["Segundo_apellido"];
        celdaEstado.innerText = result[i]["Estado"];
        celdaEditar.innerHTML =
          "<button onclick='editarIngreso(" +
          result[i]["id_ingreso"] +
          ")' class='btn btn-primary'>Editar</button>";

        //agregando a los td a su respectivo th y agregandolos a la fila

        trRegistro.appendChild(celdaId);
        trRegistro.appendChild(celdaHabitacion);
        trRegistro.appendChild(celdaCama);
        trRegistro.appendChild(celdaFechaIngreso);
        trRegistro.appendChild(celdaFechaSalida);
        trRegistro.appendChild(celdaIdMedico);
        trRegistro.appendChild(celdaIdPaciente);
        trRegistro.appendChild(celdaEstado);
        trRegistro.appendChild(celdaEditar);

        curpoTablaIngreso.appendChild(trRegistro); //se traen todos los registros
      }
    },
    error: function (error) {
      alert("Error en la peticion ${error}");
    },
  });
}


function registrarIngreso() {
  let habitacion = document.getElementById("habitacion").value;
  let cama = document.getElementById("cama").value;
  let fecha_ingreso = document.getElementById("fecha_ingreso").value;
  let fecha_salida = document.getElementById("fecha_salida").value;
  let medico = document.getElementById("medico").value;
  let paciente = document.getElementById("paciente").value;
  let estado = document.getElementById("estado").value;

  // Convertir las fechas en objetos Date
  let fechaIngreso = new Date(fecha_ingreso);
  let fechaSalida = new Date(fecha_salida);

  // Verificar si la fecha de salida es anterior a la fecha de ingreso
  if (fechaSalida < fechaIngreso) {
    // Mostrar una alerta de error
    alert("La fecha de salida no puede ser anterior a la fecha de ingreso");
    return; // Detener el proceso de registro
  }

  // Continuar con el proceso de registro si la validación pasa
  let formData = {
    habitacion: habitacion,
    cama: cama,
    fecha_ingreso: fecha_ingreso,
    fecha_salida: fecha_salida,
    medico: medico,
    paciente: paciente,
    estado: estado,
  };

  if (validarCampos()) {
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      success: function (result) {
        console.log(result);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha registrado correctamente!",
          showConfirmButton: false,
          timer: 1500
        });

        window.location.href = "listaingreso.html";
      },
      error: function (error) {
        // alert("error al guardar".error);
        Swal.fire("Error", "Error al guardar", "error");
      },
    });
  } else {
    Swal.fire("Error", "Faltan campos por llenar!", "error");
  }
}




function validarCampos() {
  let habitacion = document.getElementById("habitacion");
  return validarNumeroHabitacion(habitacion);
}
function validarNumeroHabitacion(cuadroNumero) {

  let valor = cuadroNumero.value;
  let valido = true;
  if (valor.length < 1 || valor.length > 4) {
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
function CargarFormulario() {
  cargarMedico();
  cargarPaciente();
}

function cargarMedico() {
  let urlMedico = "http://localhost:8081/api/v1/medico/medicosactivos";

  $.ajax({
    url: urlMedico,
    type: "GET",
    success: function (result) {
      let medico = document.getElementById("medico");
      medico.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        let nombreMedico = document.createElement("option");
        nombreMedico.value = result[i]["id_medico"];
        nombreMedico.innerText = nombre_completo_medico =
          result[i]["primer_nombre"] +
          " " +
          result[i]["segundo_nombre"] +
          " " +
          result[i]["primer_apellido"] +
          " " +
          result[i]["segundo_apellido"];
        medico.appendChild(nombreMedico);
      }
    },
  });
}

$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8081/api/v1/medico/medicosactivos",
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      $.each(response, function (index, medico) {
        $('#medicos').append($('<option>', {
          value: medico.id_medico,
          text: medico.primer_nombre + " " + medico.primer_apellido
        }));
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener las opciones:", error);
    }
  });
});

$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8081/api/v1/paciente/pacientesactivos",
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      $.each(response, function (index, medico) {
        $('#pacientes').append($('<option>', {
          value: medico.id_paciente,
          text: medico.primer_nombre + " " + medico.primer_apellido
        }));
      });
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener las opciones:", error);
    }
  });
});

function cargarPaciente() {
  let urlpaciente = "http://localhost:8081/api/v1/paciente/";

  $.ajax({
    url: urlpaciente,
    type: "GET",
    success: function (result) {
      let paciente = document.getElementById("paciente");
      paciente.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        let nombrepaciente = document.createElement("option");
        nombrepaciente.value = result[i]["id_paciente"];
        nombrepaciente.innerText = nombre_completo_paciente =
          result[i]["primer_nombre"] +
          " " +
          result[i]["segundo_nombre"] +
          " " +
          result[i]["primer_apellido"] +
          " " +
          result[i]["segundo_apellido"];
        paciente.appendChild(nombrepaciente);
      }
    },
  });
}

function registrarIngreso() {
  let habitacion = document.getElementById("habitacion").value;
  let cama = document.getElementById("cama").value;
  let pacientes = document.getElementById("pacientes").value;
  let medicos = document.getElementById("medicos").value;
  let fechaingreso = document.getElementById("fechaingreso").value;
  let fechasalida = document.getElementById("fechasalida").value;
  let estado = document.getElementById("estado").value;

  let formData = {

    "paciente": pacientes,
    "medico": medicos,
    "habitacion": habitacion,
    "cama": cama,
    "fecha_ingreso": fechaingreso,
    "fecha_salida": fechasalida,
    "estado": estado,
  };
  var jsonData = JSON.stringify(formData);
  if (validarCamposAGuardar()) {

    $.ajax({
      url: url,
      type: "POST",
      data: jsonData,
      contentType: 'application/json',
      success: function (reslt) {
        Swal.fire({
          title: "Excelente",
          text: "Su registro se guardó correctamente",
          icon: "success"
        });
        //Se coloca el enlace del pacienteRegistro
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
      title: "Error!",
      text: "complete los campos correctamente",
      icon: "error"
    });
  }

}

function validarCamposAGuardar() {
  return validarNull(document.getElementById("habitacion"))
    && validarNull(document.getElementById("cama"))
    && validarNull(document.getElementById("pacientes"))
    && validarNull(document.getElementById("medicos"))
    && validarNull(document.getElementById("fechaingreso"))
    && validarNull(document.getElementById("fechasalida"))
    && validarNull(document.getElementById("estado"))
}

function validarNull(dato) {

  let valor = dato.value;
  let valido = true;
  if (valor.length > 0) {
    valido = true
  } else {
    valido = false;
  }

  if (valido) {
    dato.className = "form-control is-valid"
  }
  else {
    dato.className = "form-control is-invalid"
  }
  return valido;
}

$(document).ready(function () {
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var tabla = $('#cuerpoTablaingreso tbody');
      tabla.empty();

      $.each(data, function (index, item) {
        tabla.append('<tr id="dato' + item.id + '">' +
          '<td>' + item.id_ingreso + '</td>' +
          '<td>' + item.habitacion + '</td>' +
          '<td>' + item.cama + '</td>' +
          '<td>' + item.fecha_ingreso + '</td>' +
          '<td>' + item.fecha_salida + '</td>' +
          '<td>' + item.medico.primer_nombre + '</td>' +
          '<td>' + item.paciente.primer_nombre + '</td>' +
          '<td>' + item.estado + '</td>' +
          '<td><button class="btn btn-success actualizar" data-id="' + item.id_ingreso + '">Editar</button><button id="' + item.id_ingreso + '" class="eliminar-dato btn btn-danger" data-id="' + item.id_ingreso + '">Eliminar</button></td>' +
          '</tr>');
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + textStatus, errorThrown);
    }
  });
});

$(document).ready(function () {
  $("#cuerpoTablaingreso").on("click", ".eliminar-dato", function () {
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
  $("#cuerpoTablaingreso").on("click", ".actualizar", function () {
    var id = $(this).data("id");
    var url = "ingresoeditar.html?ingreso=" + encodeURIComponent(id);
    window.location.href = url;
  });
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (getParameterByName('ingreso') != null) {

  $(document).ready(function () {
    $.ajax({
      url: url + getParameterByName('ingreso'),
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        $('#resultado').text(response);
        document.getElementById('habitacion').value = response.habitacion;
        document.getElementById('cama').value = response.cama;
        document.getElementById('pacientes').value = response.paciente.id_paciente;
        document.getElementById('pacientes').disabled = true;
        document.getElementById('medicos').value = response.medico.id_medico;
        document.getElementById('fechaingreso').value = response.fecha_ingreso;
        document.getElementById('fechasalida').value = response.fecha_salida;
        document.getElementById('estado').value = response.estado;
      },
      error: function (xhr, status, error) {
        console.error("Error al obtener el dato:", error);
      }
    });
  });
}

function actualizarIngreso() {
  let habitacion = document.getElementById("habitacion").value;
  let cama = document.getElementById("cama").value;
  let pacientes = document.getElementById("pacientes").value;
  let medicos = document.getElementById("medicos").value;
  let fechaingreso = document.getElementById("fechaingreso").value;
  let fechasalida = document.getElementById("fechasalida").value;
  let estado = document.getElementById("estado").value;

  let formData = {
    "id": getParameterByName('ingreso'),
    "paciente": pacientes,
    "medico": medicos,
    "habitacion": habitacion,
    "cama": cama,
    "fecha_ingreso": fechaingreso,
    "fecha_salida": fechasalida,
    "estado": estado,
  };
  var jsonData = JSON.stringify(formData);
  console.log("JSON", jsonData)

  if (validarCamposAGuardar()) {

    $.ajax({
      url: url + getParameterByName('ingreso'),
      type: "PUT",
      data: jsonData,
      contentType: 'application/json',
      success: function (reslt) {
        window.location.href = 'listaingreso.html';
        //Se coloca el enlace de listapaciente: 
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
      title: "Error!",
      text: "complete los campos correctamente",
      icon: "error"
    });
  }
}

function filtrarIngreso() {
  var filtro = document.getElementById('filtroIngreso').value;
  var urlFiltro = '';
  if (filtro == '') {
    urlFiltro = url;
  } else {
    urlFiltro = url + "busquedafiltro/" + filtro
  }
  $(document).ready(function () {
    $.ajax({
      url: urlFiltro,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        var tabla = $('#cuerpoTablaingreso tbody');
        tabla.empty();

        $.each(data, function (index, item) {
          tabla.append('<tr id="dato' + item.id + '">' +
            '<td>' + item.id_ingreso + '</td>' +
            '<td>' + item.habitacion + '</td>' +
            '<td>' + item.cama + '</td>' +
            '<td>' + item.fecha_ingreso + '</td>' +
            '<td>' + item.fecha_salida + '</td>' +
            '<td>' + item.medico.primer_nombre + '</td>' +
            '<td>' + item.paciente.primer_nombre + '</td>' +
            '<td>' + item.estado + '</td>' +
            '<td><button class="btn btn-success actualizar" data-id="' + item.id_ingreso + '">editar</button><button id="' + item.id_ingreso + '" class="eliminar-dato btn btn-danger" data-id="' + item.id_ingreso + '">eliminar</button></td>' +
            '</tr>');
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('Error: ' + textStatus, errorThrown);
      }
    });
  });
}