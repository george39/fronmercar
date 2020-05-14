import { Injectable } from '@angular/core';
import { Provider } from '../models/Provider';
import { HttpClient } from '@angular/common/http';
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
  saveProvider(provider: Provider) {
    let url = GLOBAL + '/save-provider';

    return this.http.post(url, provider);
  }
}
