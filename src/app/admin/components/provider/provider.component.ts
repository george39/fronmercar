import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ProviderService } from '../../../services/provider.service';
import { Provider } from '../../../models/Provider';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styles: [
  ]
})
export class ProviderComponent implements OnInit {

  public title: string;
  public provider: Provider;
  public identity;
  public token;

  constructor(
    private userService: UserService,
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.title = 'Crear un proveedor';
    this.provider = new Provider('', '', '');
    this.identity = userService.getIdentity();
    this.token = userService.getToken();
   }

  ngOnInit(): void {
  }

  onSubmit() {
    
    this.providerService.saveProvider(this.token, this.provider).subscribe(
      response => {
        Swal.fire('BUEN TRABAJO', 'El usuario ha sido creado', 'success');
      },
      error => {

        console.log(error as any);
      }
    );
  }

}
