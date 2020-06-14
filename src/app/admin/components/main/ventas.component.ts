import { Component, OnInit, ViewChild, ElementRef, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../models/product';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-ventas',
  
  templateUrl: './ventas.component.html',
  styles: [
  ]
})
export class VentasComponent implements OnInit {


  public title: string;
  public token;
  public product: Product;
  public product2: Product;
  public productos: any[];
  public total: number;
  public cantidad: number;
  public devuelta: number;
  public busqueda;
  public busqueda2;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService
  ) {
    this.title = 'Ventas';
    this.token = userService.getToken();
    this.productos = new Array();
    this.total = 0;

  }

  ngOnInit(): void {
    this.getProduct();

  }




  /***********************************************
   FUNCION PARA DESCONTAR CANTIDAD DE PRODUCTOS
  /***********************************************/
  disminuir(index) {

    this.productService.getProducts(this.token).subscribe(
      response => {
        this.product = response.product;
        response.product.forEach((cantid) => {


            var id = cantid._id;
            this.productService.getProduct(this.token, id).subscribe(
              response => {
                this.product2 = response.product;

                this.productos.forEach(cantidad => {

                    if (cantid.code === cantidad.code) {

                      for (let i = 0; i <= this.productos.length; i ++) {

                        if (cantid.code[i] === index && cantidad.quantityClient > 0) {

                          this.cantidad = cantidad.quantityClient - 1; 
                          cantidad.quantityClient = this.cantidad;
                          cantidad.quantity = cantidad.quantity + 1;

                          cantidad.priceClient = response.product.priceClient * this.cantidad;
                          this.totalVenta();

                        }
                      }

                    }


                  });

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
   LISTAR TODOS LOS PRODUCTOS
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
    // Me pone el scroll al principio
    var scrol = document.getElementById('caja');
    // scrol.innerHTML = html;
    scrol.scrollTop = scrol.scrollHeight;

    this.productService.getProducts(this.token).subscribe(
      response => {
        this.product = response.product;
        response.product.forEach((cantid) => {


            var id = cantid._id;
            this.productService.getProduct(this.token, id).subscribe(
              response => {
                this.product2 = response.product;

                if (this.busqueda === cantid.code) {

                  this.productos.push(this.product2);
                  let hash = {};
                  this.productos = this.productos.filter(codigo => hash[codigo.code]
                    ? false : hash[codigo.code] = true);

                  this.productos.forEach(cantidad => {

                    if (this.busqueda === cantidad.code) {

                      cantidad.quantityClient += 1;
                      cantidad.quantity = cantidad.quantity - 1;
                      cantidad.priceClient = response.product.priceClient * cantidad.quantityClient;
                      this.totalVenta();
                      

                      this.busqueda = '';

                    }

                  });


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
  FUNCION PARA ACTUALIZAR LOS PRODUCTOS DESPUES DE UNA VENTA
 /***********************************************/
  onSubmit(data) {
    console.log('product', this.productos);
    for (let i = 0; i <= this.productos.length; i ++) {
      console.log('i', i);
      this.productos.forEach(producto => {

        this.productService.updateProductVenta(this.token, producto).subscribe(
          response => {
            this.product = response.product;
            Swal.fire('Buen trabajo', 'La venta se realizo con éxito', 'success');
            this.productos.splice(data);
            console.log('productos', this.productos);
            this.total = 0;
            this.devuelta = null;
          },
          error => {
            console.log(error as any);
          }
        );
      });
    }
  }



  /***********************************************
   FUNCION PARA SUMAR EL TOTAL DE LA VENTA
  /***********************************************/
  totalVenta() {
    let sumar = 0;
    for (let i of this.productos) {
      sumar += i.priceClient;
      this.total = sumar;
    }
  }



}
