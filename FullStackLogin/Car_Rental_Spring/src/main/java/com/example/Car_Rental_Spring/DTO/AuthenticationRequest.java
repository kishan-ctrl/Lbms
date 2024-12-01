package com.example.Car_Rental_Spring.DTO;


import com.fasterxml.jackson.datatype.jsr310.deser.JSR310DateTimeDeserializerBase;
import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;

}
