import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class AceiteService {

  public url: string;

  constructor(
    public http: HttpClient
  ) { 
    this.url = GLOBAL;
  }

  /***********************************************
   CREAR ACEITE
  /***********************************************/
  saveAceite(token, aceite): Observable<any> {
    let params = JSON.stringify(aceite);
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.post(this.url + '/save-aceite', params, {headers} );
  }


  /***********************************************
   LISTAR TODOS LOS ACEITES
  /***********************************************/
  getAceite(token): Observable<any>{
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));


    return this.http.get(this.url + '/get-aceite', {headers});
  }
}
