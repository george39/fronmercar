import { Injectable } from '@angular/core';
import { Provider } from '../models/Provider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

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
}
