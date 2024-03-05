//se almacena la url de la api
let url = "http://localhost:8081/api/v1/paciente/";
function listarPaciente() {
  $.ajax({
    url: url,
    type: "GET",
    success: function (result) {//success: funcion que se ejecuta cuando la peticion tiene exito
      console.log(result);
      let cuerpoTablaPaciente = document.getElementById("cuerpoTablaPaciente");
      cuerpoTablaPaciente.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        //se crea una etiqueta tr por cada registro
        let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
        let celdaId = document.createElement("td");
        let celdaTipoDocumento = document.createElement("td");
        let celdaNumeroDocumento = document.createElement("td");
        let celdaPrimerNombre = document.createElement("td");
        let celdaSegundoNombre = document.createElement("td");
        let celdaPrimerApellido = document.createElement("td");
        let celdaSegundoApellido = document.createElement("td");
        let celdacelular = document.createElement("td");
        let celdaCorreo = document.createElement("td");
        let celdaNombrePersonaContacto = document.createElement("td");
        let celdaCelularPersonaContacto = document.createElement("td");
        let celdaEstado = document.createElement("td");
        let celdaEditar = document.createElement("td");

        //almacenamos en valor

        celdaId.innerText = result[i]["id_paciente"];
        celdaTipoDocumento.innerText = result[i]["tipo_documento"];
        celdaNumeroDocumento.innerText = result[i]["numero_documento"];
        celdaPrimerNombre.innerText = result[i]["primer_nombre"];
        celdaSegundoNombre.innerText = result[i]["segundo_nombre"];
        celdaPrimerApellido.innerText = result[i]["primer_apellido"];
        celdaSegundoApellido.innerText = result[i]["segundo_apellido"];
        celdacelular.innerText = result[i]["celular"];
        celdaCorreo.innerText = result[i]["correo_electronico"];
        celdaNombrePersonaContacto.innerText = result[i]["nombrePersonaContacto"];
        celdaCelularPersonaContacto.innerText = result[i]["celularPersonaContacto"];
        celdaEstado.innerText = result[i]["estado"];

        let buttonHTML = "<button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Editar</buttonco>";
        let button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        button.setAttribute('id', result[i]["id_paciente"]);
        button.innerText = 'Editar';
        celdaEditar.appendChild(button);


        //agregando a los td a su respectivo th y agregandolos a la fila

        trRegistro.appendChild(celdaId);
        trRegistro.appendChild(celdaTipoDocumento);
        trRegistro.appendChild(celdaNumeroDocumento);
        trRegistro.appendChild(celdaPrimerNombre);
        trRegistro.appendChild(celdaSegundoNombre);
        trRegistro.appendChild(celdaPrimerApellido);
        trRegistro.appendChild(celdaSegundoApellido);
        trRegistro.appendChild(celdacelular);
        trRegistro.appendChild(celdaCorreo);
        trRegistro.appendChild(celdaNombrePersonaContacto);
        trRegistro.appendChild(celdaCelularPersonaContacto);
        trRegistro.appendChild(celdaEstado);
        trRegistro.appendChild(celdaEditar);

        cuerpoTablaPaciente.appendChild(trRegistro);//se traen todos los registros

      }
    },
    error: function (error) {
      alert("Error en la peticion ${error}");
    }
  })
}
//que es Cors
function registrarPaciente() {

  let tipo_documento = document.getElementById("tipo_documento").value;
  let numero_documento = document.getElementById("numero_documento").value;
  let primer_nombre = document.getElementById("primer_nombre").value;
  let segundo_nombre = document.getElementById("segundo_nombre").value;
  let primer_apellido = document.getElementById("primer_apellido").value;
  let segundo_apellido = document.getElementById("segundo_apellido").value;
  let correo_electronico = document.getElementById("correo_electronico").value;
  let celular = document.getElementById("celular").value;
  let nombrePersonaContacto = document.getElementById("nombrePersonaContacto").value;
  let celularPersonaContacto = document.getElementById("celularPersonaContacto").value;
  let estado = document.getElementById("estado").value;


  let formData = {
    "tipo_documento": tipo_documento,
    "numero_documento": numero_documento,
    "primer_nombre": primer_nombre,
    "segundo_nombre": segundo_nombre,
    "primer_apellido": primer_apellido,
    "segundo_apellido": segundo_apellido,
    "correo": correo_electronico,
    "celular": celular,
    "nombre_persona_contacto": nombrePersonaContacto,
    "celular_persona_contacto": celularPersonaContacto,
    "estado": estado
  };
  var jsonData = JSON.stringify(formData);
  console.log("JSON", jsonData)

  if (validarCampos()) {

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

function validarCampos() {
  var numero_documento = document.getElementById("numero_documento");
  var primer_nombre = document.getElementById("primer_nombre");
  var primer_apellido = document.getElementById("primer_apellido");
  var celular = document.getElementById("celular");
  var nombrePersonaContacto = document.getElementById("nombrePersonaContacto");
  var celularPersonaContacto = document.getElementById("celularPersonaContacto");
  return validarNumeroIdentificacion(numero_documento) && validarNombreApellido(primer_nombre)
    && validarNombreApellido(primer_apellido) && validarCelular(celular) && validarAcudiente(nombrePersonaContacto) && validarCelular(celularPersonaContacto);
}

function validarNumeroIdentificacion(cuadroNumero) {
  var valor = cuadroNumero.value;
  var valido = true;
  if (valor.length < 5 || valor.length > 11) {
    valido = false
  }
  if (valido) {
    //cuadro de texto cumple
    //se modifica la clase del cuadro de textp
    cuadroNumero.className = "form-control is-valid";
  } else {
    //cuadro de texto no cumple 
    cuadroNumero.className = "form-control is-invalid";
  }
  return valido;
}

function validarNombreApellido(campo) {
  var value = campo.value;
  var valido = true;
  if (value.length < 3 || value.length > 30) {
    valido = false;
  }

  if (valido) {
    campo.className = "form-control is-valid"
  }
  else {
    campo.className = "form-control is-invalid"
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


function validarAcudiente(Acudiente) {
  let valor = Acudiente.value;
  let valido = true;
  if (valor.length < 3 || valor.length > 100) {
    valido = false
  }
  if (valido) {
    Acudiente.className = "form-control is-valid"
  }
  else {
    Acudiente.className = "form-control is-invalid"
  }
  return valido;
}

$(document).ready(function(){
  $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
          var tabla = $('#cuerpoTablaPaciente tbody');
          tabla.empty(); 

          $.each(data, function(index, item) {
              tabla.append('<tr id="dato'+item.id+'">' +
                              '<td>' + item.id_paciente + '</td>' +
                              '<td>' + item.tipo_documento + '</td>' +
                              '<td>' + item.numero_documento + '</td>' +
                              '<td>' + item.primer_nombre + '</td>' +
                              '<td>' + item.segundo_nombre + '</td>' +
                              '<td>' + item.primer_apellido + '</td>' +
                              '<td>' + item.segundo_apellido + '</td>' +
                              '<td>' + item.celular + '</td>' +
                              '<td>' + item.correo + '</td>' +
                              '<td>' + item.nombre_persona_contacto + '</td>' +
                              '<td>' + item.celular_persona_contacto + '</td>' +
                              '<td>' + item.estado + '</td>' +
                              '<td><button class="btn btn-success actualizar" data-id="'+item.id_paciente+'">editar</button><button id="'+item.id_paciente+'" class="eliminar-dato btn btn-danger" data-id="'+item.id_paciente+'">eliminar</button></td>' +
                           '</tr>');
          });
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log('Error: ' + textStatus, errorThrown);
      }
  });
});

$(document).ready(function(){
  $("#cuerpoTablaPaciente").on("click", ".eliminar-dato", function(){
      var id = $(this).data("id");
      $.ajax({
          url: url+"eliminarPermanente/"+id,
          method: "DELETE",
          data: {id: id},
          success: function(response){
              $("#dato-" + id).remove();
              console.log("Dato eliminado correctamente");
              location.reload();
          },
          error: function(xhr, status, error){
              console.error("Error al eliminar el dato:", error);
          }
      });
  });
});

$(document).ready(function(){
  $("#cuerpoTablaPaciente").on("click", ".actualizar", function(){
      var id = $(this).data("id");
      var url = "pacienteactualizar.html?paciente=" + encodeURIComponent(id);
      window.location.href = url;
  });
});

if(getParameterByName('paciente') != null){
  
  $(document).ready(function(){
      $.ajax({
          url: url+getParameterByName('paciente'), 
          method: 'GET',
          dataType: 'json', 
          success: function(response) {
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
              document.getElementById('nombrePersonaContacto').value = response.nombre_persona_contacto;
              document.getElementById('celularPersonaContacto').value = response.celular_persona_contacto;
          },
          error: function(xhr, status, error) {
              console.error("Error al obtener el dato:", error);
          }
      });
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

function actualizarPaciente(){
  let tipo_documento = document.getElementById("tipo_documento").value;
  let numero_documento = document.getElementById("numero_documento").value;
  let primer_nombre = document.getElementById("primer_nombre").value;
  let segundo_nombre = document.getElementById("segundo_nombre").value;
  let primer_apellido = document.getElementById("primer_apellido").value;
  let segundo_apellido = document.getElementById("segundo_apellido").value;
  let correo_electronico = document.getElementById("correo_electronico").value;
  let celular = document.getElementById("celular").value;
  let nombrePersonaContacto = document.getElementById("nombrePersonaContacto").value;
  let celularPersonaContacto = document.getElementById("celularPersonaContacto").value;
  let estado = document.getElementById("estado").value;


  let formData = {
    "tipo_documento": tipo_documento,
    "numero_documento": numero_documento,
    "primer_nombre": primer_nombre,
    "segundo_nombre": segundo_nombre,
    "primer_apellido": primer_apellido,
    "segundo_apellido": segundo_apellido,
    "correo": correo_electronico,
    "celular": celular,
    "nombre_persona_contacto": nombrePersonaContacto,
    "celular_persona_contacto": celularPersonaContacto,
    "estado": estado
  };
  var jsonData = JSON.stringify(formData);
  console.log("JSON", jsonData)

  if (validarCampos()) {

    $.ajax({
      url: url+getParameterByName('paciente'),
      type: "PUT",
      data: jsonData,
      contentType: 'application/json',
      success: function (reslt) {
        window.location.href = 'listapaciente.html';
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

function filtrarPaciente(){
  var filtro = document.getElementById('filtroPaciente').value;
  console.log("FILTRO ",filtro)
  var urlFiltro = '';
  if(filtro == ''){
      urlFiltro = url;
  }else{
      urlFiltro = url+"busquedafiltro/"+filtro
  }
  $(document).ready(function(){
    $.ajax({
        url: urlFiltro,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var tabla = $('#cuerpoTablaPaciente tbody');
            tabla.empty(); 
  
            $.each(data, function(index, item) {
                tabla.append('<tr id="dato'+item.id+'">' +
                                '<td>' + item.id_paciente + '</td>' +
                                '<td>' + item.tipo_documento + '</td>' +
                                '<td>' + item.numero_documento + '</td>' +
                                '<td>' + item.primer_nombre + '</td>' +
                                '<td>' + item.segundo_nombre + '</td>' +
                                '<td>' + item.primer_apellido + '</td>' +
                                '<td>' + item.segundo_apellido + '</td>' +
                                '<td>' + item.celular + '</td>' +
                                '<td>' + item.correo + '</td>' +
                                '<td>' + item.nombre_persona_contacto + '</td>' +
                                '<td>' + item.celular_persona_contacto + '</td>' +
                                '<td>' + item.estado + '</td>' +
                                '<td><button class="btn btn-success actualizar" data-id="'+item.id_paciente+'">editar</button><button id="'+item.id_paciente+'" class="eliminar-dato btn btn-danger" data-id="'+item.id_paciente+'">eliminar</button></td>' +
                             '</tr>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus, errorThrown);
        }
    });
  });
}