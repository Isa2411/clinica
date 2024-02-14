package com.example.tiendaAdso.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class corsConfig {

    @Bean
    CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source= new UrlBasedCorsConfigurationSource();
				CorsConfiguration config = new CorsConfiguration();
		
		//Permitir solicitudes desde todos los origenes
		//config.addAllowedOrigin("*");
		config.addAllowedOrigin("http://127.0.0.1:5500");
		
		//Permitir solicitudes con estos metodos HTTP
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");

		//Permitir el envio de ciertos encabezados en las solicitudes:
		config.addAllowedHeader("Authorization");
		config.addAllowedHeader("Content-Type");
		
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
}
