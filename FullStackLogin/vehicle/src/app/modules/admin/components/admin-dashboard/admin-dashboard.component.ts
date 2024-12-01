import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

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
