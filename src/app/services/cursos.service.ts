import { Injectable } from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import { CursoModel } from '../models/curso.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  
  curso: CursoModel;
  cursos: CursoModel[];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {
    // console.log("ENTRO AL SERVICIO");
   }

   async getCursoById(idCurso: number){
     return await new Promise<CursoModel>((resolve) => {
       setTimeout(() => {
        const CURSO_QUERY = gql`
        query{
          buscarCursoID(courseId:${idCurso}){
            idCurso
            nombre
            categoria
            duracion
            idProfesor
          }
        }
        `;
        let token = localStorage.getItem('token')
        this.query = this.apollo.watchQuery({
          query: CURSO_QUERY,
          variables: {},
          context: {
            headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
          }
        });
    
        this.query.valueChanges.subscribe(result => {
           this.curso = result.data && result.data.buscarCursoID;
           resolve(this.curso);
        });
       })
     })
    
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
      resolve(this.cursos);
     // return this.cursos
    });
  });
  })  

  }

  guardarCurso(curso: CursoModel) {
    const CURSO_QUERY = gql`
    mutation {
      crearCurso(curso: {
        nombre: "${curso.nombre}"
        categoria: "${curso.categoria}"
        duracion: ${curso.duracion}
        idProfesor: ${curso.idProfesor}
      }) {
        nombre,
        categoria,
        duracion,
        idProfesor
      }
    }
    `;
    let token = localStorage.getItem('token');
    this.apollo.mutate({
      mutation: CURSO_QUERY,
      variables:{},
      context: {
        headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
      }
    }).subscribe((data) => {
      console.log("-----------------");
      console.log(data);
    },(error) => {
      console.log(error);
    })
  }

  editarCurso(curso: CursoModel) {
    const CURSO_QUERY = gql`
    mutation {
      updateCurso(idCurso:${curso.idCurso}
        curso: {
          nombre: "${curso.nombre}"
          categoria: "${curso.categoria}"
          duracion: ${curso.duracion}
          idProfesor: ${curso.idProfesor}
      }) {
        nombre,
        categoria,
        duracion,
        idProfesor
      }
    }
    `;
    let token = localStorage.getItem('token');
    this.apollo.mutate({
      mutation: CURSO_QUERY,
      variables:{},
      context: {
        headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
      }
    }).subscribe((data) => {
      console.log("-----------------");
      console.log(data.data);
    },(error) => {
      console.log(error);
    })
  }

  borrarCurso(idCurso: number){
    const CURSO_QUERY = gql`
    mutation{
      deleteCurso(
        idCurso: ${idCurso}
      )
    }
    `;
    let token = localStorage.getItem('token');
    this.apollo.mutate({
      mutation: CURSO_QUERY,
      variables:{},
      context: {
        headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
      }
    }).subscribe((data) => {
      console.log("-----------------");
      console.log(data.data);
    },(error) => {
      console.log(error);
    })
  }
}
