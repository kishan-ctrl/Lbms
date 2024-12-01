package com.example.Car_Rental_Spring.Entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "lis")
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bookName;
    private String author;
    private String faculty;


}

