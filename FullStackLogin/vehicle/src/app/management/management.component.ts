import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../modules/admin/services/customer.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})
export class ManagementComponent implements OnInit{
  customers: any = [];
  searchTerm: String="";
  filteredCustomers: any[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomersByFaculty('MANAGEMENT');
  }

  getCustomersByFaculty(faculty: string) {
    this.customerService.getCustomerByFaculty(faculty).subscribe((res: any) => {
      console.log(res);
      this.customers = res;
      this.filteredCustomers = res;
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
