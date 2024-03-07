package com.example.demo.model;

import com.example.demo.exepcion.ErrorExcepcion;

public class IngresoDto {
    private String paciente;
    private String id;
    private String medico;
    private String habitacion;
    private String cama;
    private String fecha_ingreso;
    private String fecha_salida;
    private String estado;

    public void validarAlCrear(){
        if (paciente == null || paciente.isEmpty()){
            throw new ErrorExcepcion("El campo paciente no puede estar vacio");
        }
        if (habitacion == null || habitacion.isEmpty()){
            throw new ErrorExcepcion("El campo habitacion no puede estar vacio");
        }
        if (cama == null || cama.isEmpty()){
            throw new ErrorExcepcion("El campo cama no puede estar vacio");
        }
        if (medico == null || medico.isEmpty()){
            throw new ErrorExcepcion("El campo medico no puede estar vacio");
        }
        if (fecha_ingreso == null || fecha_ingreso.isEmpty()){
            throw new ErrorExcepcion("El campo fecha ingreso no puede estar vacio");
        }
        if (fecha_salida == null || fecha_salida.isEmpty()){
            throw new ErrorExcepcion("El campo fecha salida no puede estar vacio");
        }
        if (estado == null || estado.isEmpty()){
            throw new ErrorExcepcion("El campo estado no puede estar vacio");
        }
    }

    public IngresoDto(String paciente, String medico, String habitacion, String cama, String fecha_ingreso, String fecha_salida, String estado) {
        this.paciente = paciente;
        this.medico = medico;
        this.habitacion = habitacion;
        this.cama = cama;
        this.fecha_ingreso = fecha_ingreso;
        this.fecha_salida = fecha_salida;
        this.estado = estado;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPaciente() {
        return paciente;
    }

    public void setPaciente(String paciente) {
        this.paciente = paciente;
    }

    public String getMedico() {
        return medico;
    }

    public void setMedico(String medico) {
        this.medico = medico;
    }

    public String getHabitacion() {
        return habitacion;
    }

    public void setHabitacion(String habitacion) {
        this.habitacion = habitacion;
    }

    public String getCama() {
        return cama;
    }

    public void setCama(String cama) {
        this.cama = cama;
    }

    public String getFecha_ingreso() {
        return fecha_ingreso;
    }

    public void setFecha_ingreso(String fecha_ingreso) {
        this.fecha_ingreso = fecha_ingreso;
    }

    public String getFecha_salida() {
        return fecha_salida;
    }

    public void setFecha_salida(String fecha_salida) {
        this.fecha_salida = fecha_salida;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
