package com.example.tiendaAdso.interfacesService;

import java.util.List;
import java.util.Optional;

import com.example.tiendaAdso.models.ingreso;

public interface IIngresoService {
	public String save(ingreso ingreso);
	public List<ingreso> findAll();
	public Optional<ingreso> findOne(String id);
	public int delete(String id);

}
