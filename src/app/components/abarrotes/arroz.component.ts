import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ArrozService } from '../../services/arroz.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-arroz',
  templateUrl: './arroz.component.html',
  styles: [
  ],
  providers: [UserService]
})
export class ArrozComponent implements OnInit {

  public title: string;
  public arroz: Product;
  public product: Product;
  public token: string;
  public identity;
  public url: string;

  constructor(
    private arrozService: ArrozService,
    public userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute
    ) { 
      this.token = userService.getToken();
      
      this.identity = userService.getIdentity();
      this.url = GLOBAL;

    }
    
    ngOnInit(): void {
      this.getArroz();
      this.getProduct();
  }


  getArroz() {
    
    this.arrozService.getArroz(this.token).subscribe(
      response => {
       this.arroz = response.arroz;
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
          this.deleteArroz(id);
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

  

  deleteArroz(id) {
    this.arrozService.deleteArroz(this.token, id).subscribe(
      response => {
        if (!response.product) {
          Swal.fire('Atención', 'El producto no se borro', 'warning');
        }
        this.getProduct();
        Swal.fire('Buen trabajo', 'El producto se borro correctamente', 'success');
        this.getArroz();

      },
      error => {
        console.log(error as any);
      }
    );
  }

}
