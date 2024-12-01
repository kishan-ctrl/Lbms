package com.example.Car_Rental_Spring.Service.auth;

import com.example.Car_Rental_Spring.Entity.Customer;

import com.example.Car_Rental_Spring.Repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepositoy;

    public Customer postCustomer(Customer customer){
        System.out.println();
        return customerRepositoy.save(customer);
    }
    public List<Customer>getAllCustomer(){
        return customerRepositoy.findAll();

    }
    public Customer getCustomerById(Long id){
        return customerRepositoy.findById(id).orElse(null);

    }
    public Customer updatecustomer(Customer customer){
        return customerRepositoy.save(customer);

    }
    public void deleteCustomer(Long id){
        customerRepositoy.deleteById(id);
    }

    public List<Customer> getCustomersByFaculty(String faculty) {
        return customerRepositoy.findByFaculty(faculty);
    }

    public List<Customer> searchCustomersByBookName(String bookName) {
        return customerRepositoy.findByBookNameContainingIgnoreCase(bookName);
    }
}
