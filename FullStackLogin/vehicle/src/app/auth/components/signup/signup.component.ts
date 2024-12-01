import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
isSpinning: boolean = false;
signUpForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) { }

ngOnInit() {
this.signUpForm = this.fb.group({
  name: [null,[Validators.required]],
  email: [null,[Validators.required,Validators.email]],
  password: [null,[Validators.required]],
  confirmPassword: [null,[Validators.required, this.confirmationValidate]],


});


}

confirmationValidate = (control: FormControl): { [s: string]: boolean} => {
  if(!control.value){
    return{required:true};
  }else if(control.value !==this.signUpForm.controls['password'].value){
    return{confirm: true,error:true};
  }
  return{};
};


register(){
  this.isSpinning = true;
  this.authService.register(this.signUpForm.value).subscribe(
    (res: any) => {
      this.isSpinning = false;
      if (res.id != null) {
        this.message.success("Signup successfully achieved", { nzDuration: 5000 });
        this.router.navigateByUrl('/login');
      }
    },
    (error: any) => {
      this.isSpinning = false;
      if (error.status === 406) { // Assuming 409 Conflict for existing account
        this.message.error("Account already exists", { nzDuration: 5000 });
      } else {
        this.message.error("Signup failed", { nzDuration: 5000 });
      }
    }
  );

 
}

}
