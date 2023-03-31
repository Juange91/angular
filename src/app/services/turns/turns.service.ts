import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TurnsService {
  // url de ruta
  url = '/api';
  constructor(private http: HttpClient) { }
  // Rutas de para recibir datos por el metodo get desde el servidor
  validationTurn(id) {
    return this.http.get(this.url + '/turns/' + id);
  }
  addTurn(turn:turn){
    return this.http.post(this.url + '/turns', turn);
  }
  validationTypeCase(id) {
    return this.http.get(this.url + '/turns/turn/' + id);
  }
  view_turns(id){
    return this.http.get(this.url + '/turns/viewTurn/' + id);
  }
  finish_turn(id, finish_turn:finishTurn){
    return this.http.put(this.url + '/turns/finishTurn/' + id,finish_turn);
  }
  viewAllTurns(){
    return this.http.get(this.url + '/turns/viewAllTurns');
  }
  turnByAgent(id){
    return this.http.get(this.url + '/turns/turnByAgent/' + id); 
  }
}

export interface turn {

  name_turn: string,
  status_turn: string,
  module_turn: string,
  case_turn: string,
  id_user_fk: string,
  id_agent_fk: string,
  

}
export interface listTurn {
id_turn: string,
  name_turn: string,
  status_turn: string,
  name_user: string,
  last_name_user: string

}
export interface finishTurn {
  status_turn: string
}
export interface listAllTurn {
    name_turn: string,
    name_user: string,
    last_name_user: string,
    name_agent: string,
    last_name_agent: string,
    module_agent: string,
    createdAt: string
  
  }

