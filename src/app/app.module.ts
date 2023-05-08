import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { MaterialModule } from './core/utils/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketCatalogMainComponent } from './features/ticket-catalog/components/ticket-catalog-main/ticket-catalog-main.component';
import { TicketCatalogDetailComponent } from './features/ticket-catalog/components/ticket-catalog-detail/ticket-catalog-detail.component';
import { TicketCatalogPurchaseComponent } from './features/ticket-catalog/components/ticket-catalog-purchase/ticket-catalog-purchase.component';
import { TicketCatalogComponent } from './features/ticket-catalog/ticket-catalog.component';
import { ProtectedAreaService } from './features/ticket-catalog/services/protected-area.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './core/components/toaster/components/toast/toast.component';
import { ToasterComponent } from './core/components/toaster/toaster.component';
import { ToastService } from './core/components/toaster/components/toast/services/toast.service';
import { AuthenticationService } from './core/components/login/services/authentication.service';
import { UserDataResolver } from './core/resolvers/user-data.resolver';
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    NotFoundComponent,
    TicketCatalogMainComponent,
    TicketCatalogDetailComponent,
    TicketCatalogPurchaseComponent,
    TicketCatalogComponent,
    ToastComponent,
    ToasterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProtectedAreaService, ToastService, AuthenticationService, UserDataResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],

})
export class AppModule { }
