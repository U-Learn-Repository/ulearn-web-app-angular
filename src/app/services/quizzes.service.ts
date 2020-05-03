import { Injectable } from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import { CursoModel } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  

  cursos: CursoModel[];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {
    // console.log("ENTRO AL SERVICIO");
   }


  registrarCurso() {
    const CURSO_QUERY = gql`
    mutation {
      crearCurso(curso: {
        nombre: "PYTHON PRUEBA3"
        categoria: "PYTHON"
        duracion: 31
        idProfesor: 1
      }) {
        nombre,
        categoria,
        duracion,
        idProfesor
      }
    }
    `;
    this.apollo.mutate({
      mutation: CURSO_QUERY,
      variables:{}
    }).subscribe((data) => {
      console.log("-----------------");
      console.log(data.data);
    },(error) => {
      console.log(error);
    })
  }
}
