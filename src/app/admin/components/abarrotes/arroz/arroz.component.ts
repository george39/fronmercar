import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Provider } from '../../../../models/Provider';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { ProviderService } from '../../../../services/provider.service';
import { UploadService } from '../../../../services/upload.service';
import { GLOBAL } from '../../../../services/global';
import { ArrozService } from '../../../../services/arroz.service';
import Swal from 'sweetalert2';
import { ProductService } from '../../../../services/product.service';



@Component({
  selector: 'app-arroz',
  templateUrl: './arroz.component.html',
  styles: [
  ]
})
export class ArrozComponent implements OnInit {

  public title: string;
  public token;
  public identity;
  public arroz: Product;
  public provider: Provider;
  public quantity: number;
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
    private arrozService: ArrozService,
    private providerService: ProviderService,
    private uploadService: UploadService,
    private productService: ProductService
    
  ) { 
    // this.precioClient = 0;
    // this.precioMayor = 0;
    this.arroz = new Product('', '', '', '', this.quantity, this.precioMayor, this.precioClient, '');
    this.title = 'Crear arroz';
    this.token = userService.getToken();
    this.identity = userService.getIdentity();
    this.url = GLOBAL;
  }

  ngOnInit(): void {
    this.getProvider();
    this.getArroz();
  
    
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
    this.arroz.providerId = this.seleccion;
    console.log('produc', this.arroz);
    this.arrozService.saveArroz(this.token, this.arroz).subscribe(
      response => {
        
        if (response.arroz) {
          this.arroz = response.arroz;
          
          this.uploadService.makeFileRequest( this.url + '/upload-image-arroz/' + this.arroz._id, [],
           this.filesToUpload, this.token, 'image')
          .then((result: any) => {
            this.arroz.image = result.image;            
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


  /***********************************************
   LIATAR TODOS LOS ARROCES
  /***********************************************/
  getArroz() {
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
   FICHERO PARA SUBIR IMAGEN
  /***********************************************/
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = (fileInput.target.files as Array<File>);
  }

}
