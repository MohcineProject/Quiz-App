import { ChangeDetectorRef, Component } from '@angular/core';
import { QuizzQuestionComponent } from '../quizz-question/quizz-question.component';
import { QuizzAddQuestionComponent } from '../quizz-add-question/quizz-add-question.component';
import { QuizzQuestion } from '../interfaces/quizz-question';
import { QuizServiceService } from '../services/quiz-service.service';
import { quizz } from '../interfaces/quizz';

@Component({
  selector: 'app-quizz-window',
  standalone: true,
  imports: [QuizzQuestionComponent, QuizzAddQuestionComponent],
  templateUrl: './quizz-window.component.html',
  styleUrl: './quizz-window.component.scss'
})
export class QuizzWindowComponent {

  quiz : quizz | null  = null ;
  index : number = 0 
  constructor(private quizService: QuizServiceService, private cdr: ChangeDetectorRef) { }
  

  ngOnInit() {
  this.quizService.getSelectedQuizz().subscribe(quiz => this.quiz = quiz) ;   
  
  }
  right () {
    if (this.quiz) {
    const num = this.quiz?.quizzQuestions.length ; 
    if (this.index < num ) {
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
