import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../components/login/services/authentication.service";
import { ToastService } from "../components/toaster/components/toast/services/toast.service";
import { EventTypes } from "../models/event-types";

@Injectable({
    providedIn: 'root'
  })
 export class AuthenticationGuard implements CanActivate {

    constructor(private authentificationService: AuthenticationService,
       private router: Router,
       private toastService: ToastService) {

    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if(!localStorage.getItem("token")) {
        this.router.navigate(['/login']);
        this.toastService.showMessage("","Acceso denegado",EventTypes.error)
        return resolve(false);
      }
      this.authentificationService.checkToken(String(localStorage.getItem("token"))).subscribe(
        {
          next: x => {
            resolve(true);
          },
          error: x => {
            localStorage.removeItem("token")
            this.router.navigate(['/login']);
            this.toastService.showMessage("","Acceso denegado",EventTypes.error)
          }
        }
      )
    })
  }

  }