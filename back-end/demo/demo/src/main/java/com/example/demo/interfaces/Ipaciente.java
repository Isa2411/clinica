package com.example.demo.interfaces;

import java.util.List;

import com.example.demo.model.medico;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.paciente;


public interface Ipaciente extends CrudRepository<paciente,String>{
@Query("SELECT m FROM paciente m WHERE "
			
			+ "m.id_paciente LIKE %?1% OR "
			+ "m.tipo_documento LIKE %?1% OR "
			+ "m.numero_documento LIKE %?1% OR "
			+ "m.primer_nombre LIKE %?1% OR "
			+ "m.segundo_nombre LIKE %?1% OR "
			+ "m.primer_apellido LIKE %?1% OR "
			+ "m.segundo_apellido LIKE %?1% OR "
			+ "m.celular LIKE %?1% OR "
			+ "m.correo LIKE %?1% OR "
			+ "m.nombre_persona_contacto LIKE %?1% OR "
			+ "m.celular_persona_contacto LIKE %?1% OR "
			+ "m.estado LIKE %?1%")
	
	List<paciente> filtroPaciente(String filtro);

	@Query("SELECT m FROM paciente m WHERE m.estado =?1")
	List<paciente> pacientesActivos(String estado);

	@Query("SELECT m FROM paciente m WHERE m.numero_documento =?1")
	List<paciente> existsByNumeroDocumento(String numeroDocumento);


}
