import { Injectable } from '@angular/core';
import {Apollo, Mutation, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import {Router, RouterModule} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo, private router: Router) {
    // console.log("ENTRO AL SERVICIO");
  }

  login($username: string, $password: string) {
    const LOGIN_QUERY = gql`
      mutation {
        login( credentials:{
          username: "${$username}"
          password: "${$password}"

        }){
          username
        }
      }
    `;
    console.log(LOGIN_QUERY.loc.source.body);
    this.apollo.mutate({
      mutation: LOGIN_QUERY,
      variables: {}
    }).subscribe((data) => {
      console.log('-----------------');
      console.log(data.data);
      this.router.navigate(['/dashboard']);

    }, (error) => {
      console.log(error);
      alert('Error: Datos inválidos, intente nuevamente');
    });
  }

}
