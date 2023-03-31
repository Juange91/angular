import { Component, OnInit } from '@angular/core';
import { HomeService } from "../../services/home/home.service";
import { UserService } from "../../services/user/user.service";
import { TurnsService } from "../../services/turns/turns.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  documentUser: 0;
  typeDocumet: "";
  constructor(private HomeService:HomeService,private UserService:UserService,private TurnsService:TurnsService,
    private route:Router) { }

  ngOnInit(): void {
  }
  
  verifyUser() {

   
// Se valida si el usuario ya tiene un turno en espera
    this.TurnsService.validationTurn(this.documentUser).subscribe(
      res => {
        if (res == false) {
          // Se valida si el usuario se encuentra registrado en la base de datos con id y tipo de documento
          this.UserService.verifyUser(this.documentUser,this.typeDocumet).subscribe(
            res => { 
              if (res == false) {
               this.messageRegister();
              }
              else {
                // Se re-direciona a el componente donde se selecciona el caso que el cliente desea.
             this.route.navigate([`/cases/${this.documentUser}/${this.typeDocumet}`]);
              }
            });
        }
        else {
          this.message();
        }
      })
    
  }
// Muestra mensaje que ya tiene un turno asignado
  message() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ya tienes un turno asignado',
      showConfirmButton: false,
      timer: 1500
    })
  }
// Muestra mensaje para registrarse
  messageRegister(){
    Swal.fire({
      title: 'No estas registrado',
      text: "Ingresa unos datos para generar tu turno",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/user']);
      }
    })

  }

  

}
