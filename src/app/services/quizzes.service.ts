import { Injectable } from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import gql from 'graphql-tag';
import { CursoModel } from '../models/curso.model';

type Answer = {
  id: string;
  context: string;
};

type Question = {
  statement: string;
}

type Response = {
  InsertAnswer: Answer;
};

type ResponseQuestion = {
  InsertQuestion: Question
}


@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  cursos: CursoModel[];

  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  async registrarCurso(statement, answers, correct) {
    
    var ans1 = this.getQueryInsertAnswer(answers[0], correct == 1);
    var ans2 = this.getQueryInsertAnswer(answers[1], correct == 2);
    var ans3 = this.getQueryInsertAnswer(answers[2], correct == 3);
    var ans4 = this.getQueryInsertAnswer(answers[3], correct == 4);

    let token = localStorage.getItem('token')

    const result1 = await this.apollo.mutate<Response>({
      mutation: ans1,
      context: {
        headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
      }
    }).toPromise()

    console.log(result1.data)
    console.log(result1.data.InsertAnswer)
    console.log(result1.data.InsertAnswer.id)

    const result2 = await this.apollo.mutate<Response>({
      mutation: ans2,
      context: {
        headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
      }
    }).toPromise()

    const result3 = await this.apollo.mutate<Response>({
      mutation: ans3,
      context: {
        headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
      }
    }).toPromise()

    const result4 = await this.apollo.mutate<Response>({
      mutation: ans4,
      context: {
        headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
      }
    }).toPromise()

    var a1 = result1.data.InsertAnswer.id;
    var a2 = result2.data.InsertAnswer.id;
    var a3 = result3.data.InsertAnswer.id;
    var a4 = result4.data.InsertAnswer.id;

    var question = this.getMutationInsertQuestion(statement, a1, a2, a3, a4);

    const resultQuest = await this.apollo.mutate<ResponseQuestion>({
      mutation: question,
      context: {
        headers: new HttpHeaders().set("Authorization",  "Bearer " + token)
      }
    }).toPromise();

    if(resultQuest.data.InsertQuestion.statement == statement) {
      alert("Se registro correctamente");
    } else {
      alert("Ocurrio un error, no se pudo registrar el quiz")
    }
  }


  getQueryInsertAnswer(context, is_correct) {
    var ANSWER_QUERY = gql`
    mutation {
      InsertAnswer(answer: {
        context: "${context}",
        is_correct: ${is_correct}
      }) {
        id
        context
      }
    }
    `;
    return ANSWER_QUERY;
  }


  getMutationInsertQuestion(statement, ans1, ans2, ans3, ans4) {
    var QUESTION_MUTATION = gql`
    mutation {
      InsertQuestion(
        statement: "${statement}",
        score: 1,
        user_id:1,
        answers: [
          "${ans1}",
          "${ans2}",
          "${ans3}",
          "${ans4}"
        ],
        qualification: []
      ) {
        statement
      }
    }
    `;
    return QUESTION_MUTATION;
  }
}
