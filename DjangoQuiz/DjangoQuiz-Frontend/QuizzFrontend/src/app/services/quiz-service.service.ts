import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { QuizzQuestion } from '../interfaces/quizz-question';
import { quizz } from '../interfaces/quizz';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  private backendURL = environment.backendURL ; 
  constructor(private httpClient : HttpClient) { }
  
  quizzes : BehaviorSubject<quizz[]> = new BehaviorSubject<quizz[]>([]);
  selectedQuiz: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  fetchQuizzees() {
    this.httpClient.get<any[]>(this.backendURL).subscribe((quizzes) => this.quizzes.next(quizzes))
    return this.quizzes.asObservable() ;
  }

  addQuizz(quizz : quizz) {
    this.httpClient.post<any>(this.backendURL, quizz).subscribe((quizzes) => this.quizzes.next(quizzes)); 

  }

  selectQuizz(quizId : number) {
    this.selectedQuiz.next(quizId);
  }
  getIdObservable(){
    return this.selectedQuiz.asObservable() ;
  }

  getSelectedQuizz() {
    const quizId = this.selectedQuiz.getValue();
    var quiz =  null; 
    this.httpClient.get<any>(this.backendURL+ quizId.toString()).subscribe(selectedQuiz => quiz = selectedQuiz ) ; 
    return quiz; 
  }

 
  



}
