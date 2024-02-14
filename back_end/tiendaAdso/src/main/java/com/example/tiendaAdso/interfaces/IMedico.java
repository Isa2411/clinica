package com.example.tiendaAdso.interfaces;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.tiendaAdso.models.medico;

@Repository
public interface IMedico extends CrudRepository<medico,String>{

}
