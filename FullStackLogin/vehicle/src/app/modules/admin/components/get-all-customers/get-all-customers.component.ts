import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-get-all-customers',
  templateUrl: './get-all-customers.component.html',
  styleUrls: ['./get-all-customers.component.scss']
})
export class GetAllCustomersComponent implements OnInit {

  customers: any = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomer().subscribe((res: any) => {
      console.log(res);
      this.customers = res;
    }, (error: any) => {
      console.error('Error fetching customers:', error);
    });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe((res: any) => {
      console.log(res);
      this.getAllCustomers();
    }, (error: any) => {
      console.error('Error deleting customer:', error);
    });
  }
}
