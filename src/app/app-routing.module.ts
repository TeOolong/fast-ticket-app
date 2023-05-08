import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { TicketCatalogComponent } from './features/ticket-catalog/ticket-catalog.component';
import { UserDataResolver } from './core/resolvers/user-data.resolver';
import { AuthenticationGuard } from './core/guards/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'notpermitted', pathMatch: 'full' },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [ AuthenticationGuard],
    resolve: { user: UserDataResolver},
    children: [
      { path: 'catalog', component: TicketCatalogComponent },
    ],
  }
  ,
  { path: 'notpermitted', component: NotFoundComponent },
  

  // Handle all other routes
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
