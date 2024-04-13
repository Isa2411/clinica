package com.example.demo.interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.ingreso;

public interface Iingreso extends CrudRepository<ingreso,String>{
@Query("SELECT m FROM ingreso m WHERE "
			
			+ "m.id_ingreso LIKE %?1% OR "
			+ "m.habitacion LIKE %?1% OR "
			+ "m.estado LIKE %?1% OR "
			+ "m.cama LIKE %?1% ")
	
	List<ingreso> filtroIngreso(String filtro);

	@Query("SELECT i FROM ingreso i WHERE i.paciente.id_paciente =?1 AND i.estado =?2")
	List<ingreso> ingresosActivosPacientes(String idPaciente, String estado);

	@Query("SELECT i FROM ingreso i where i.habitacion =?1 and i.cama =?2 and i.estado =?3")
	Optional<ingreso> validarPacientesCama(String habitacion, String cama, String estado);


}
