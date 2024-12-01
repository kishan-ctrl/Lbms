import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-post-customer',
  templateUrl:'./post-customer.component.html',
  styleUrls: ['./post-customer.component.scss']
})
export class PostCustomerComponent implements OnInit {

  postCustomerform!: FormGroup;
  successMessage!: string;
allBooks: string|any[]|UrlTree|null|undefined;


  constructor(
    private customerService:CustomerService,
    private fb :FormBuilder,
    private router: Router
  ){}
  ngOnInit(){
    this.postCustomerform = this.fb.group({
      bookName:[null,[Validators.required]],
      author:[null,[Validators.required]],
      faculty:[null,[Validators.required]]


    });


  }
  postCustomer() {
    if (this.postCustomerform.valid) {
      console.log('Form is valid:', this.postCustomerform.value);
      this.customerService.postCustomer(this.postCustomerform.value).subscribe(
        (res: any) => {
          console.log('Service response:', res);
          this.successMessage = 'Book added successfully';
          this.postCustomerform.reset();
          console.log('Navigating to allBooks');
          this.router.navigateByUrl('/allBooks').then(success => {
            if (success) {
              console.log('Navigation successful');
            } else {
              console.log('Navigation failed');
            }
          });
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        (error: any) => {
          console.error('Error posting customer:', error);
        }
      );
    } else {
      console.log('Form is invalid:', this.postCustomerform.errors);
      this.postCustomerform.markAllAsTouched();
    }
  }

}
