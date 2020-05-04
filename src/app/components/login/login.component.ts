import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public title: string;
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { 
    this.title = 'Identificate';
    this.user = new User('', '', '', '', '', '', '');

  }

  ngOnInit(): void {
  }
  
  onSubmit(form) {
    console.log(this.user);
    this.userService.signup(this.user).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error as any);
      }
    );

  }

}
