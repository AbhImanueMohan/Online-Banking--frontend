import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {// http://localhost:4200 - login
  path:'',component:LoginComponent
  },
  {
path:'register',component:RegisterComponent
  },
  {
    path:'dashboard',component:DasboardComponent
  },
  {
    path:'transaction',component:TransactionComponent
  },
  {
    path:'**',component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

