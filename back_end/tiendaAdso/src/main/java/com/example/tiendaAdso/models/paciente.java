package com.example.tiendaAdso.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


	@Entity(name="medico")
	public class paciente {
		
		/*
id (UIID autogenerado)
documento de identidad (obligatorio)
 primer nombre (obligatorio)
 segundo nombre (opcional)
 primer apellido (obligatorio)
 segundo apellido (opcional)
 celular (obligatorio)
 correo electrónico (obligatorio)
 Nombre Persona de contacto (obligatorio)
 Teléfono persona de contacto (Obligatorio)
		 */

		//@Id indica que el campo es un indicador
		@Id
		@GeneratedValue(strategy = GenerationType.UUID)
		@Column(name="paciente_id",nullable=false, length=36)
		private String paciente_id;
		
		@Column(name="documento_de_identidad",nullable=false, length=2)
		private String documento_de_identidad;
		
		@Column(name="primer_nombre",nullable=false,length=20)
		private String primer_nombre;
		
		@Column(name="segundo_nombre",nullable=true,length=20)
		private String segundo_nombre;
		
		@Column(name="primer_apellido",nullable=false,length=20)
		private String primer_apellido;
		
		@Column(name="segundo_apellido",nullable=true,length=20)
		private String segundo_apellido;
		
		@Column(name="telefono",nullable=false, length=15)
		private String telefono;
		
		@Column(name="correo",nullable=false, length=255)
		private String correo;
		
		@Column(name="nombre_persona_contacto",nullable=false, length=100)
		private String nombre_persona_contacto;
		
		@Column(name="telefono_persona_contacto",nullable=false, length=100)
		private String telefono_persona_contacto;

		public paciente() {
			super();
		}

		public paciente(String paciente_id, String documento_de_identidad, String primer_nombre,
				String segundo_nombre, String primer_apellido, String segundo_apellido, String telefono, String correo,
				String nombre_persona_contacto, String telefono_persona_contacto) {
			super();
			this.paciente_id = paciente_id;
			this.documento_de_identidad = documento_de_identidad;
			this.primer_nombre = primer_nombre;
			this.segundo_nombre = segundo_nombre;
			this.primer_apellido = primer_apellido;
			this.segundo_apellido = segundo_apellido;
			this.telefono = telefono;
			this.correo = correo;
			this.nombre_persona_contacto = nombre_persona_contacto;
			this.telefono_persona_contacto = telefono_persona_contacto;
		}

		public String getPaciente_id() {
			return paciente_id;
		}

		public void setPaciente_id(String paciente_id) {
			this.paciente_id = paciente_id;
		}

		public String getDocumento_de_identidad() {
			return documento_de_identidad;
		}

		public void setDocumento_de_identidad(String documento_de_identidad) {
			this.documento_de_identidad = documento_de_identidad;
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

		public String getTelefono() {
			return telefono;
		}

		public void setTelefono(String telefono) {
			this.telefono = telefono;
		}

		public String getCorreo() {
			return correo;
		}

		public void setCorreo(String correo) {
			this.correo = correo;
		}

		public String getNombre_persona_contacto() {
			return nombre_persona_contacto;
		}

		public void setNombre_persona_contacto(String nombre_persona_contacto) {
			this.nombre_persona_contacto = nombre_persona_contacto;
		}

		public String getTelefono_persona_contacto() {
			return telefono_persona_contacto;
		}

		public void setTelefono_persona_contacto(String telefono_persona_contacto) {
			this.telefono_persona_contacto = telefono_persona_contacto;
		}
		
		
		
		


}
