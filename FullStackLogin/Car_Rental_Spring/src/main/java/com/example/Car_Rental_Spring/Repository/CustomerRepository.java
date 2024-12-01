package com.example.Car_Rental_Spring.Repository;

import com.example.Car_Rental_Spring.Entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    List<Customer> findByFaculty(String faculty);

    List<Customer> findByBookNameContainingIgnoreCase(String bookName);
}