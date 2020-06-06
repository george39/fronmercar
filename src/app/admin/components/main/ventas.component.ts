import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Product } from '../../../models/product';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: [
  ]
})
export class VentasComponent implements OnInit, DoCheck {

  @ViewChild('name') name: ElementRef;
  @ViewChild('priceClient') priceClient: ElementRef;
  @ViewChild('code') code: ElementRef;
  @ViewChild('quantity') quantity: ElementRef;

  public title: string;
  public token;
  public product: Product;
  public product2: Product;
  public prod: any[];
  public dataarray: any[];
  public productos: any[];
  public precioCliente: string[];
  public codigo: string[];
  public cant: number;
  public nombre: string[];
  public cantidad: number[];
  public busqueda;

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) { 
    this.title = 'Ventas';
    this.token = userService.getToken();

    this.nombre = new Array();
    this.precioCliente = new Array();
    this.prod = new Array();
    this.codigo = new Array();
    this.dataarray = new Array();
    this.cantidad = new Array();
    this.productos = new Array();
    this.cant = 0;
  }

  ngOnInit(): void {
    this.getProduct();
    //this.dataarray.push(this.product);
    
  }

  ngDoCheck() {
    
  }


  /***********************************************
   LISTAR TODOS LSO PRODUCTOS
  /***********************************************/
  getProduct() {
    this.productService.getProducts(this.token).subscribe(
      response => {
        this.product = response.product;
        console.log('productos', this.product);
      },
      error => {
        console.log(error as any);
      }
    );
  }


  /***********************************************
   AGREGAR ITEMS
  /***********************************************/
  addForm() {

    this.codigo.push(this.code.nativeElement.value);
    
    this.productService.getProducts(this.token).subscribe(
      response => {
        this.product = response.product;
        response.product.forEach((cantid) => {
          
            
            
            var cant = this.cantidad;
            var id = cantid._id;
            this.productService.getProduct(this.token, id).subscribe(
              response => {
                this.product2 = response.product;
                if (this.busqueda === cantid.code) {
                  this.productos.push(this.product2);
                  this.productos.forEach((cod) => {
                    if (this.busqueda === cod.code) {
                      console.log('code', cod.code);
                    }
                  });
                  // this.cant = 0;
                  this.busqueda = '';
                  console.log('productos', this.productos);
                  
                  

                }
                }
              );

        });
      },
      error => {
        console.log(error as any);
      }
    );

    

  }
  
  /***********************************************
   REMOVER ITEMS
   /***********************************************/
  removeForm(index) {
       
    this.nombre.splice(index, 1);
    this.precioCliente.splice(index, 1);
    this.dataarray.splice(index, 1);
    this.cantidad.splice(index, 1);
    this.prod.splice(index, 1);
    
    


    
     
    }
    
  onSubmit() {
    this.productService.getProducts(this.token).subscribe(
      response => {
        this.product = response.product;
        response.product.forEach((cantid) => {
          this.codigo.forEach((cod) => {
            
            if (cod === cantid.code) {
              var cant = this.cantidad;
              var id = cantid._id;
              this.productService.getProduct(this.token, id).subscribe(
                response => {

                  this.product2 = response.product;
                  this.dataarray.push(this.product2);
                  console.log('cantidad', this.dataarray);
                }
              );
              
              //cantid.quantity = cantid.quantity + cant;
            }
            
          });
          
        });
      },
      error => {
        console.log(error as any);
      }
    );
    
    
  }
    
    
  addItems() {
  
  this.nombre.push(this.name.nativeElement.value);
  this.precioCliente.push(this.priceClient.nativeElement.value);
  this.prod.push(this.name.nativeElement.value);
  this.prod.push(this.priceClient.nativeElement.value);
  console.log('prod', this.prod);
  }

}
