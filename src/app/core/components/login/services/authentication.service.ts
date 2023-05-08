import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  serviceURL = './service/user';

  public createNewUser(item: any) {
    return this.http.post<any>(this.serviceURL+ '/create', item);
  }
  public autheticateUser(item: any) {
    return this.http.post<any>(this.serviceURL+ '/authenticate', item);
  }

  public checkToken(token: string) {
    return this.http.post<any>(this.serviceURL+ '/token', {token: token});
  }

  public validateEmail(email: string) : Observable<string> {
    console.log(email)
    return this.http.post<any>(this.serviceURL+ '/email', {email: email});
  }

}