package com.example.tiendaAdso.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tiendaAdso.interfaces.IPaciente;
import com.example.tiendaAdso.interfacesService.IPacienteService;
import com.example.tiendaAdso.models.paciente;



@Service
public class pacienteService implements IPacienteService {
	@Autowired
	private IPaciente data;

	public String save(paciente paciente) {
		data.save(paciente);
		return paciente.getPaciente_id();
	}

	public List<paciente> findAll() {
		List<paciente> listapaciente=(List<paciente>) data.findAll();
		return listapaciente;
	}

	public Optional<paciente> findOne(String id) {
			Optional<paciente> paciente=data.findById(id);
		return paciente;
	}

	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}


}
