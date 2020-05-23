import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../services/login.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private loginService: LoginService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form.value.username);
    console.log(form.value.password);
    this.loginService.login(
      form.value.username,
      form.value.password);
   // this.loginService.guardarInfoUser(form.value.username);

  }
}
