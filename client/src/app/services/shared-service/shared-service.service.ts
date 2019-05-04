import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  baseUrl: string = "http://localhost:8080";
  private user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  cast = this.user.asObservable();

  constructor( private http: HttpClient,) { }
  

  sendGoogleAuthToken(token: string){
     return this.http.post(`${this.baseUrl}/api/auth/google`, {token}, httpOptions)
  }

  setProfile(data){
    let newUser = {
      username:data.username,
      avtar:data.avtar
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    this.user.next(newUser);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    return !!localStorage.getItem('token');  
  }

}
