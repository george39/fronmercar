import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../models/Provider';
import { ProviderService } from '../../../services/provider.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-provider',
  templateUrl: './provider.component.html',
  styles: [
  ]
})
export class EditProviderComponent implements OnInit {

  public title: string;
  public provider: Provider;  
  public token;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
    private userService: UserService
  ) {
    this.title = 'Editar proveedor';
    // this.provider = new Provider('', '', '', '');
    this.token = this.userService.getToken();
    
    this.url = GLOBAL;
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params.id;
      console.log('params', id);
      this.getProvider(id);
    });
  }

  getProvider(id) {
    

      this.providerService.getProviderUnico(this.token, id).subscribe(
        response => {
  
          if (!response.provider) {
            this.router.navigate(['/']);
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

  onSubmit() {
    
    this.providerService.updateProvider(this.token, this.provider).subscribe(
      response => {
        if (!response.provider) {
          
        } else {
          this.provider = response.provider;
          Swal.fire('BUEN TRABAJO', 'El usuario ha sido actualizado', 'success');
          this.router.navigate(['/admon/listar-proveedores']);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }
  

}
