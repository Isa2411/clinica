package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.medico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.interfaceService.IpacienteService;
import com.example.demo.interfaces.Ipaciente;
import com.example.demo.model.paciente;

@Service
public class pacienteService implements IpacienteService {
	
	@Autowired
	private Ipaciente data;
	
	@Override
	public String save(paciente paciente) {
		data.save(paciente);
		return paciente.getId_paciente();
	}
	
	@Override
	public List<paciente> findAll() {
		List<paciente> listapaciente= (List<paciente>) data.findAll();
		return listapaciente;
	}

	@Override
	public List<paciente> pacientesActivos() {
		List<paciente> listaPacientesActivos = data.pacientesActivos("Habilitado");
		return listaPacientesActivos;
	}

	@Override
	public List<paciente> filtroPaciente(String filtro) {
		List<paciente>ListaPaciente=data.filtroPaciente(filtro);
		return ListaPaciente;
	}
	
	@Override
	public Optional<paciente> findOne(String id_paciente) {
		Optional<paciente> paciente=data.findById(id_paciente);
		return paciente;
	}
	
	@Override
	public int delete(String id_paciente) {
		data.deleteById(id_paciente);
		return 1;
	}

	public boolean existsByNumerodocumento(String numero_documento){
		List<paciente> existe = data.existsByNumeroDocumento(numero_documento);
		if (existe.isEmpty()){
			return false;
		}
		return true;
	}

}
