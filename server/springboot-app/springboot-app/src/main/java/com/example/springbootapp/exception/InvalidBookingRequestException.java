package com.example.springbootapp.exception;

public class InvalidBookingRequestException extends RuntimeException  {
    public InvalidBookingRequestException(String message) {
        super(message);
    }
}


