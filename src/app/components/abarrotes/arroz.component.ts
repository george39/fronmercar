import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ArrozService } from '../../services/arroz.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-arroz',
  templateUrl: './arroz.component.html',
  styles: [
  ]
})
export class ArrozComponent implements OnInit {

  public title: string;
  public arroz: Product;
  public token: string;
  public url: string;

  constructor(
    private arrozService: ArrozService,
    private userService: UserService
    ) { 
      this.token = userService.getToken();
      this.url = GLOBAL;

  }

  ngOnInit(): void {
    this.getArroz();
  }


  getArroz() {
    this.arrozService.getArroz(this.token, this.arroz).subscribe(
      response => {
        this.arroz = response.arroz;
        console.log('arroz', this.arroz);
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
