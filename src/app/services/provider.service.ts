import { Injectable } from '@angular/core';
import { Provider } from '../models/Provider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Pipe } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = GLOBAL;
   }

  /***********************************************
   CREAR UN PROVEEDOR
  /***********************************************/
  saveProvider(token, provider) {
    let params = JSON.stringify(provider);
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.post(this.url + '/save-provider', params, {headers});
  }
  


  /***********************************************
   LISTAR LOS PROVEEDORES
  /***********************************************/
  getProvider(token): Observable<any> {
   
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.get(this.url + '/get-provider',  {headers});
  }
}
