import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity;
  public token;

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


  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== undefined) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }


  getToken() {
    let token = localStorage.getItem('token');

    if (token !== undefined) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  updateUser(userUpdate): Observable<any> {
    let params = JSON.stringify(userUpdate);
    let headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: this.getToken()
    });

    return this.http.put(this.url + '/update-user/' + userUpdate._id, params, {headers})
                        .map(res => res);
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
