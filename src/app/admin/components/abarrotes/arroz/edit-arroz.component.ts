import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { Provider } from '../../../../models/Provider';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ProviderService } from '../../../../services/provider.service';
import { UserService } from '../../../../services/user.service';
import { UploadService } from '../../../../services/upload.service';
import { ArrozService } from '../../../../services/arroz.service';
import { GLOBAL } from '../../../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-arroz',
  templateUrl: './arroz.component.html',
  styles: [
  ]
})
export class EditArrozComponent implements OnInit {

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
    public arrozService: ArrozService
  ) {
    this.arroz = new Product('', '', '', '', this.quantity, this.precioMayor, this.precioClient, '');

    this.token = userService.getToken();
    this.title = 'Actualizar producto';
    this.url = GLOBAL;

    this.seleccionProducto = '';
    this.productos = ['arroz', 'aceite'];
   }

  ngOnInit(): void {
    this.getProviders();
    this.getArroces();

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
    var id = this.arroz;
    this.arroz.providerId = this.seleccion;
    this.arrozService.updateArroz(this.token, id).subscribe(
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
   LISTAR TODO EL ARROZ
  /***********************************************/
  getArroces() {
    this.arrozService.getArroz(this.token).subscribe(
      response => {
        this.arroz = response.arroz;
      },
      error => {
        console.log(error as any);
      }
    );
  }


  /***********************************************
   GUARDAR EN PRODUCTOS
  /***********************************************/
  saveProduct() {
    this.arroz.providerId = this.seleccion;
    this.productService.saveProduct(this.token, this.arroz).subscribe(
      response => {
        
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
