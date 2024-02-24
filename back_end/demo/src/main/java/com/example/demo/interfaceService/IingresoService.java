package com.example.demo.interfaceService;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.ingreso;

public interface IingresoService {
	public String save (ingreso ingreso);
	public List<ingreso>findAll();
	public Optional<ingreso> findOne(String id_ingreso);
	public int delete(String id_ingreso);

}
