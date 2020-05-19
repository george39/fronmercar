import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { Provider } from '../../../models/Provider';
import { ProviderService } from '../../../services/provider.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-edit-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class EditProductComponent implements OnInit {

  public title: string;
  public product: Product;
  public provider: Provider;
  public token;
  public seleccion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private providerService: ProviderService,
    private userService: UserService
  ) {
    this.token = userService.getToken();
    this.title = 'Actualizar producto';
   }

  ngOnInit(): void {
    this.getProviders();

    this.route.params.subscribe(params => {
      let id = params.id;
      this.getProduct(id);
      
    })
  }


  getProviders() {
    this.providerService.getProvider(this.token).subscribe(
      response => {
        this.provider = response.provider;
      },
      error => {
        console.log(error as any);
      }
    );
  }

  getProduct(id) {
    this.productService.getProduct(this.token, id).subscribe(
      response => {
        this.product = response.product;
        console.log('producto', this.product);

      },
      error => {
        console.log(error as any);
      }
    );
  }


  onSubmit() {
    
    this.product.providerId = this.seleccion;
    this.productService.updateProduct(this.token, this.product).subscribe(
      response => {
        if (!response.product) {

        } else {
          this.product = response.product;
          Swal.fire('Buen trabajo', 'El prodcto fue actualizado correctamente', 'success');
          this.router.navigate(['/admon/listar-productos']);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
