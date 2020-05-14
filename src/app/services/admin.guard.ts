import { Injectable } from '@angular/core';
import { Router, CanActivate, Routes } from '@angular/router';
import { UserService } from './user.service';


@Injectable()
export class AdminGuard implements CanActivate{

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate(){
        let identity = this.userService.getIdentity();

        if (identity && identity.role === 'ADMIN_ROLE'){
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}