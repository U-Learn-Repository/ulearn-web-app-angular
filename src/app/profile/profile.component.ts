import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nombreUsuario
  apellidoUsuario
  username
  constructor() { }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('names'); 
    this.apellidoUsuario = localStorage.getItem('surnames');
    this.username = localStorage.getItem('username');
  }
}