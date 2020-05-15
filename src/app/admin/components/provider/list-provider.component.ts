import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../models/Provider';
import { ProviderService } from '../../../services/provider.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styles: [
  ]
})
export class ListProviderComponent implements OnInit {

  public title: string;
  public provider: Provider[];
  public token;

  constructor(
    private providerService: ProviderService,
    private userService: UserService
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

}
