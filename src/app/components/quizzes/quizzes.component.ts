import { Component, OnInit } from '@angular/core';
import { QuizzesService } from '../../services/quizzes.service'
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  statement: string = '';
  err: string = '';

  ans1: string = '';
  ans2: string = '';
  ans3: string = '';
  ans4: string = '';

  radio: number = 1;

  constructor(private quizzesService: QuizzesService) { }

  ngOnInit() {}

  onClickMe() {
    console.log("statement " + this.statement)
    console.log("ans1 " + this.ans1)
    console.log("ans2 " + this.ans2)
    console.log("ans3 " + this.ans3)
    console.log("ans4 " + this.ans4)
    console.log("radio " + this.radio)

    if(this.statement==='' || this.ans1==='' || this.ans2==='' || this.ans3==='' || this.ans4=='') {
      this.err = "Todos los campos son obligatorios";
    } else {
      this.err = "";

      var answers = [this.ans1, this.ans2, this.ans3, this.ans4];

      var correct = this.radio;

      this.quizzesService.registrarCurso(this.statement, answers, correct);
    }
  }

  onClick(element) {
    this.radio = parseInt(element);
  }

}
