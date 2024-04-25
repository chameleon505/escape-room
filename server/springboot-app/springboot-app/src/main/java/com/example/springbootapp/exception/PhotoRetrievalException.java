package com.example.springbootapp.exception;

import org.aspectj.bridge.IMessage;

public class PhotoRetrievalException extends RuntimeException {
    public PhotoRetrievalException(String ms) {
        super(ms);
    }
}
