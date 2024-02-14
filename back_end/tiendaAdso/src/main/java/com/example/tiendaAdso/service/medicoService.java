package com.example.tiendaAdso.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tiendaAdso.interfaces.IMedico;
import com.example.tiendaAdso.interfacesService.IMedicoService;
import com.example.tiendaAdso.models.medico;



@Service
	public class medicoService implements IMedicoService {
	@Autowired
	private IMedico data;

	public String save(medico medico) {
		data.save(medico);
		return medico.getMedico_id();
	}

	public List<medico> findAll() {
		List<medico> listamedico=(List<medico>) data.findAll();
		return listamedico;
	}

	public Optional<medico> findOne(String id) {
			Optional<medico> medico=data.findById(id);
		return medico;
	}

	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}
	}


