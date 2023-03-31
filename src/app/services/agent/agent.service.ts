import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
// url de ruta
url = '/api';
  constructor(private http:HttpClient) { }
  validateAgent(id) {
    return this.http.get(this.url + `/agents/${id}`);
  }
  viewAgent(id){
    return this.http.get(this.url + `/agents/viewAgent/${id}`);
  }
  editStatus(id, status:statusAgent ){
    return this.http.put(this.url + `/agents/status/${id}`,status);
  }
  viewAllAgents(){
    return this.http.get(this.url + `/agents/viewAllAgents`);
  }
  login(user:string, pass:string){
    return this.http.get(this.url + `/agents/login/${user}/${pass}`);
  }
}

export interface agent {

  id_agent: string, 
  name_agent: string, 
  last_name_agent: string,
  status_agent: string,
  lengthTurns: number
}
export interface statusAgent {
  status_agent: string
}
