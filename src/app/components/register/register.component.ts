import {Component, Input, OnInit} from '@angular/core';
import { RegisterService  } from '../../services/register.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor( private registerService: RegisterService) { }

  ngOnInit() {

  }

  registrarEstudiante(form: NgForm) {
    console.log(form.value.names);
    console.log(form.value.surnames);
    console.log(form.value.id_documment);
    console.log(form.value.username);
    console.log(form.value.password1);
    this.registerService.registrarEstudiante(
      form.value.names,
      form.value.surnames,
      form.value.id_documment,
      form.value.username,
      form.value.password1);
  }
}
