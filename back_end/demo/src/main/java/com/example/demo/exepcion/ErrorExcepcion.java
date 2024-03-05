package com.example.demo.exepcion;

public class ErrorExcepcion extends RuntimeException{
    public ErrorExcepcion(String mensaje) {
        super(mensaje);
    }
}
