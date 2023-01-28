import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  public getAllQuestions(qId: number) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }

  public getAllQuestionsForTest(qId: number) {
    return this._http.get(`${baseUrl}/question/quiz/${qId}`);
  }

  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  public getQuestion(qusId: number) {
    return this._http.get(`${baseUrl}/question/${qusId}`);
  }

  public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(qusId: number) {
    return this._http.delete(`${baseUrl}/question/${qusId}`);
  }

  public evalQuiz(questions: any) {
    return this._http.post(`${baseUrl}/question/evalQuiz`, questions);
  }
}
