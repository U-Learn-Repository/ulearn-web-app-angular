import { Injectable } from '@angular/core';
import {Apollo, Mutation, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import {Router, RouterModule} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userToken: string;
  username: string;
  idUser : number;
  userRol = localStorage.getItem('roleUser')



  private query: QueryRef<any>;

  constructor(private apollo: Apollo, private router: Router) {
    // console.log("ENTRO AL SERVICIO");
  }

  login($username: string, $password: string) {
    const LOGIN_QUERY = gql`
      mutation{
        login(credentials:{
          password: "${$password}",
          username: "${$username}",
          grant_type: "password"
        }){
          access_token
          token_type
          expires_in
          scope
        }
      }
    `;
    console.log(LOGIN_QUERY.loc.source.body);
    this.apollo.mutate({
      mutation: LOGIN_QUERY,
      variables: {}
    }).subscribe((data) => {
      console.log('-----------------');
      this.guardarToken(data.data['login'].access_token);
      this.guardarInfoUser($username);
      console.log(data);          
      

    }, (error) => {
      console.log(error);
      alert('Error: Datos inválidos, intente nuevamente');
    });
  }

  private busquedaRol() {
    console.log("busqueda rol");
    const $idUser = localStorage.getItem('id');
    console.log($idUser);
    const BUSQUEDA_QUERY = gql`
    query{
      obtenerRolPorId(userId:${$idUser}){
        roleName
      }
    }
    `;
    console.log(BUSQUEDA_QUERY.loc.source.body);
    this.query = this.apollo.watchQuery({
      query: BUSQUEDA_QUERY,
      variables: {}
    });
    this.query.valueChanges.subscribe((data) => {
      console.log('-----------------');      
      console.log(data);
      localStorage.setItem('roleUser', data.data['obtenerRolPorId'][0].roleName)
      window.location.href = '/dashboard';  
    }, (error) => {
      console.log(error);
      alert('Error: ERROR EN BUSQUEDA DE ROL, intente nuevamente');
    });
  }

  private async busquedaPorUsername($username: string) {
    await new Promise(() => {
      setTimeout(() => {
        const BUSQUEDA_QUERY = gql`
        query{
          buscarUsuarioPorUsername(userName:"${$username}"){
            id
            names
            idDocumment
            surnames
            username
          }
        }
        `;
        console.log(BUSQUEDA_QUERY.loc.source.body);
        this.query = this.apollo.watchQuery({
          query: BUSQUEDA_QUERY,
          variables: {}
        });
        this.query.valueChanges.subscribe((data) => {
          console.log('-----------------');      
          console.log(data);
          localStorage.setItem('names', data.data['buscarUsuarioPorUsername'].names)
          localStorage.setItem('surnames', data.data['buscarUsuarioPorUsername'].surnames)
          localStorage.setItem('id', data.data['buscarUsuarioPorUsername'].id)
          this.busquedaRol();
        }, (error) => {
          console.log(error);
          alert('Error: Datos inválidos, intente nuevamente');
        });
      })
    });
     
  }

  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken); 

    let hoy = new Date();
    hoy.setSeconds(1600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  guardarInfoUser( username: string ){
    console.log("guardarInfoUser");
    console.log(username);
    this.username = username;
    localStorage.setItem('username', username); 
    this.busquedaPorUsername(username);
  }

  estaAutenticado(): boolean{
    if(localStorage.getItem('token') !== null){
      if(localStorage.getItem('token').length < 2){
        return false;
      }
    }else{
      return false;
    }
    
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    console.log("AUTH AUTH");
    console.log(expiraDate);
    expiraDate.setTime(expira);
    console.log(expiraDate);

    if(expiraDate > new Date()){
      return true;
    }else{
      false
    }
  }

  authProfesor(): boolean {
    if(this.userRol === 'Profesor'){
      return true
    }
  }

  authEstudiante(): boolean {
    if(this.userRol === 'Estudiante'){
      return true
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roleUser');
    localStorage.removeItem('username');
    localStorage.removeItem('surnames');
    localStorage.removeItem('names');
    localStorage.removeItem('id');
    console.log("LOGOUT");
  }

}
