import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo, Mutation, QueryRef} from 'apollo-angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CertificadosService {
  texto;

  constructor(private apollo: Apollo, private router: Router) {
    // console.log("ENTRO AL SERVICIO");
  }

  obtenerCertificado($idUsuario: number, $idCurso: number) {
    const CERTIFICATE = gql`
      mutation{
        registrarCertificado( certificado:{
          IdUsuario: ${$idUsuario}
          IdCurso: ${$idCurso}
        }){
          Texto
        }

      }

    `;
    console.log(CERTIFICATE.loc.source.body);
    this.apollo.mutate({
      mutation: CERTIFICATE,
      variables: {}
    }).subscribe((data) => {
      console.log('-----------------');
      this.guardarTexto(data.data['registrarCertificado'].Texto);
      console.log('Texto en servicio: ');
      console.log(data.data['registrarCertificado'].Texto);

    }, (error) => {
      console.log(error);
      // alert('Error: Fallo en mutation');
    });
  }

  private guardarTexto( texto: string ) {
    this.texto = texto;
    localStorage.setItem('texto', texto);
  }
}
