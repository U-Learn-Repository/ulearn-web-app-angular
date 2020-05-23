import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { CursoModel } from '../../models/curso.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: CursoModel[] = [];
  curso: CursoModel;
  userRol = localStorage.getItem('roleUser')

  constructor(private cursosService: CursosService) { }

  ngOnInit() {    
    const cursosPromise = this.cursosService.getAllCursos();
    cursosPromise.then(value =>{
      this.cursos = value      
      console.log(this.cursos);
   });   
  }

  borrarCurso(curso: CursoModel, idCurso: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea borrar el curso de ${curso.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value){
        this.cursos.splice(idCurso, 1);
        this.cursosService.borrarCurso(curso.idCurso);
        Swal.fire({
          title: curso.nombre,
          text: 'Curso borrado satisfactoriamente',
          icon: 'success'
        }) 
      } 
       })
       
  }

}
