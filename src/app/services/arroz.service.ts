import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrozService {

  public url: string;

  constructor(
    public http: HttpClient
  ) { 
    this.url = GLOBAL;
  }


  /***********************************************
   CREAR ARROZ
  /***********************************************/
  saveArroz(token, arroz): Observable<any> {
    let params = JSON.stringify(arroz);
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.post(this.url + '/save-arroz', params, {headers} );
  }


  /***********************************************
   LISTAR TODOS LOS ARROCES
  /***********************************************/
  getArroz(token, arroz): Observable<any>{
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));


    return this.http.get(this.url + '/get-arroz', {headers});
  }
}

