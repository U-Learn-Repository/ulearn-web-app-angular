import {Component, Input, OnInit} from '@angular/core';
import { RegisterService  } from '../../services/register.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor( private registerService: RegisterService) { }

  ngOnInit() {

  }

  checkForm(form: NgForm) {
    if (form.value.Role === '') {
      alert ('Error: Debes seleccionar si registrarte como profesor o estudiante');
      return false;
    }
    if (form.value.username === '') {
      alert('Error: Nombre de usuario no puede estar vacío');
      return false;
    }
    if (form.value.username.length > 10) {
      alert('Error: El nombre de usuario debe ser de menos de 10 caracteres');
      return false;
    }
    if (form.value.names === '') {
      alert('Error: Nombres no puede estar vacío');
      return false;
    }
    if (form.value.surnames === '') {
      alert('Error: Apellidos no puede estar vacío');
      return false;
    }
    if (form.value.id_documment === '') {
      alert('Error: Documento de identidad no puede estar vacío');
      return false;
    }

    const re = /^\w+$/;
    if (!re.test(form.value.username)) {
      alert('Error: El nombre de usuario debe contenter sólo letras, números y guiones bajos.');
      return false;
    }
    console.log(form.value.password1);
    console.log(form.value.password2);
    if (form.value.password1 !== '' && form.value.password1 === form.value.password2) {
      // tslint:disable-next-line:no-shadowed-variable
      let re = /[0-9]/;
      if (!re.test(form.value.password1)) {
        alert('Error: La contraseña debe tener al menos un número');
        return false;
      }
      re = /[a-z]/;
      if (!re.test(form.value.password1)) {
        alert('Error: La contraseña debe tener al menos una letra minúscula');
        return false;
      }
      re = /[A-Z]/;
      if (!re.test(form.value.password1)) {
        alert('Error: La contraseña debe tener al menos una letra mayúscula');
        return false;
      }
    } else {
      alert('Error: Por favor verifica que ingresaste y confirmaste tu contraseña correctamente');
      return false;
    }
    return true;
  }

  registrar(form: NgForm) {
    console.log('En registrar');
    if (this.checkForm(form)) {
      console.log(form.value.Role);
      if (form.value.Role === 'Profesor') {
          this.registrarProfesor(form);
      } else if (form.value.Role === 'Estudiante') {
          this.registrarEstudiante(form);
      }
    }
  }

  registrarEstudiante(form: NgForm) {
    console.log('En registrar estudiante');
    if (this.checkForm(form)) {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando informacion',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
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
        Swal.fire({
          title: form.value.names,
          text: 'Se registró correctamente',
          icon: 'success'
        });
    }
  }


  registrarProfesor(form: NgForm) {
    console.log('En registrar profesor');
    if (this.checkForm(form)) {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando informacion',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      console.log(form.value.names);
      console.log(form.value.surnames);
      console.log(form.value.id_documment);
      console.log(form.value.username);
      console.log(form.value.password1);
      this.registerService.registrarProfesor(
        form.value.names,
        form.value.surnames,
        form.value.id_documment,
        form.value.username,
        form.value.password1);
      Swal.fire({
        title: form.value.names,
        text: 'Se registró correctamente',
        icon: 'success'
      });
    }
  }

}
