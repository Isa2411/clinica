package com.example.demo.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.medico;


public interface Imedico extends CrudRepository<medico,String> {

	@Query("SELECT m FROM medico m WHERE "
			
			+ "m.id_medico LIKE %?1% OR "
			+ "m.tipo_documento LIKE %?1% OR "
			+ "m.numero_documento LIKE %?1% OR "
			+ "m.primer_nombre LIKE %?1% OR "
			+ "m.primer_apellido LIKE %?1% OR "
			+ "m.segundo_apellido LIKE %?1% OR "
			+ "m.celular LIKE %?1% OR "
			+ "m.correo LIKE %?1% OR "
			+ "m.estado LIKE %?1%")
	
	List<medico> filtroMedico(String filtro);

	@Query("SELECT m FROM medico m WHERE m.estado =?1")
	List<medico> medicosActivos(String estado);
}
