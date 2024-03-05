package com.example.demo.model;

import com.example.demo.exepcion.ErrorExcepcion;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name="medico")
public class medico {
	
	/*
	 * id (UIID autogenerado)
	 * documento de identidad (obligatorio)
	 * primer nombre (obligatorio)
	 * segundo nombre (opcional)
	 * primer apellido (obligatorio)
	 * segundo apellido (opcional)
	 * celular (obligatorio)
	 * correo electrónico (obligatorio)
	 * Estado (Habilitado, Deshabilitado)
	 */
	
	@Id
	@GeneratedValue(strategy= GenerationType.UUID)
	@Column(name = "id_medico", nullable = false, length = 36)
	private String id_medico;  
	
	@Column(name = "tipo_documento", nullable = false, length = 2)
	private String tipo_documento;
	
	@Column(name = "numero_documento", nullable = false, length = 40)
	private String numero_documento;
	
	@Column(name = "primer_nombre", nullable = false, length = 100)
	private String primer_nombre;
	
	@Column(name = "segundo_nombre", nullable = true, length = 100)
	private String segundo_nombre;
	
	@Column(name = "primer_apellido", nullable = false, length = 100)
	private String primer_apellido;
	
	@Column(name = "segundo_apellido", nullable = true, length = 100)
	private String segundo_apellido;
	
	@Column(name = "celular", nullable = false, length = 50)
	private String celular;
	
	@Column(name = "correo", nullable = false, length = 50)
	private String correo;
	
	@Column(name = "estado", nullable = false, length = 20)
	private String estado;

	public medico() {
		super();
	}



	public void crearMedico(){
		if (tipo_documento.length() < 2){
            throw new ErrorExcepcion("El campo tipo de documento es incorrecto");
		}
		if (numero_documento == null || numero_documento.length() < 5 || numero_documento.length() > 11){
			throw new ErrorExcepcion("El campo numero de documento debe tener de 5 a 11 caracteres");
		}
		if (primer_nombre == null || primer_nombre.length() < 3 || primer_nombre.length() > 30){
			throw new ErrorExcepcion("El campo primer nombre debe tener de 3 a 30 caracteres");
		}
		if (primer_apellido == null || primer_apellido.length() < 3 || primer_apellido.length() > 30){
			throw new ErrorExcepcion("El campo primer apellido debe tener de 3 a 30 caracteres");
		}
		if (celular == null || celular.length() !=10 ){
			throw new ErrorExcepcion("El campo celular debe tener 10 caracteres");
		}
		if (estado == null || estado.isEmpty() ){
			throw new ErrorExcepcion("El campo estado no debe estar vacio");
		}

	}

	public medico(String id_medico, String tipo_documento, String numero_documento, String primer_nombre,
			String segundo_nombre, String primer_apellido, String segundo_apellido, String celular, String correo,
			String estado) {
		super();
		this.id_medico = id_medico;
		this.tipo_documento = tipo_documento;
		this.numero_documento = numero_documento;
		this.primer_nombre = primer_nombre;
		this.segundo_nombre = segundo_nombre;
		this.primer_apellido = primer_apellido;
		this.segundo_apellido = segundo_apellido;
		this.celular = celular;
		this.correo = correo;
		this.estado = estado;
	}

	public String getId_medico() {
		return id_medico;
	}

	public void setId_medico(String id_medico) {
		this.id_medico = id_medico;
	}

	public String getTipo_documento() {
		return tipo_documento;
	}

	public void setTipo_documento(String tipo_documento) {
		this.tipo_documento = tipo_documento;
	}
	
	public String getNumero_documento() {
		return numero_documento;
	}

	public void setNumero_documento(String numero_documento) {
		this.numero_documento = numero_documento;
	}

	public String getPrimer_nombre() {
		return primer_nombre;
	}

	public void setPrimer_nombre(String primer_nombre) {
		this.primer_nombre = primer_nombre;
	}

	public String getSegundo_nombre() {
		return segundo_nombre;
	}

	public void setSegundo_nombre(String segundo_nombre) {
		this.segundo_nombre = segundo_nombre;
	}

	public String getPrimer_apellido() {
		return primer_apellido;
	}

	public void setPrimer_apellido(String primer_apellido) {
		this.primer_apellido = primer_apellido;
	}

	public String getSegundo_apellido() {
		return segundo_apellido;
	}

	public void setSegundo_apellido(String segundo_apellido) {
		this.segundo_apellido = segundo_apellido;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	

}
