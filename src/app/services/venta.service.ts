import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = GLOBAL;
   }


  /***********************************************
   GUARDAR UNA VENTA
  /***********************************************/
  saveVenta(token, venta): Observable<any> {
    let params = JSON.stringify(venta);
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.post(this.url + '/save-venta', params, {headers} );
  }


  /***********************************************
   CONSULTAR TODAS LAS VENTAS
  /***********************************************/
  getVentas(token): Observable<any> {
    var headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));


    return this.http.get(this.url + '/get-venta', {headers});
  }
}
