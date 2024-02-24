package com.example.demo.interfaces;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.paciente;

public interface Ipaciente extends CrudRepository<paciente,String>{

}
