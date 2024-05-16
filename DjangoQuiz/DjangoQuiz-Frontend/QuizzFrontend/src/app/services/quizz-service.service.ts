import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { QuizzQuestion } from '../interfaces/quizz-question';
import { quizz } from '../interfaces/quizz';

@Injectable({
  providedIn: 'root'
})
export class QuizzServiceService {
  getQuizzQuestion(): QuizzQuestion[] | null{
    if (this.quizzes) {
      return this.quizzes[this.currentID].quizzQuestions ; 
    }
    else {
      return null ;
    }

  }

  backendURL = environment.backendURL ; 
  currentID : number = 0 ; 
  quizzes : quizz[] = [];
  constructor(private httpClient : HttpClient) { }

  fetchQuizzes() : quizz[] {
    this.httpClient.get<quizz[]>(this.backendURL + '/quizzes').subscribe(quizzes => this.quizzes = quizzes) ; 
    return this.quizzes ; 

  } 

  right() : void {
    if (this.currentID < this.quizzes.length) {
    this.currentID += 1 ;
    }
  }
  left() : void {
    if (this.currentID > 0 )  {
    this.currentID -= 1 ;
    }

  
  }
  

   


}
