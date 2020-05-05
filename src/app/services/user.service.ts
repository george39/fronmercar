import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;

  constructor(
    public http: HttpClient
  ) { 
    this.url = GLOBAL;
  }

  // ================================================
  // CREAR UN USUARIO 
  // ================================================
  saveUser( user: User) {
    let url = GLOBAL + '/save-user';
    
    return this.http.post(url, user);
  }


  /****************************************************************
  LOGIN DE USUARIO
  **************************************************************** */
 signup(user): Observable<any>{
   let json = JSON.stringify(user);
   let params = 'json'+json;

   let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

   return this.http.post(this.url + '/login', params, {headers});
 }



//  signup(user: User) {

//   let url = URL_BACKEND + '/login';
//   return this.http.post(url, user)
//               .map((resp: any) => {
//                 localStorage.setItem('id', resp.id);
//                 localStorage.setItem('token', resp.token);
//                 localStorage.setItem('usuario', JSON.stringify(resp.token));

//                 return true;
//               });
// }

}
