import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
url = '/api';
  constructor(private http:HttpClient) { }

 
}
