import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../models/Provider';
import { ProviderService } from '../../../services/provider.service';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styles: [
  ]
})
export class ListProviderComponent implements OnInit {

  public title: string;
  public provider: Provider;
  public token;

  constructor(
    private providerService: ProviderService,
    private userService: UserService,
    private router: Router
  ) { 
    this.token = userService.getToken();
    this.title = 'Listado de proveedores';
  }

  ngOnInit(): void {
    this.getProvider();
  }

  getProvider() {
    this.providerService.getProvider(this.token).subscribe(
      response => {

        if (!response.provider) {

        } else {
          this.provider = response.provider;
          console.log('proveedores', this.provider);
        }
      },
       error => {
        console.log(error as any);
      }
    );
  }


  alerta(name, id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro de eliminar al proveedor? ' + name,
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
          this.delteProvider(id);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El proveedor no se eliminará :)',
          'error'
        )
      }
    })
  }
  
  delteProvider(id) {
    console.log('id', id);
    this.providerService.deleteProvider(this.token, id).subscribe(
      response => {
        if (!response.provider) {
          Swal.fire('Atención', 'El proveedor no se borro', 'warning');
        }
        this.getProvider();
        Swal.fire('Buen trabajo', 'El proveedor se borro correctamente', 'success');
        console.log('nada');
        
      },
      error => {
        console.log(error as any);
      }
    );
  }
  

}
