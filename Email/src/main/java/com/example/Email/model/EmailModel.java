package com.example.Email.model;

public class EmailModel {
    private String name;
    private String message;
    private String email;
    
    public EmailModel(String name, String message, String email) {
        this.name = name;
        this.message = message;
        this.email = email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    
}
