import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [
  ]
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token; 

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.title = 'Actualizar datos';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = this.identity;
   }

  ngOnInit(): void {

  }

  onSubmit() {
    this.userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          Swal.fire('Importante', 'No existe el usuario', 'warning');
        } else {
          localStorage.setItem('identity', JSON.stringify(this.user));
          Swal.fire('Muy bien', 'El usuario se ha actualizado', 'success');
        }
      },
      error => {
        console.log(error as any);
        // if ((error as any)) {
        //   Swal.fire('Importante', 'El usuario no se ha actualizado correctamente', 'warning');
        // }
      }
    );
  }


}