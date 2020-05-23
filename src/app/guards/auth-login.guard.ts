import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(private auth: LoginService, private router: Router){
  }

  canActivate():boolean {
    if(!this.auth.estaAutenticado()){
      return true;
    }else{
      this.router.navigateByUrl('/dashboard');
    }
  }
}
