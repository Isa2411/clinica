package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.interfaceService.IingresoService;
import com.example.demo.interfaces.Iingreso;
import com.example.demo.model.ingreso;

@Service
public class ingresoService implements IingresoService {
	@Autowired
	private Iingreso data;
	
	@Override
	public String save (ingreso ingreso) {
		data.save (ingreso);
		return ingreso.getId_ingreso();
	}
	
	@Override
	public List<ingreso> findAll() {
		List<ingreso> listaingreso= (List<ingreso>) data.findAll();
		return listaingreso;
	}
	
	@Override
	public Optional<ingreso> findOne(String id_ingreso) {
		Optional<ingreso> ingreso=data.findById(id_ingreso);
		return ingreso;
	}
	
	@Override
	public int delete(String id_ingreso) {
		data.deleteById(id_ingreso);
		return 1;
	}

}
