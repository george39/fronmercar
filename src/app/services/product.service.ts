import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { GLOBAL } from '../../../../fronmercar1/src/app/services/global';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url: string;

  constructor(
    public http: HttpClient
    ) {
      this.url = GLOBAL;

  }


  /***********************************************
   GUARDAR UN PRODUCTO
  /***********************************************/
  saveProduct(token, product) {
    let params = JSON.stringify(product);
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.post(this.url + '/save-product', params, {headers} );
  }
}
