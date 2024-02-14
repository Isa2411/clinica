package com.example.tiendaAdso.interfacesService;

import java.util.List;
import java.util.Optional;

import com.example.tiendaAdso.models.medico;

public interface IMedicoService {
	
	public String save(medico medico);
	public List<medico> findAll();
	public Optional<medico> findOne(String id);
	public int delete(String id);

}
