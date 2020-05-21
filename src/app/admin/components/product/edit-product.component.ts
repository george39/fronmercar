import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { Provider } from '../../../models/Provider';
import { ProviderService } from '../../../services/provider.service';
import Swal from 'sweetalert2';
import { UploadService } from '../../../services/upload.service';
import { GLOBAL } from '../../../../../../fronmercar1/src/app/services/global';



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
  public url;
  public precioMayor: number;
  public precioClient: number;
  public filesToUpload: Array<File>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private providerService: ProviderService,
    private userService: UserService,
    private uploadService: UploadService
  ) {
    this.product = new Product('', '', '', this.precioMayor, this.precioClient, '');

    this.token = userService.getToken();
    this.title = 'Actualizar producto';
    this.url = GLOBAL;
   }

  ngOnInit(): void {
    this.getProviders();

    this.route.params.subscribe(params => {
      let id = params.id;
      this.getProduct(id);
      
    });
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
    var id = this.product;
    this.product.providerId = this.seleccion;
    this.productService.updateProduct(this.token, id).subscribe(
      response => {
        if (response.product) {
          this.product = response.product;

          this.uploadService.makeFileRequest( this.url + '/upload-image-product/' + this.product._id, [],
           this.filesToUpload, this.token, 'image')
          .then((result: any) => {
            this.product.image = result.image;
            Swal.fire('Buen trabajo', 'Producto actualizado con éxito', 'success');
            this.router.navigate(['/admon/listar-productos']);

          });
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = (fileInput.target.files as Array<File>);
  }

}
