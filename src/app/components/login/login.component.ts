import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { 
    this.title = 'Identificate';
    this.user = new User('', '', '', '', '', '', '');

  }

  ngOnInit(): void {
    console.log(this.userService.getIdentity());
    console.log(this.userService.getToken());
    
  }
  
  onSubmit() {
    // Conseguir el usuario
    this.userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;

        if (!this.identity || !this.identity._id) {
          Swal.fire('importante', 'El  usuario no se ha logueado correctamente', 'warning');
        } else {
          this.identity.password = ':)';
          // Mostrar identity
          console.log(this.identity);
          localStorage.setItem('identity', JSON.stringify(this.identity));


          // Conseguir el token
          this.userService.signup(this.user, 'true').subscribe(
            response => {
              this.token = response.token;

              if (this.token.length <= 0) {
                Swal.fire('importante', 'El  token no se ha generado', 'warning');
              } else {
                // Mostrar token
                localStorage.setItem('token', this.token);
                this.router.navigate(['/']);
              }
            },
            error => {
              // var errorMessage = (error as any);
              console.log(error as any);
              
            }
          );

        }
        console.log('response', response);
      },
      error => {
        if ((error as any) ) {
          Swal.fire('importante', 'No te has identificado correctamente', 'warning');
        }
      }
    );

  }

}
