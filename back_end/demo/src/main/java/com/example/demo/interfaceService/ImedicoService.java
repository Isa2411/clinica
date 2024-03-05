package com.example.demo.interfaceService;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.medico;

public interface ImedicoService {
	public String save (medico medico);
	public List<medico>findAll();
	public List<medico> medicosActivos();
	public Optional<medico> findOne(String id_medico);
	public int delete(String id_medico);
	List<medico> filtroMedico(String filtro);
}
