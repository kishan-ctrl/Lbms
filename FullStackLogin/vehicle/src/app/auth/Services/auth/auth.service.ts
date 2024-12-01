import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Base_URL = ['http://localhost:8000'];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htpp: HttpClient) { }
  register(signupRequest: any):Observable <any>{
    return this.htpp.post(Base_URL + '/api/auth/signup', signupRequest);
  }

  login(loginRequest: any):Observable <any>{
    return this.htpp.post(Base_URL + '/api/auth/login', loginRequest);
  }

}
