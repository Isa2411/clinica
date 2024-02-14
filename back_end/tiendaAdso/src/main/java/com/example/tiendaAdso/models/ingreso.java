package com.example.tiendaAdso.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


	@Entity(name="ingreso")
	public class ingreso {
		
		/*
		 * id (UIID autogenerado)
- Habitación (Obligatorio).
- Cama (Obligatorio)
- Paciente (Obligatorio)
- Medico (Obligatorio)
- Fecha de ingreso (Obligatorio)
- Fecha de salida (Obligatorio)
- Estado (Obligatorio)
		 */
		//@Id indica que el campo es un indicador
		@Id
		@GeneratedValue(strategy = GenerationType.UUID)
		@Column(name="ingreso_id",nullable=false, length=36)
		private String ingreso_id;
		
		@Column(name="habitacion",nullable=false, length=2)
		private String habitacion;
		
		@Column(name="cama",nullable=false, length=11)
		private String cama;
		
		@Column(name="paciente",nullable=false,length=20)
		private String paciente;
		
		@Column(name="medico",nullable=true,length=20)
		private String medico;
		
		@Column(name="fecha_de_ingreso",nullable=false,length=20)
		private Date fecha_de_ingreso;
		
		@Column(name="fecha_de_salida",nullable=true,length=20)
		private Date fecha_de_salida;
		
		@Column(name="estado",nullable=false, length=15)
		private String estado;

		public ingreso() {
			super();
		}

		public ingreso(String ingreso_id, String habitacion, String cama, String paciente, String medico,
				Date fecha_de_ingreso, Date fecha_de_salida, String estado) {
			super();
			this.ingreso_id = ingreso_id;
			this.habitacion = habitacion;
			this.cama = cama;
			this.paciente = paciente;
			this.medico = medico;
			this.fecha_de_ingreso = fecha_de_ingreso;
			this.fecha_de_salida = fecha_de_salida;
			this.estado = estado;
		}

		public String getIngreso_id() {
			return ingreso_id;
		}

		public void setIngreso_id(String ingreso_id) {
			this.ingreso_id = ingreso_id;
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

		public Date getFecha_de_ingreso() {
			return fecha_de_ingreso;
		}

		public void setFecha_de_ingreso(Date fecha_de_ingreso) {
			this.fecha_de_ingreso = fecha_de_ingreso;
		}

		public Date getFecha_de_salida() {
			return fecha_de_salida;
		}

		public void setFecha_de_salida(Date fecha_de_salida) {
			this.fecha_de_salida = fecha_de_salida;
		}

		public String getEstado() {
			return estado;
		}

		public void setEstado(String estado) {
			this.estado = estado;
		}
		
		
		
		
		
	
		


}
