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
  selectedQuiz: BehaviorSubject<quizz | null> = new BehaviorSubject<quizz |null>(null);
  quizId: number = 0 ; 
  fetchQuizzees() {
    this.httpClient.get<any[]>(this.backendURL).subscribe((quizzes) => {
      this.quizzes.next(quizzes);
      this.selectedQuiz.next(this.quizzes.getValue()[this.quizId]) ;
      
    });    
    return this.quizzes.asObservable() ;
  }

  addQuizz(quiz : quizz) {
    this.httpClient.post<any>(this.backendURL, quiz).subscribe((quizzes) =>{
     this.quizzes.next(quizzes) ; 
     console.log(quizzes) ; 
    
    }); 

  }

  selectQuizz(quizId : number) {
this.quizId = quizId;
  this.selectedQuiz.next(this.quizzes.getValue()[quizId]) ;  

}

  

  getSelectedQuizz() {
    
    
    return this.selectedQuiz; 
  }

 
  



}
