package com.example.demo.interfaces;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.medico;

public interface Imedico extends CrudRepository<medico,String> {

}
