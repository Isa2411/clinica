package com.example.tiendaAdso.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.tiendaAdso.interfaces.IIngreso;
import com.example.tiendaAdso.models.ingreso;

@Service
public class ingresoService {
	@Autowired
	private IIngreso data;

	public String save(ingreso ingreso) {
		data.save(ingreso);
		return ingreso.getIngreso_id();
	}

	public List<ingreso> findAll() {
		List<ingreso> listaIngreso=(List<ingreso>) data.findAll();
		return listaIngreso;
	}

	public Optional<ingreso> findOne(String id) {
			Optional<ingreso> ingreso=data.findById(id);
		return ingreso;
	}

	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}


}
