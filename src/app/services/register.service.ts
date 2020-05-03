import { Injectable } from '@angular/core';
import {Apollo, Mutation, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';



@Injectable({
  providedIn: 'root'
})

export class RegisterService extends Mutation {
  registrarEstudiante($names: string, $surnames: string, $id_documment: number, $username: string, $password: string) {
    const REGISTRAR_QUERY = gql`
      mutation {
        registrarEstudiante( user:{
          names: "${$names}"
          surnames: "${$surnames}"
          id_documment: ${$id_documment}
          username: "${$username}"
          password: "${$password}"

        }){
          username
        }
      }
    `;
    console.log(REGISTRAR_QUERY.loc.source.body);
    console.log($names, $surnames, $id_documment, $username, $password);
    this.apollo.mutate({
      mutation: REGISTRAR_QUERY,
      variables: {}
    }).subscribe((data) => {
      console.log('-----------------');
      console.log(data.data);
    }, (error) => {
      console.log(error);
    });
  }

}

