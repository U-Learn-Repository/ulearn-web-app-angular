import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { CursoModel } from '../../models/curso.model';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: CursoModel[] = []

  constructor(private cursosService: CursosService) { }

  ngOnInit() {    
    this.cursosService.getCursoById(3);
    const cursosPromise = this.cursosService.getAllCursos();
    // console.log("ASDASD");
   // console.log(this.cursosService.getCursoById(3));
   cursosPromise.then(value =>{
      this.cursos = value      
      console.log(this.cursos);
   });   
  }

}
