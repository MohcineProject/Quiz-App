import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { QuizzQuestionComponent } from '../quizz-question/quizz-question.component';
import { QuizzAddQuestionComponent } from '../quizz-add-question/quizz-add-question.component';
import { QuizzQuestion } from '../../interfaces/quizz-question';
import { QuizServiceService } from '../../services/quiz-service.service';
import { quizz } from '../../interfaces/quizz';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EditQuizModalComponent } from '../../Modals/edit-quiz-modal/edit-quiz-modal.component';
import { EditQuestionComponent } from '../../Modals/edit-question/edit-question.component';

@Component({
  selector: 'app-quizz-window',
  standalone: true,
  imports: [QuizzQuestionComponent, QuizzAddQuestionComponent, CommonModule , EditQuestionComponent],
  templateUrl: './quizz-window.component.html',
  styleUrl: './quizz-window.component.scss'
})
export class QuizzWindowComponent {


  quiz : quizz | null  = null ;
  index : number = 0 
  @ViewChild('content') content! : EditQuestionComponent ; 


  constructor(private quizService: QuizServiceService, private cdr: ChangeDetectorRef, httpClient:HttpClient    ) { }
  

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

  modifyQuestion(){
    if (this.quiz) {
  this.content.questionId = this.quiz.quiz_questions[this.index].id! ; 
  this.content.question = this.quiz.quiz_questions[this.index].question ; 
  this.content.option1 = this.quiz.quiz_questions[this.index].option1 ; 
  this.content.option2 = this.quiz.quiz_questions[this.index].option2 ; 
  this.content.option3 = this.quiz.quiz_questions[this.index].option3 ; 
  this.content.option4 = this.quiz.quiz_questions[this.index].option4 ; 
  this.content.open() ;
}
  }
  

}
