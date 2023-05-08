import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegexUtils } from '../../models/regex-utils';
import { AuthenticationService } from './services/authentication.service';
import { ToastService } from '../toaster/components/toast/services/toast.service';
import { EventTypes } from '../../models/event-types';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger(
      'fadein', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
      ])
    ]
    )
  ]
})
export class LoginComponent implements OnInit  {

  loginTemplate = [
    {name: 'email', placeholder: 'Email', type: 'text',icon: "mail"},
    {name: 'password', placeholder: 'Contraseña', type: 'password', icon: 'lock'},
  ]
  registerTemplate = [
    {name: 'name', placeholder: 'Nombre', type: 'text',},
    {name: 'lastName', placeholder: 'Apellidos', type: 'text',},
    {name: 'email', placeholder: 'Email', type: 'text',icon: "mail"},
    {name: 'password', placeholder: 'Contraseña', type: 'password', icon: 'lock'},
  ]
  currentTemplate: any = this.loginTemplate;
  form: FormGroup;
  loginMode = true;
  processing = false;
  currentSwithWidth = ''
  constructor(
    protected formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastService: ToastService,
    protected route: ActivatedRoute,
    protected router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.pattern(RegexUtils.regexEmail)]),
      password: new FormControl("", [Validators.required])
    })
  }
  ngOnInit(): void {
    if(window.innerWidth > 1100) {
      this.currentSwithWidth = '400px'
    } else if(window.innerWidth <= 1100 ) {
      this.currentSwithWidth = '300px'
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(window.innerWidth > 1100) {
      this.currentSwithWidth = '400px'
    } else if(window.innerWidth <= 1100 ) {
      this.currentSwithWidth = '300px'
    }
  }

  changeMode() {
    this.loginMode = !this.loginMode;
    if(this.loginMode) this.currentTemplate = this.loginTemplate;
    else this.currentTemplate = this.registerTemplate;
    this.form = new FormGroup({})
    for(let item of this.currentTemplate) {
      this.form.addControl(item.name, new FormControl("", Validators.required))
      if(item.name === 'email') {
        this.form.get(item.name)?.addValidators(Validators.pattern(RegexUtils.regexEmail));
        if(!this.loginMode) this.form.get(item.name)?.addAsyncValidators([this.validateEmail()]);
      }
    }
  }

  validateEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return this.authenticationService.validateEmail(control.value).pipe(
        map(resp => {
          return resp ? { key: true } : null;
        }));
    };
  }

  authenticationHandler() {
    this.processing = true;
    if(this.loginMode) {
      this.authenticationService.autheticateUser({...this.form.value}).subscribe(
        {next: x => {
          if(x) {
            localStorage.setItem("token",x.token)  
            this.toastService.showMessage("", "Usuario conectado con exito", EventTypes.success)
            this.router.navigate(['/catalog'], {})
          } else {
            this.toastService.showMessage("", "Hubo un error la conexión con el servicio", EventTypes.error)
          }
        },
        error: e => {
          this.toastService.showMessage("", e.message, EventTypes.error);
          this.processing = false;
        },complete: () => this.processing = false
      }
      )
      
    } else {
      this.authenticationService.createNewUser({...this.form.value}).subscribe(
          {next: x => {
            if(x) {
              this.changeMode();
              this.toastService.showMessage("", "Usuario creado con exito", EventTypes.success)
            } else {
              this.toastService.showMessage("", "Hubo un error en la creación del usuario", EventTypes.error)
            }
          },
          error: e => {
            this.toastService.showMessage("", "Hubo un error en la creación del usuario", EventTypes.error);
            this.processing = false;
          },complete: () => this.processing = false
        }
        )
    }

  }


}
