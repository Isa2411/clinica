document.addEventListener('DOMContentLoaded', function() {
  const addDoctorBtn = document.getElementById('addDoctorBtn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementsByClassName('close')[0];
  const doctorForm = document.getElementById('doctorForm');
  const filterBtn = document.getElementById('filterBtn');
  const doctorTable = document.getElementById('doctorTable');
  const doctorList = document.getElementById('doctorList');
  let idCounter = 1;

  addDoctorBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    doctorForm.reset();
  });

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  doctorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(doctorForm);
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = idCounter;
    row.appendChild(idCell);
    idCounter++;
    for (const [key, value] of formData.entries()) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    }
    
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
    doctorList.appendChild(row);
    modal.style.display = 'none';
  });

  filterBtn.addEventListener('click', function() {
    doctorTable.classList.toggle('hidden');
    if (filterBtn.textContent === 'Lista de Pacientes') {
      filterBtn.textContent = 'Ocultar Lista';
    } else {
      filterBtn.textContent = 'Lista de Pacientes';
    }
  });

  doctorList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
      const row = event.target.closest('tr');
      const cells = row.querySelectorAll('td');
      const formData = new FormData(doctorForm);
      cells.forEach((cell, index) => {
        if (index !== 0 && index !== cells.length - 1) {
          formData.set([...formData.keys()][index - 1], cell.textContent);
        }
      });
      modal.style.display = 'block';
      modal.querySelector('h2').textContent = 'Editar Paciente';
      modal.querySelector('input[type="submit"]').value = 'Actualizar';
      for (const [key, value] of formData.entries()) {
        const input = modal.querySelector(`#${key}`);
        if (input) {
          input.value = value;
        }
      }
      // Eliminar la fila después de editar
      row.remove();
    } else if (event.target.classList.contains('disable')) {
      const row = event.target.closest('tr');
      row.remove();
    }
  });
});
