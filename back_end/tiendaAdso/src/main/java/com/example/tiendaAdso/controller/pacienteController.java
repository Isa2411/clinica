package com.example.tiendaAdso.controller;

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


import com.example.tiendaAdso.interfacesService.IPacienteService;
import com.example.tiendaAdso.models.paciente;


@RequestMapping("/api/v1/clientes")
@RestController
@CrossOrigin
public class pacienteController {
		
		@Autowired
		private IPacienteService pacienteService;
		
		@PostMapping("/")
		public ResponseEntity<Object> save(@ModelAttribute("paciente")paciente paciente){pacienteService.save(paciente); return new ResponseEntity<>(paciente,HttpStatus.OK);
		}
			@GetMapping("/")
			public ResponseEntity<Object> findAll(){
				var ListaPaciente = pacienteService.findAll();
				return new ResponseEntity<>(ListaPaciente,HttpStatus.OK);
			}
			
			@GetMapping("/{id}")
			public ResponseEntity<Object> findOne(@PathVariable String id){
				var paciente = pacienteService.findOne(id);
						return new ResponseEntity<>(paciente,HttpStatus.OK);
			}

			
			@DeleteMapping("/{id}")
			public ResponseEntity<Object> delete(@PathVariable String id){
				 pacienteService.delete(id);
						return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
			}
			
			@PutMapping("/{id}")
			public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("paciente")paciente pacienteUpdate){
				var paciente = pacienteService.findOne(id).get();
				if (paciente!= null) {
					paciente.setDocumento_de_identidad(pacienteUpdate.getDocumento_de_identidad());
					paciente.setPrimer_nombre(pacienteUpdate.getPrimer_nombre());
					paciente.setSegundo_nombre(pacienteUpdate.getSegundo_nombre());
					paciente.setPrimer_apellido(pacienteUpdate.getPrimer_apellido());
					paciente.setSegundo_apellido(pacienteUpdate.getSegundo_apellido());
					paciente.setTelefono(pacienteUpdate.getTelefono());
					paciente.setCorreo(pacienteUpdate.getCorreo());
					paciente.setNombre_persona_contacto(pacienteUpdate.getNombre_persona_contacto());
					paciente.setTelefono_persona_contacto(pacienteUpdate.getTelefono_persona_contacto());
				pacienteService.save(paciente   );
				return new ResponseEntity<>(paciente, HttpStatus.OK);
				
				}
				else {
					return new ResponseEntity<>("Error cliente no encontrado",HttpStatus.BAD_REQUEST);
				}
					
				}

}
