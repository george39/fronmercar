import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { UserService } from '../../services/user.service';
import { AceiteService } from '../../services/aceite.service';
import { GLOBAL } from '../../services/global';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceite',
  templateUrl: './aceite.component.html',
  styles: [
  ]
})
export class AceiteComponent implements OnInit {

  public title: string;
  public aceite: Product;
  public product: Product;
  public token: string;
  public url: string;
  public identity;

  constructor(
    private userService: UserService,
    private aceiteService: AceiteService,
    private productService: ProductService
    
  ) {
    this.title = 'Lista de aceites';
    this.token = userService.getToken();
    this.identity = userService.getIdentity();
    this.url = GLOBAL;
   }

  ngOnInit(): void {
    this.getAceite();
    this.getProduct();
  }

  getAceite() {
    this.aceiteService.getAceite(this.token).subscribe(
      response => {
        this.aceite = response.aceite;
        console.log('aceite', this.aceite);
      },
      error => {
        console.log(error as any);
      }
    );
  }


  getProduct() {
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
      title: '¿Esta seguro de eliminar el producto? ' + name,
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
          this.deleteAceite(id);
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


  deleteAceite(id) {
    this.aceiteService.deleteAceite(this.token, id).subscribe(
      response => {
        if (!response.product) {
          Swal.fire('Atención', 'El producto no se borro', 'warning');
        }
        this.getProduct();
        Swal.fire('Buen trabajo', 'El producto se borro correctamente', 'success');
        this.getAceite();

      },
      error => {
        console.log(error as any);
      }
    );
  }

}
