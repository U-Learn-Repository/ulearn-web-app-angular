import { Injectable } from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registro: any[] = [];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {
    console.log('ENTRO AL SERVICIO DE REGISTRO');
  }
  buscarUsuario(userId: number) {
    const REGISTER_QUERY = gql`
      query{
        buscarUsuario(userId: ${userId}){
          names
          id
          idDocumment
        }
      }
    `;
    this.query = this.apollo.watchQuery({
      query: REGISTER_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.registro = result.data && result.data.employees;
      console.log(result);
    });
  }
}
