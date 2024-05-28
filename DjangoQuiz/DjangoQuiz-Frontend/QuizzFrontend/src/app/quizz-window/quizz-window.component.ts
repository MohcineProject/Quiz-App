import { ChangeDetectorRef, Component } from '@angular/core';
import { QuizzQuestionComponent } from '../quizz-question/quizz-question.component';
import { QuizzAddQuestionComponent } from '../quizz-add-question/quizz-add-question.component';
import { QuizzQuestion } from '../interfaces/quizz-question';
import { QuizServiceService } from '../services/quiz-service.service';
import { quizz } from '../interfaces/quizz';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz-window',
  standalone: true,
  imports: [QuizzQuestionComponent, QuizzAddQuestionComponent, CommonModule],
  templateUrl: './quizz-window.component.html',
  styleUrl: './quizz-window.component.scss'
})
export class QuizzWindowComponent {


  quiz : quizz | null  = null ;
  index : number = 0 

  constructor(private quizService: QuizServiceService, private cdr: ChangeDetectorRef, httpClient:HttpClient) { }
  

  ngOnInit() {
  this.quizService.getSelectedQuizz().subscribe(quiz => {
    
    this.quiz = quiz;
    this.index = 0 ; 
  }
  );  
  
  }
  right () {
    if (this.quiz) {
    const num = this.quiz.quiz_questions.length ; 
    if (this.index <= num - 1) {
    this.index++ ;
    this.cdr.detectChanges() ; 
    
  } 
    }

  }
  left () { 
    if (this.index > 0) {
    this.index-- ;
    this.cdr.detectChanges() ; 
  }
  }

  

}
