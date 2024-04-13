package com.example.demo.interfaceService;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.paciente;

public interface IpacienteService {
	public String save (paciente paciente);
	public List<paciente>findAll();
	public List<paciente> pacientesActivos();
	public Optional<paciente> findOne(String id_paciente);
	public int delete(String id_paciente);
	List<paciente> filtroPaciente(String filtro);
	boolean existsByNumerodocumento(String numero_documento);

}
