import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ArrozService {

  constructor(
    public http: HttpClient
  ) { }
  /***********************************************
   CREAR ARROZ
  /***********************************************/
  saveProduct(product: Product) {
    let url = GLOBAL + '/save-produc';
  
    return this.http.post(url, product)
  }
}

