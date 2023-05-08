import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../components/login/services/authentication.service";
import { of } from "rxjs";

@Injectable()
export class UserDataResolver implements Resolve<any>{
  constructor(private http: HttpClient, private service: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!localStorage.getItem("token")) {
        return of(null);
      }
     return this.service.checkToken(String(localStorage.getItem("token")));
  }
}