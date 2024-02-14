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


import com.example.tiendaAdso.interfacesService.IIngresoService;
import com.example.tiendaAdso.models.ingreso;



@RequestMapping("/api/v1/ingreso")
@RestController
@CrossOrigin
public class ingresoController {
	@Autowired
	private IIngresoService ingresoService;
	
	@PostMapping("/")
	public ResponseEntity<Object> save(@ModelAttribute("ingreso")ingreso ingreso){ingresoService.save(ingreso); return new ResponseEntity<>(ingreso,HttpStatus.OK);
	}
		@GetMapping("/")
		public ResponseEntity<Object> findAll(){
			var ListaIngreso = ingresoService.findAll();
			return new ResponseEntity<>(ListaIngreso,HttpStatus.OK);
		}
		//@@PathVariable recibe una variable por el enlace
		@GetMapping("/{id}")
		public ResponseEntity<Object> findOne(@PathVariable String id){
			var ingreso = ingresoService.findOne(id);
					return new ResponseEntity<>(ingreso,HttpStatus.OK);
		}

		
		@DeleteMapping("/{id}")
		public ResponseEntity<Object> delete(@PathVariable String id){
			 ingresoService.delete(id);
					return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("ingreso")ingreso ingresoUpdate){
			var ingreso = ingresoService.findOne(id).get();
			if (ingreso != null) {
				ingreso.setHabitacion(ingresoUpdate.getHabitacion());
				ingreso.setCama(ingresoUpdate.getCama());
				ingreso.setPaciente(ingresoUpdate.getPaciente());
				ingreso.setMedico(ingresoUpdate.getMedico());
				ingreso.setFecha_de_ingreso(ingresoUpdate.getFecha_de_ingreso());
				ingreso.setFecha_de_salida(ingresoUpdate.getFecha_de_salida());
				ingreso.setEstado(ingresoUpdate.getEstado());
				
			ingresoService.save(ingreso);
			return new ResponseEntity<>(ingreso, HttpStatus.OK);
			
			}
			else {
				return new ResponseEntity<>("Error cliente no encontrado",HttpStatus.BAD_REQUEST);
			}
				
			}
			

}
