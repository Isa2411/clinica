document.addEventListener('DOMContentLoaded', function() {
    const addAdmissionBtn = document.getElementById('addAdmissionBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const admissionForm = document.getElementById('admissionForm');
    const filterBtn = document.getElementById('filterBtn');
    const admissionTable = document.getElementById('admissionTable');
    const admissionList = document.getElementById('admissionList');
    let editRow = null; // Variable para almacenar la fila que se está editando
  
    addAdmissionBtn.addEventListener('click', function() {
      modal.style.display = 'block';
      admissionForm.reset();
      editRow = null; // Resetear la fila que se está editando al agregar un nuevo ingreso
    });
  
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  
    admissionForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(admissionForm);
      const patientName = formData.get('paciente');
  
      // Verificar si el paciente está activo
      if (!isPatientActive()) {
        alert("El paciente está deshabilitado. No se puede agregar un ingreso para este paciente.");
        return;
      }
  
      // Verificar si el paciente tiene otro ingreso activo
      if (hasActiveAdmissionForPatient(patientName)) {
        alert("El paciente ya tiene otro ingreso activo.");
        return;
      }
  
      // Verificar si hay dos pacientes en la misma cama
      const room = formData.get('habitacion');
      const bed = formData.get('cama');
      if (hasDuplicateBedAssignment(room, bed)) {
        alert("Ya hay otro paciente asignado a esta cama.");
        return;
      }
  
      if (editRow) {
        // Si se está editando una fila, actualizar en lugar de agregar una nueva
        updateRow(formData);
      } else {
        addRow(formData);
      }
      
      modal.style.display = 'none';
    });
  
    filterBtn.addEventListener('click', function() {
      admissionTable.classList.toggle('hidden');
      if (admissionTable.classList.contains('hidden')) {
        filterBtn.textContent = 'Lista de Ingresos';
      } else {
        filterBtn.textContent = 'Ocultar Lista';
      }
    });
  
    function addRow(formData) {
      const row = document.createElement('tr');
      const cells = [];
      for (let i = 0; i < 8; i++) {
        cells.push(document.createElement('td'));
      }
  
      cells[0].textContent = generateId(); // Generar ID para el ingreso
      cells[1].textContent = formData.get('habitacion');
      cells[2].textContent = formData.get('cama');
      cells[3].textContent = formData.get('paciente');
      cells[4].textContent = formData.get('medico');
      cells[5].textContent = formData.get('fechaIngreso');
      cells[6].textContent = formData.get('fechaSalida');
      cells[7].textContent = formData.get('estado');
  
      cells.forEach(cell => {
        row.appendChild(cell);
      });
  
      const actionsCell = document.createElement('td');
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.classList.add('edit', 'btn');
      const disableBtn = document.createElement('button');
      disableBtn.textContent = 'Eliminar';
      disableBtn.classList.add('disable', 'btn');
      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(disableBtn);
      row.appendChild(actionsCell);
  
      admissionList.appendChild(row);
  
      // Escuchar eventos para editar y deshabilitar
      editBtn.addEventListener('click', function() {
        editRow = row;
        editAdmission(row);
      });
  
      disableBtn.addEventListener('click', function() {
        deleteRow(row);
      });
    }
  
    function updateRow(formData) {
      editRow.cells[1].textContent = formData.get('habitacion');
      editRow.cells[2].textContent = formData.get('cama');
      editRow.cells[3].textContent = formData.get('paciente');
      editRow.cells[4].textContent = formData.get('medico');
      editRow.cells[5].textContent = formData.get('fechaIngreso');
      editRow.cells[6].textContent = formData.get('fechaSalida');
      editRow.cells[7].textContent = formData.get('estado');
      editRow = null;
    }
  
    function generateId() {
      // Generar un ID único para el ingreso (puede implementarse una lógica más robusta según necesidades)
      return Math.floor(Math.random() * 1000);
    }
  
    function isPatientActive() {
      // Implementación de lógica para verificar si el paciente está activo
      return true; // Simulamos que el paciente siempre está activo
    }
  
    function hasActiveAdmissionForPatient(patientName) {
      // Implementación de lógica para verificar si hay otro ingreso activo para el paciente
      return false; // Simulamos que no hay otro ingreso activo para el paciente
    }
  
    function hasDuplicateBedAssignment(room, bed) {
      // Implementación de lógica para verificar si hay dos pacientes en la misma cama
      return false; // Simulamos que no hay dos pacientes en la misma cama
    }
  
    function editAdmission(row) {
      // Llenar el formulario de edición con los datos de la fila seleccionada
      document.getElementById('habitacion').value = row.cells[1].textContent;
      document.getElementById('cama').value = row.cells[2].textContent;
      document.getElementById('paciente').value = row.cells[3].textContent;
      document.getElementById('medico').value = row.cells[4].textContent;
      document.getElementById('fechaIngreso').value = row.cells[5].textContent;
      document.getElementById('fechaSalida').value = row.cells[6].textContent;
      document.getElementById('estado').value = row.cells[7].textContent;
  
      // Mostrar el modal
      modal.style.display = 'block';
    }
  
    function deleteRow(row) {
      row.remove();
    }
  });
  