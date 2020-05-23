import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardProfesor implements CanActivate {
  userRol = localStorage.getItem('roleUser')

  constructor(private auth: LoginService, private router: Router){
  }

  canActivate(): boolean {
    if(this.auth.estaAutenticado() && this.auth.authProfesor()){
      return true;
    }else if(this.auth.estaAutenticado()){
      this.router.navigateByUrl('/dashboard');
    }else{
      this.router.navigateByUrl('/login');
    }
  }
}
