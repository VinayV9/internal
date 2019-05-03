import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor( private http: HttpClient,) { }
  baseUrl: string = "";

  sendGoogleAuthToken(token: string){
     return this.http.post(`${this.baseUrl}/api/auth/google`, {token}, httpOptions)
  }

}
