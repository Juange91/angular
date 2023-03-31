import { Component, OnInit } from '@angular/core';
import { UserService,user } from "../../services/user/user.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // Objeto donde se reciben los datos digitados por el usuario
dataUser:user = {
  id_user: '',
  name_user: '',
  last_name_user: '',
  phone_user: '',
  type_document: ''
}
  constructor(private UserService:UserService, private route:Router ) { }

  ngOnInit(): void {
  }

  addUser(){
    // Se envian los datos del cliente para ser guardados en la base de datos
    this.UserService.add_user(this.dataUser).subscribe();
    // Muestra un mensaje cuando el usuario fue registrado exitosamente
    this.userRegistred();
    // Se re-direciona a el componente donde se selecciona el caso que el cliente desea.
    this.route.navigate([`/cases/${this.dataUser.id_user}/${this.dataUser.type_document}`]);
  }
// Mensaje de registro exitoso
  userRegistred() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro exitoso',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
