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
 signup(userLogin, gettoken = null): Observable<any>{

  if (gettoken !=null) {
    userLogin.gettoken = gettoken;
  }
  let params = JSON.stringify(userLogin);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');

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
