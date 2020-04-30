import { Injectable } from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  

  cursos: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {
    console.log("ENTRO AL SERVICIO");
   }

   getCursoById(idCurso: number){
    const CURSOS_QUERY = gql`
    query{
      buscarCursoID(courseId:${idCurso}){
        idCurso
        nombre
        categoria
        duracion
      }
    }
    `;
    this.query = this.apollo.watchQuery({
      query: CURSOS_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.cursos = result.data && result.data.employees;
      console.log(result);
    });
  }

  getAllCursos(){
    const CURSOS_QUERY = gql`
    query{
      listarCursos{
        idCurso,
        nombre,
        categoria,
        duracion,
        idProfesor
      }
    }
    `;
    this.query = this.apollo.watchQuery({
      query: CURSOS_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.cursos = result.data && result.data.employees;
      console.log(result);
    });
  }
}
