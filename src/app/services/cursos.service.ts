import { Injectable } from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import { CursoModel } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  

  cursos: CursoModel[];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {
    // console.log("ENTRO AL SERVICIO");
   }

   getCursoById(idCurso: number){
    let cursosTemp: CursoModel[]
    const CURSO_QUERY = gql`
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
      query: CURSO_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
       this.cursos = result.data && result.data.buscarCursoID;
       //console.log(this.cursos);
       cursosTemp = this.cursos
    });
    console.log("busqueda por ID");
    console.log(cursosTemp);
  }

    async getAllCursos(){

    return await new Promise<CursoModel[]>((resolve) => {
      setTimeout(() => {   
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
      this.cursos =  result.data && result.data.listarCursos;        
      resolve(this.cursos)
     // return this.cursos
    });
  });
  })  

  }
}
