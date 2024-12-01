package com.example.Car_Rental_Spring.Controller;

import com.example.Car_Rental_Spring.Entity.Customer;
import com.example.Car_Rental_Spring.Service.auth.CustomerService;
import com.example.Car_Rental_Spring.Service.auth.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api")
@RequiredArgsConstructor


public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/customer")
    public Customer postcustomer(@RequestBody Customer customer){
        System.out.println("Received customer: " + customer);

        return customerService.postCustomer(customer);
    }
    @GetMapping("/customers")
    private List<Customer>getAllCustomer(){

        return customerService.getAllCustomer();
    }

    @GetMapping("/customer/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id){
        System.out.println("Fetching customer with ID: " + id);
        Customer customer =  customerService.getCustomerById(id);
        return customer != null ? ResponseEntity.ok(customer) :
                ResponseEntity.notFound().build();
    }
    @PutMapping("/customer/{id}")
    public ResponseEntity<Customer>updateCustomer(@PathVariable Long id,@RequestBody Customer customer){
        Customer existingCustomer =customerService.getCustomerById(id);
        if (existingCustomer==null)
            return ResponseEntity.notFound().build();
        existingCustomer.setBookName(customer.getBookName());
        existingCustomer.setAuthor(customer.getAuthor());
        existingCustomer.setFaculty(customer.getFaculty());
        Customer updateCustomer=customerService.updatecustomer(existingCustomer);
        return ResponseEntity.ok(updateCustomer);


    }
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?>deleteCustomer(@PathVariable Long id){
        Customer existingCustomer=  customerService.getCustomerById(id);
        if(existingCustomer==null)
            return ResponseEntity.notFound().build();
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/customer/faculty/{faculty}")
    public List<Customer> getCustomersByFaculty(@PathVariable String faculty){
        return customerService.getCustomersByFaculty(faculty);
    }
    @GetMapping("/customer/search")
    public List<Customer> searchCustomersByBookName(@RequestParam String bookName) {
        return customerService.searchCustomersByBookName(bookName);
    }






}



