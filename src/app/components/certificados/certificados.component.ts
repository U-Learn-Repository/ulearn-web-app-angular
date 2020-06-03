import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {NgForm} from '@angular/forms';
import {CertificadosService} from '../../services/certificados.service';
import { Resume } from './resume';
import {NULL_EXPR} from '@angular/compiler/src/output/output_ast';


pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.scss']
})
export class CertificadosComponent implements OnInit {
  idUsuario;
  nombreUsuario;
  apellidoUsuario;
  texto;
  resume = new Resume();


  constructor( private certificadosService: CertificadosService) { }

  ngOnInit() {
    this.idUsuario = localStorage.getItem('id');
    this.nombreUsuario = localStorage.getItem('names');
    this.apellidoUsuario = localStorage.getItem('surnames');

  }
  certificado(form: NgForm) {
    console.log("IdUsuario");
    console.log(this.idUsuario);
    console.log(form.value.courseId);
    this.certificadosService.obtenerCertificado(
      this.idUsuario,
      form.value.courseId
      );
    this.texto = localStorage.getItem('texto');
    console.log("Texto en componente: ")
    console.log(localStorage.getItem('texto'));
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }

  getDocumentDefinition() {
    const d = new Date();
    const img = this.convertImg();




    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'Certificado U_Learn',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: this.texto,
          bold: true,
          fontSize: 16,
          alignment: 'justify',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'Certificado generado el: ' + d.getDay() + ' del mes ' + d.getMonth() + ' del ' + d.getFullYear() +
            ' por petición del usuario.',
          bold: true,
          fontSize: 10,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          // image: 'U_Learn_Logo.png',
        }
        ],
      styles: {
        name: {
          fontSize: 16,
          bold: true
        }
      }
    };
  }

  async convertImg() {
    try {
      let canvas = document.createElement('canvas');
      const img = document.createElement('img');
      img.src = '../assets/img/U_Learn_Logo.png';
      img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        const dataURL = canvas.toDataURL('image/png');
        canvas = null;
        return dataURL;
      };
    } catch (e) {
      console.log('error while processing base64 conversion>>>', e)
    }
  }

}

