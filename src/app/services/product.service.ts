import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { GLOBAL } from '../../../../fronmercar1/src/app/services/global';
import { Observable } from 'rxjs';


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
  saveProduct(token, product): Observable<any> {
    let params = JSON.stringify(product);
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.post(this.url + '/save-product', params, {headers} );
  }


  /***********************************************
   LISTAR TODOS LOS PRODUCTOS
  /***********************************************/
  getProducts(token): Observable<any>{
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.get(this.url + '/get-product', {headers});
  }


  /***********************************************
   LISTAR UN PRODUCTO
  /***********************************************/
  getProduct(token, id): Observable<any>{
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.get(this.url + '/get-product-unic/' + id, {headers});
  }


  /***********************************************
   ACTUALIZAR PRODUCTO
  /***********************************************/
  updateProduct(token, product): Observable<any>{
    let params = JSON.stringify(product);
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.put(this.url + '/update-product/' + product._id, params, {headers});
  }

  /***********************************************
   ELIMINAR UN PRODUCTO
  /***********************************************/
  deleteProduct(token, id): Observable<any>{
    
    let headers = new HttpHeaders(({
      'Content-Type': 'application/json',
      Authorization: token
    }));

    return this.http.delete(this.url + '/delete-product/' + id, {headers});
  }
}
