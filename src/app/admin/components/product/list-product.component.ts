import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styles: [
  ]
})
export class ListProductComponent implements OnInit {

  public title: string;
  public product: Product;
  
  public token;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    
  ) { 
    this.title = 'Lista de productos';
    this.token = userService.getToken();
  }

  ngOnInit(): void {
    this.getProduct();

  }



  /***********************************************
   LISTAR TODOS LOS PRODUCTOS
  /***********************************************/
  getProduct(){
    this.productService.getProducts(this.token).subscribe(
      response => {
        this.product = response.product;
        console.log('producto', this.product);
      },
      error => {
        console.log(error as any);
      }
    );
  }


  /***********************************************
   ALERTA QUE PREGUNTA SI QUIERE BORRAR EL PRODUCTO
  /***********************************************/
  alerta(name, id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro de eliminar al producto? ' + name,
      text: "¡Si lo elimina no podrá recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          
          'success'
          ),
          this.deleteProduct(id);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El producto no se eliminará :)',
          'error'
        )
      }
    })
  }


  deleteProduct(id) {
    this.productService.deleteProduct(this.token, id).subscribe(
      response => {
        if (!response.provider) {
          Swal.fire('Atención', 'El producto no se borro', 'warning');
        }
        this.getProduct();
        Swal.fire('Buen trabajo', 'El producto se borro correctamente', 'success');

      },
      error => {
        console.log(error as any);
      }
    );
  }

}
