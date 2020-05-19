import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import { ProviderService } from '../../../services/provider.service';
import { Provider } from '../../../models/Provider';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  @ViewChild('selecProveedor') selecProveedor: ElementRef;

  public title: string;
  public token;
  public identity;
  public product: Product;
  public provider: Provider;
  public precioMayor: number;
  public precioClient: number;
  public seleccion;

  public proveedor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private productService: ProductService,
    private providerService: ProviderService
  ) { 
    // this.precioClient = 0;
    // this.precioMayor = 0;
    this.product = new Product('', '', '', this.precioMayor, this.precioClient);
    this.title = 'Crear un producto';
    this.token = userService.getToken();
    this.identity = userService.getIdentity();
  }

  ngOnInit(): void {
    this.getProvider();
  }


  /***********************************************
   OBTENER TODOS LOS PROVEEDORES
  /***********************************************/
  getProvider() {
    this.providerService.getProvider(this.token).subscribe(
      response => {
        this.provider = response.provider;
        console.log('proveedor', this.provider);
      }
    );
  }



  /***********************************************
   GUARDAR UN PRODUCTO
  /***********************************************/
  onSubmit() {
    this.product.providerId = this.seleccion;
    console.log('produc', this.product);
    this.productService.saveProduct(this.token, this.product).subscribe(
      response => {
        Swal.fire('Buen trabajo', 'Producto creado con éxito', 'success');
        this.router.navigate(['/admon/listar-productos']);
      },
      error => {
        console.log(error as any);
      }
    );
  }
 
 
  

}
