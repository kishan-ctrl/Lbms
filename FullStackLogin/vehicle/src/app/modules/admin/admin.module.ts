import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { GetAllCustomersComponent } from './components/get-all-customers/get-all-customers.component';
import { PostCustomerComponent } from './components/post-customer/post-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    GetAllCustomersComponent,
    PostCustomerComponent,
    UpdateCustomerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    AdminRoutingModule
  ]
})
export class AdminModule { }
