import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import { ProviderService } from '../../../services/provider.service';
import { Provider } from '../../../models/Provider';
import { UploadService } from '../../../services/upload.service';
import { GLOBAL } from '../../../services/global';



import Swal from 'sweetalert2';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ],
  providers: [UploadService]
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
  public filesToUpload: Array<File>;
  public url: string;

  public proveedor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private productService: ProductService,
    private providerService: ProviderService,
    private uploadService: UploadService
    
  ) { 
    // this.precioClient = 0;
    // this.precioMayor = 0;
    this.product = new Product('', '', '', this.precioMayor, this.precioClient, '');
    this.title = 'Crear un producto';
    this.token = userService.getToken();
    this.identity = userService.getIdentity();
    this.url = GLOBAL;
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
        
        if (response.product) {
          this.product = response.product;
          
          this.uploadService.makeFileRequest( this.url + '/upload-image-product/' + this.product._id, [],
           this.filesToUpload, this.token, 'image')
          .then((result: any) => {
            this.product.image = result.image;            
            Swal.fire('Buen trabajo', 'Producto creado con éxito', 'success');
            this.router.navigate(['/admon/listar-productos']);


            
          });
        }



      },
      error => {
        console.log(error as any);
      }
    );
  }

  /***********************************************
   FICHERO PARA SUBIR IMAGEN
  /***********************************************/
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = (fileInput.target.files as Array<File>);
  }
 
}
