import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { CasesComponent } from './components/cases/cases.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { LoginComponent } from './components/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    CasesComponent,
    DashboardComponent,
    Dashboard2Component,
    LoginComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
