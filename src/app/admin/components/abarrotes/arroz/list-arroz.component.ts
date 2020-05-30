import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { ArrozService } from '../../../../services/arroz.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-list-arroz',
  templateUrl: './list-arroz.component.html',
  styles: [
  ]
})
export class ListArrozComponent implements OnInit {

  public arroz: Product;
  public token: string;

  constructor(
    private arrozService: ArrozService,
    private userService: UserService
  ) {
    this.token = userService.getToken();
   }

  ngOnInit(): void {
    this.getArroz();
  }


  /***********************************************
   LIATAR TODOS LOS ARROCES
  /***********************************************/
  getArroz() {
    this.arrozService.getArroz(this.token, this.arroz).subscribe(
      response => {
        this.arroz = response.arroz;
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
