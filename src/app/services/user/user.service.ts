import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url de ruta
url = '/api';
  constructor(private http:HttpClient) { }
// Ruta de envio de datos por el metodo post al servidor
  add_user(user:user){
    return this.http.post(this.url + '/users',user);
  }
  verifyUser(document, typeDocumet:string){
    return this.http.get(this.url + `/users/${document}/${typeDocumet}`)
      }
}

export interface user {
 
  id_user: string,
  name_user: string,
  last_name_user: string,
  phone_user: string,
  type_document
}

