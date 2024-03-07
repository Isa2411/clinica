package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.interfaceService.IpacienteService;
import com.example.demo.model.paciente;


@RequestMapping("/api/v1/paciente")
@RestController
@CrossOrigin
public class pacienteController {
	@Autowired
	private IpacienteService pacienteService;
	
	@PostMapping("/")
	public ResponseEntity<Object> save(
			@RequestBody paciente paciente
			){
		paciente.crearPaciente();
		pacienteService.save(paciente);
		return new ResponseEntity<>(paciente,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var Listapaciente=pacienteService.findAll();
		return new ResponseEntity<>(Listapaciente, HttpStatus.OK);
	}

	@GetMapping("/pacientesactivos")
	public ResponseEntity<Object> pacientesActivos(){
		var listaPacientes=pacienteService.pacientesActivos();
		return new ResponseEntity<>(listaPacientes, HttpStatus.OK);
	}
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object> findFiltro(@PathVariable String filtro){
		var ListaPaciente=pacienteService.filtroPaciente(filtro);
		return new ResponseEntity<>(ListaPaciente, HttpStatus.OK);
	}
		
	@GetMapping("/{id}")
	public ResponseEntity<Object> findOne(@PathVariable String id){
		var paciente=pacienteService.findOne(id);
		return new ResponseEntity<>(paciente,HttpStatus.OK);
	}
	
	@DeleteMapping("/eliminarPermanente/{id}")
	public ResponseEntity<Object> delete(@PathVariable String id){
		pacienteService.delete(id);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> update(@PathVariable String id, @RequestBody paciente pacienteUpdate){
		var paciente = pacienteService.findOne(id).get();
		if (paciente != null) {
			paciente.setTipo_documento(pacienteUpdate.getTipo_documento());
			paciente.setNumero_documento(pacienteUpdate.getNumero_documento());
			paciente.setPrimer_nombre(pacienteUpdate.getPrimer_nombre());
			paciente.setSegundo_nombre(pacienteUpdate.getSegundo_nombre());
			paciente.setPrimer_apellido(pacienteUpdate.getPrimer_apellido());
			paciente.setSegundo_apellido(pacienteUpdate.getSegundo_apellido());
			paciente.setCelular(pacienteUpdate.getCelular());
			paciente.setCorreo(pacienteUpdate.getCorreo());
			paciente.setNombre_persona_contacto(pacienteUpdate.getNombre_persona_contacto());
			paciente.setCelular_persona_contacto(pacienteUpdate.getCelular_persona_contacto());
			paciente.setEstado(pacienteUpdate.getEstado());
			pacienteService.save(paciente);
			return new ResponseEntity<>(paciente, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>("Error paciente no encontrado",HttpStatus.BAD_REQUEST);
		}
	}

}
