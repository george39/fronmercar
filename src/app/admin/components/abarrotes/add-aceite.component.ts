import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AceiteService } from '../../../services/aceite.service';
import { Product } from '../../../models/product';
import { Provider } from '../../../models/Provider';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from '../../../services/provider.service';
import { UploadService } from '../../../services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-aceite',
  templateUrl: './add-aceite.component.html',
  styles: [
  ]
})
export class AddAceiteComponent implements OnInit {

  public title: string;
  public token;
  public identity;
  public aceite: Product;
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
    private aceiteService: AceiteService,
    private providerService: ProviderService,
    private uploadService: UploadService
    
  ) { 
    // this.precioClient = 0;
    // this.precioMayor = 0;
    this.aceite = new Product('', '', '', this.precioMayor, this.precioClient, '');
    this.title = 'Crear aceite';
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
    this.aceite.providerId = this.seleccion;
    console.log('produc', this.aceite);
    this.aceiteService.saveAceite(this.token, this.aceite).subscribe(
      response => {
        
        if (response.aceite) {
          this.aceite = response.aceite;
          
          this.uploadService.makeFileRequest( this.url + '/upload-image-aceite/' + this.aceite._id, [],
           this.filesToUpload, this.token, 'image')
          .then((result: any) => {
            this.aceite.image = result.image;            
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
