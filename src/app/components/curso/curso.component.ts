import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { NgForm } from '@angular/forms';
import { CursoModel } from '../../models/curso.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  curso: CursoModel = new CursoModel();
  idCurso
 constructor (private cursosService: CursosService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.cursosService.registrarCurso();
    this.idCurso = this.route.snapshot.paramMap.get('idCurso');
    if( this.idCurso !== 'nuevo'){
      const cursoByIdPromise = this.cursosService.getCursoById(Number(this.idCurso));
      cursoByIdPromise.then(value => {
        this.curso = value;
        console.log(this.curso);
      })
    }
  }

  guardarCurso(forma: NgForm) {
    console.log(forma.value.nombre);
    console.log(forma.value.categoria);
    console.log(forma.value.duracion);
    console.log(forma.value.idProfesor);

    if(forma.invalid){
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if( this.idCurso ==='nuevo'){
      this.curso.nombre = forma.value.nombre;
      this.curso.categoria = forma.value.categoria;
      this.curso.duracion = forma.value.duracion;
      this.curso.idProfesor = forma.value.idProfesor;
      this.cursosService.guardarCurso(this.curso);
      Swal.fire({
        title: this.curso.nombre,
        text: 'Se guardó correctamente el curso',
        icon: 'success'
      }) 
    }else{
      this.curso.idCurso = this.idCurso
      this.curso.nombre = forma.value.nombre;
      this.curso.categoria = forma.value.categoria;
      this.curso.duracion = forma.value.duracion;
      this.curso.idProfesor = forma.value.idProfesor;
      this.cursosService.editarCurso(this.curso)
      Swal.fire({
        title: this.curso.nombre,
        text: 'Se actualizó correctamente el curso',
        icon: 'success'
      }) 
    } 
    
  }
}
