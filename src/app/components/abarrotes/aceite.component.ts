import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { UserService } from '../../services/user.service';
import { AceiteService } from '../../services/aceite.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-aceite',
  templateUrl: './aceite.component.html',
  styles: [
  ]
})
export class AceiteComponent implements OnInit {

  public title: string;
  public aceite: Product;
  public token: string;
  public url: string;

  constructor(
    private userService: UserService,
    private aceiteService: AceiteService
  ) {
    this.title = 'Lista de aceites';
    this.token = userService.getToken();
    this.url = GLOBAL;
   }

  ngOnInit(): void {
    this.getaceite();
  }

  getaceite() {
    this.aceiteService.getAceite(this.token).subscribe(
      response => {
        this.aceite = response.aceite;
      },
      error => {
        console.log(error as any);
      }
    )
  }

}
