package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
			@ModelAttribute("paciente") paciente paciente
			){
		pacienteService.save(paciente);
		return new ResponseEntity<>(paciente,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var Listapaciente=pacienteService.findAll();
		return new ResponseEntity<>(Listapaciente, HttpStatus.OK);
	}
	
	@GetMapping("/{id_paciente}")
	public ResponseEntity<Object> findOne(@PathVariable String id_paciente){
		var paciente=pacienteService.findOne(id_paciente);
		return new ResponseEntity<>(paciente,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id_paciente}")
	public ResponseEntity<Object> delete(@PathVariable String id_paciente){
		pacienteService.delete(id_paciente);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	@PutMapping("/{id_paciente}")
	public ResponseEntity<Object> update(@PathVariable String id_paciente, @ModelAttribute("paciente")paciente pacienteUpdate){
		var paciente = pacienteService.findOne(id_paciente).get();
		if (paciente != null) {
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
			return new ResponseEntity<>("Error ingreso no encontrado",HttpStatus.BAD_REQUEST);
		}
	}

}
