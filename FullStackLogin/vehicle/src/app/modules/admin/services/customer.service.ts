import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL=["http://localhost:8000"];
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token') 
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  postCustomer(customer: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/customer`, customer);
  }

  getAllCustomer(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customers`,httpOptions);
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/${id}`);
  }
  getCustomerByFaculty(faculty: string): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/faculty/${faculty}`, httpOptions);
  }
  
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`${BASIC_URL}/api/customer/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}/api/customer/${id}`);
  }
  searchCustomersByBookName(bookName: string,customer:any): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/search/${bookName}`,customer);
}
}


