import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  public status: string;
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) { 

  }


  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit(): void {

    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null),
    },  {validators: this.sonIguales('password', 'password2')});
  }

  

  onSubmit() {
    if (this.forma.invalid) {
      Swal.fire('importante', 'Faltan campos por llenar', 'warning');
    }

    
    
    let user = new User(
      '',
      this.forma.value.name,
      this.forma.value.surname,
      this.forma.value.address,
      this.forma.value.email,
      this.forma.value.password
      );

    
    this.userService.saveUser(user).subscribe( resp => {
      Swal.fire('Bien hecho', 'El usuario fue creado correctamente', 'success');
      this.router.navigate(['/login']);
      console.log(resp);
    });
  }
 
  

}
