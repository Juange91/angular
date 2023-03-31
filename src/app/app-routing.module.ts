import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { UserComponent } from "./components/user/user.component";
import { CasesComponent } from "./components/cases/cases.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Dashboard2Component } from "./components/dashboard2/dashboard2.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent },
  {path: 'user', component:UserComponent},
  {path: 'cases/:document/:typeDocument', component:CasesComponent},
  {path: 'dashboard/:user',component:DashboardComponent },
  {path: 'dashboard2', component:Dashboard2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
