import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../modules/admin/services/customer.service';

@Component({
  selector: 'app-bms',
  templateUrl: './bms.component.html',
  styleUrls: ['./bms.component.scss']
})
export class BmsComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchTerm: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.getCustomersByFaculty('BMS');
  }

  getCustomersByFaculty(faculty: string) {
    this.customerService.getCustomerByFaculty(faculty).subscribe((res: any) => {
      console.log(res);
      this.customers = res;
      this.filteredCustomers = res; // Initialize filteredCustomers
    }, (error: any) => {
      console.error('Error fetching customers:', error);
    });
  }

  searchBooks() {
    if (this.searchTerm) {
      this.customers = this.filteredCustomers.filter(customer =>
        customer.bookName && customer.bookName.toLowerCase().includes(this.searchTerm.toLowerCase())
      
      );
    } else {
      this.customers = this.filteredCustomers;
    }
  }
}
