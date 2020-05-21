import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styles: [
  ],
  providers: [ProductService]
})
export class DetailProductComponent implements OnInit {

  public title: string;
  public product: Product;
  public url: string;
  public token;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productServicer: ProductService,
    private userService: UserService
  ) {
    this.title = 'Detalles del prodcuto';
    this.token = userService.getToken();
    this.url = GLOBAL;
   }

  ngOnInit(): void {
    
    this.getProduct();
  }

  getProduct() {
    this.route.params.subscribe(params => {
      let id = params.id;
      
      this.productServicer.getProduct(this.token, id).subscribe(
        response => {
          if (!response.product){
            this.router.navigate(['/admon/listar-productos']);
          } else {
            this.product = response.product;
          }
        },
        error => {
          console.log(error as any);
        }
      );

    });
  }

}
