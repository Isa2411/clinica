package com.example.demo.interfaceService;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.IngresoDto;
import com.example.demo.model.ingreso;

public interface IingresoService {
	public String save (IngresoDto ingreso);
	public List<ingreso>findAll();
	public Optional<ingreso> findOne(String id_ingreso);
	public int delete(String id_ingreso);
	List<ingreso> filtroIngreso(String filtro);

	IngresoDto actualizarIngreso(String id, IngresoDto ingresoDto);

}
