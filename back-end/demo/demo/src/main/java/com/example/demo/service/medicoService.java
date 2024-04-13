package com.example.demo.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.interfaceService.ImedicoService;
import com.example.demo.interfaces.Imedico;
import com.example.demo.model.medico;

@Service
public class medicoService implements ImedicoService {
	
	@Autowired
	private Imedico data;
	
	@Override
	public String save(medico medico) {
		data.save(medico);
		return medico.getId_medico();
	}
	
	@Override
	public List<medico> findAll() {
		List<medico> listamedico= (List<medico>) data.findAll();
		return listamedico;
	}

	@Override
	public List<medico> medicosActivos() {
		List<medico> listaMedicosActivos = data.medicosActivos("Habilitado");
		return listaMedicosActivos;
	}

	@Override
	public List<medico> filtroMedico(String filtro){
		List<medico>ListaMedico=data.filtroMedico(filtro);
		return ListaMedico;
	}
	
	@Override
	public Optional<medico> findOne(String id_medico) {
		Optional<medico> medico=data.findById(id_medico);
		return medico;
	}
	
	@Override
	public int delete(String id_medico) {
		data.deleteById(id_medico);
		return 1;
		}

	@Override
	public boolean existsByNumerodocumento(String numero_documento) {
		List<medico> existe = data.existsByNumeroDocumento(numero_documento);
		if (existe.isEmpty()){
			return false;
		}
		return true;
	}
}
