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

  public title: string;
  public token;
  public product: Product;
  public prod: any[];
  public dataarray: any[];
  public precioCliente: string[];
  public nombre: string[];
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
    this.dataarray = new Array();
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
    //this.getProduct();
    
    this.nombre.push(this.name.nativeElement.value);
    this.precioCliente.push(this.priceClient.nativeElement.value);
    this.prod.push(this.name.nativeElement.value);
    this.dataarray.push(this.prod);

    //this.addItems();
    this.busqueda = '';
    console.log('arrayitems ingreso', this.dataarray);
    console.log('prod', this.prod);
  }
  
  /***********************************************
   REMOVER ITEMS
   /***********************************************/
  removeForm(index) {
       
     this.nombre.splice(index, 1);
     this.precioCliente.splice(index, 1);
     this.dataarray.splice(index, 1);

    //  for (var i = 0; i < this.prod.length; i++) {
    //     console.log('i', i);
    //     this.prod.splice(index[i], 1);
    //     console.log('prod for', this.prod);
    //  }
     this.prod.splice(index, 1);
     console.log('prod borrado', this.prod);
     console.log('dataarray borrado', this.dataarray);
     
    }
    
    onSubmit() {
      console.log('datos', this.dataarray);
      console.log('datos2', this.prod);
    }
    
    
    addItems() {
    
    this.nombre.push(this.name.nativeElement.value);
    this.precioCliente.push(this.priceClient.nativeElement.value);
    this.prod.push(this.name.nativeElement.value);
    this.prod.push(this.priceClient.nativeElement.value);
    console.log('prod', this.prod);
  }

}
