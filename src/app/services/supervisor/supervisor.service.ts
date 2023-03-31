import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  url = '/api';
  constructor(private http: HttpClient) { }

  get_supervisor(user: string, pass: string){
    return this.http.get(this.url + `/supervisor/${user}/${pass}`);
    
  }


}
