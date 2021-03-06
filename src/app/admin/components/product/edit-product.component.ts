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
import { ArrozService } from '../../../services/arroz.service';
import { AceiteService } from '../../../services/aceite.service';



@Component({
  selector: 'app-edit-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class EditProductComponent implements OnInit {

  public title: string;
  public product: Product;
  public arroz: Product;
  public provider: Provider;
  public token;
  public seleccion;
  public url;
  public quantity: number;
  public precioMayor: number;
  public precioClient: number;
  public filesToUpload: Array<File>;
  public seleccionProducto;
  public productos: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private providerService: ProviderService,
    private userService: UserService,
    private uploadService: UploadService,
    public arrozService: ArrozService,
    public aceiteService: AceiteService
  ) {
    this.product = new Product('', '', '', '', this.quantity, this.precioMayor, this.precioClient, '');

    this.token = userService.getToken();
    this.title = 'Actualizar producto';
    this.url = GLOBAL;

    this.seleccionProducto = '';
    this.productos = ['arroz', 'aceite'];
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

          Swal.fire('Buen trabajo', 'Producto actualizado con éxito', 'success');
          this.router.navigate(['/admon/listar-productos']);
          this.uploadService.makeFileRequest( this.url + '/upload-image-product/' + this.product._id, [],
           this.filesToUpload, this.token, 'image')
          .then((result: any) => {
            this.product.image = result.image;

          });
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



  /***********************************************
   GUARDAR UN ARROZ
  /***********************************************/
  saveArroz() {
    this.product.providerId = this.seleccion;
    console.log('produc', this.product);
    this.arrozService.updateArroz(this.token, this.product).subscribe(
      response => {
        
        if (response.product) {
          this.product = response.product;          
          
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }



  /***********************************************
   GUARDAR UN ACEITE
  /***********************************************/
  saveAceite() {
    this.product.providerId = this.seleccion;
    console.log('produc', this.product);
    this.aceiteService.updateAceite(this.token, this.product).subscribe(
      response => {
        
        if (response.product) {
          this.product = response.product;          
          
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
