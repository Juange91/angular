import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AgentService } from "../../services/agent/agent.service";
import { SupervisorService } from "../../services/supervisor/supervisor.service";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Variable para guardar la clave de usuario
  password: "";
  // Variable para guardar el usuario 
  user: "";
  constructor(private route:Router,private AgentService: AgentService, private SupervisorService:SupervisorService) { }
  ngOnInit(): void {
  }
  loginAgent(){
    console.log(this.user);
    this.AgentService.login(this.user,this.password).subscribe(
      res => {
        console.log(res);
 if (res == 0){
  this.SupervisorService.get_supervisor(this.user,this.password).subscribe(
    res => {
      if (res == 0){
        this.errorSesion();
      }else{
        this.dashSupervisor();
      }
    })
 }else{
 this.dashboarAgent();
 }

      });
  }

  dashboarAgent(){
    Swal.fire({
      showConfirmButton: false,
      html:'<div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"><span class="visually-hidden">Loading...</span></div>',
      background: 'transparent',
      timer: 4000
    }).finally(() => {
      this.route.navigate(['/dashboard/' + this.user])
    })
  };
  dashSupervisor(){
    Swal.fire({
      showConfirmButton: false,
      html:'<div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"><span class="visually-hidden">Loading...</span></div>',
      background: 'transparent',
      timer: 4000
    }).finally(() => {
      this.route.navigate(['/dashboard2'])
    })
  }

  errorSesion(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Correo o clave incorrectos',
      timer: 2000 
    })
  }
  
}
