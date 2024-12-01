import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';

import { PostCustomerComponent } from './modules/admin/components/post-customer/post-customer.component';
import { UpdateCustomerComponent } from './modules/admin/components/update-customer/update-customer.component';
import { GetAllCustomersComponent } from './modules/admin/components/get-all-customers/get-all-customers.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BmsComponent } from './bms/bms.component';
import { PsychologyComponent } from './psychology/psychology.component';
import { FcseComponent } from './fcse/fcse.component';
import { ManagementComponent } from './management/management.component';

const routes: Routes = [
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'customer', component: PostCustomerComponent },
  { path: 'allBooks', component: GetAllCustomersComponent }, 
  { path: 'customer/:id', component: UpdateCustomerComponent },
  { path:"home",component:HomepageComponent},
  { path:"Bms",component:BmsComponent},
  { path:"Psychology",component:PsychologyComponent},
  { path:"Fcse",component:FcseComponent},
  { path:"Management",component:ManagementComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
