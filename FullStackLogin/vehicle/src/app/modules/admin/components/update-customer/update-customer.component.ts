import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  updateCustomerForm!: FormGroup;
  id: number;

  constructor(
    private activationRoute: ActivatedRoute,
    private service: CustomerService,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.id = this.activationRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.updateCustomerForm = this.fb.group({
      bookName: [null, [Validators.required]],
      author: [null, [Validators.required]],
      faculty: [null, [Validators.required, Validators.email]],
      Action: [null, [Validators.required]]
    });
    this.getCustomerById();
  }

  getCustomerById() {
    this.service.getCustomerById(this.id).subscribe((res) => {
      console.log(res);
      this.updateCustomerForm.patchValue(res);
    });
  }

  updateCustomer() {
    this.service.updateCustomer(this.id, this.updateCustomerForm.value).subscribe(
      (res: { id: null; }) => {
        console.log(res);

      (error: any) => {
        console.error(error);
      }
      if (res.id !=null){
        this.router.navigateByUrl("/allBooks");
      }
  })
  }
}
