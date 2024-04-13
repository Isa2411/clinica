package com.example.demo.Controller;

import com.example.demo.model.IngresoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.interfaceService.IingresoService;
import com.example.demo.model.ingreso;

@RequestMapping("/api/v1/ingreso")
@RestController
@CrossOrigin
public class ingresoController {
	@Autowired
	private  IingresoService ingresoService;
	
	@PostMapping("/")
	public ResponseEntity<Object> save(
			@RequestBody IngresoDto ingreso
			){
		ingreso.validarAlCrear();
		ingresoService.save(ingreso);
		return new ResponseEntity<>(ingreso,HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var Listaingreso=ingresoService.findAll();
		return new ResponseEntity<>(Listaingreso, HttpStatus.OK);
	}
	
	@GetMapping("/busquedafiltro/{filtro}")
	public ResponseEntity<Object> findFiltro(@PathVariable String filtro){
		System.out.printf("filtro "+filtro);
		var ListaIngreso=ingresoService.filtroIngreso(filtro);
		return new ResponseEntity<>(ListaIngreso,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findOne(@PathVariable String id){
		var ingreso=ingresoService.findOne(id);
		return new ResponseEntity<>(ingreso,HttpStatus.OK);
	}
	
	@DeleteMapping("/eliminarPermanente/{id}")
	public ResponseEntity<Object> delete(@PathVariable String id){
		ingresoService.delete(id);
		return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> update(@PathVariable String id, @RequestBody IngresoDto ingreso){
		ingresoService.actualizarIngreso(id, ingreso);
		return new ResponseEntity<>(ingreso,HttpStatus.OK);
	}
}
