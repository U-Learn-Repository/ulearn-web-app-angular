import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nombreUsuario;
  apellidoUsuario;
  userRol = localStorage.getItem('roleUser');
  constructor() { }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('names');
    this.apellidoUsuario = localStorage.getItem('surnames');
    if (this.nombreUsuario == null) {
      this.nombreUsuario = 'USUARIO';
    }
    console.log(localStorage);
  }
}
