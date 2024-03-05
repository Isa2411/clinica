package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.exepcion.ErrorExcepcion;
import com.example.demo.interfaces.Imedico;
import com.example.demo.interfaces.Ipaciente;
import com.example.demo.model.IngresoDto;
import com.example.demo.model.medico;
import com.example.demo.model.paciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.interfaceService.IingresoService;
import com.example.demo.interfaces.Iingreso;
import com.example.demo.model.ingreso;

@Service
public class ingresoService implements IingresoService {
	@Autowired
	private Iingreso data;
	@Autowired
	private Ipaciente ipaciente;
	@Autowired
	private Imedico imedico;

	@Override
	public String save (IngresoDto ingreso) {
		List<ingreso> existePaciente = data.ingresosActivosPacientes(ingreso.getPaciente(), "Ingreso");
		if (existePaciente.isEmpty()){
			Optional<ingreso> pacienteCamas = data.validarPacientesCama(ingreso.getHabitacion(), ingreso.getCama(), "Ingreso");
			if (pacienteCamas.isEmpty()){
				Optional<paciente> optionalPaciente = ipaciente.findById(ingreso.getPaciente());
				Optional<medico> optionalMedico = imedico.findById(ingreso.getMedico());
				ingreso ingresoGuardar = new ingreso(null,
						obtenerPaciente(optionalPaciente),
						obtenerMedico(optionalMedico),
						ingreso.getHabitacion(),
						ingreso.getCama(),
						ingreso.getFecha_ingreso(),
						ingreso.getFecha_salida(),
						ingreso.getEstado());
				data.save (ingresoGuardar);
				return "guardado";
			}
			throw new ErrorExcepcion("La cama se encuentra ocupada");

		}else{
			throw new ErrorExcepcion("El paciente tiene un ingreso activo");
		}
	}

	private medico obtenerMedico(Optional<medico> medico){
		return new medico(medico.get().getId_medico(),
				medico.get().getTipo_documento(),
				medico.get().getNumero_documento(),
				medico.get().getPrimer_nombre(),
				medico.get().getSegundo_nombre(),
				medico.get().getPrimer_apellido(),
				medico.get().getSegundo_apellido(),
				medico.get().getCelular(),
				medico.get().getCorreo(),
				medico.get().getEstado());
	}

	private paciente obtenerPaciente(Optional<paciente> optionalPpaciente){
		return new paciente(optionalPpaciente.get().getId_paciente(),
				optionalPpaciente.get().getTipo_documento(),
				optionalPpaciente.get().getNumero_documento(),
				optionalPpaciente.get().getPrimer_nombre(),
				optionalPpaciente.get().getSegundo_nombre(),
				optionalPpaciente.get().getPrimer_apellido(),
				optionalPpaciente.get().getSegundo_apellido(),
				optionalPpaciente.get().getCelular(),
				optionalPpaciente.get().getCorreo(),
				optionalPpaciente.get().getNombre_persona_contacto(),
				optionalPpaciente.get().getCelular_persona_contacto(),
				optionalPpaciente.get().getEstado());
	}
	
	@Override
	public List<ingreso> findAll() {
		List<ingreso> listaingreso= (List<ingreso>) data.findAll();
		return listaingreso;
	}
	
	@Override
	public List<ingreso> filtroIngreso(String filtro) {
		List<ingreso>ListaIngreso=data.filtroIngreso(filtro);
		return ListaIngreso;
	}

	@Override
	public IngresoDto actualizarIngreso(String id, IngresoDto ingresoDto) {
		var ingreso = findOne(id);
		Optional<ingreso> pacienteCamas = data.validarPacientesCama(ingresoDto.getHabitacion(), ingresoDto.getCama(), "Ingreso");
		if (pacienteCamas.isEmpty()){
			return actualizarIngreso(ingresoDto, ingreso);
		} else {
			if (pacienteCamas.get().getId_ingreso().equals(ingreso.get().getId_ingreso())
			&& pacienteCamas.get().getCama().equals(ingresoDto.getCama()) && pacienteCamas.get().getHabitacion().equals(ingresoDto.getHabitacion())){
				return actualizarIngreso(ingresoDto, ingreso);
			}
		}
		throw new ErrorExcepcion("No debe haber dos pacientes en la misma cama");
    }

	private IngresoDto actualizarIngreso(IngresoDto ingresoDto,Optional<ingreso> ingreso ){
		Optional<paciente> optionalPaciente = ipaciente.findById(ingreso.get().getPaciente().getId_paciente());
		Optional<medico> optionalMedico = imedico.findById(ingreso.get().getMedico().getId_medico());
		ingreso ingresoGuardar = new ingreso(ingresoDto.getId(),
				obtenerPaciente(optionalPaciente),
				obtenerMedico(optionalMedico),
				ingresoDto.getHabitacion(),
				ingresoDto.getCama(),
				ingresoDto.getFecha_ingreso(),
				ingresoDto.getFecha_salida(),
				ingresoDto.getEstado());
		data.save (ingresoGuardar);
		return ingresoDto;
	}

	@Override
	public Optional<ingreso> findOne(String id_ingreso) {
		Optional<ingreso> ingreso=data.findById(id_ingreso);
		return ingreso;
	}
	
	@Override
	public int delete(String id_ingreso) {
		data.deleteById(id_ingreso);
		return 1;
	}

}
