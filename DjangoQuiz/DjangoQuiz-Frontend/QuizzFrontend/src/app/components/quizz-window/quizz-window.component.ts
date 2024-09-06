import { ChangeDetectorRef, Component,  ViewChild } from '@angular/core';
import { QuizzQuestionComponent } from '../quizz-question/quizz-question.component';
import { QuizzAddQuestionComponent } from '../quizz-add-question/quizz-add-question.component';
import { QuizServiceService } from '../../services/quiz-service.service';
import { quizz } from '../../interfaces/quizz';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EditQuestionComponent } from '../../Modals/edit-question/edit-question.component';
import { DeleteModelComponent, target } from '../../Modals/delete-model/delete-model.component';
@Component({
  selector: 'app-quizz-window',
  standalone: true,
  imports: [QuizzQuestionComponent, QuizzAddQuestionComponent, CommonModule , EditQuestionComponent, DeleteModelComponent],
  templateUrl: './quizz-window.component.html',
  styleUrl: './quizz-window.component.scss'
})
export class QuizzWindowComponent {


  quiz : quizz | null  = null ;
  index : number = 0 
  @ViewChild('contentEdit') contentEdit! : EditQuestionComponent ; 
  @ViewChild('contentDelete') contentDelete! : DeleteModelComponent ;


  constructor(private quizService: QuizServiceService, private cdr: ChangeDetectorRef, httpClient:HttpClient    ) { }
  

  ngOnInit() {
  this.quizService.getSelectedQuizz().subscribe(quiz => {
    
    this.quiz = quiz; 
    this.index = 0 ;
  }
  );  
  
  }
  // Choose the new quiz question to the right (handles limit case)
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



  // A function to open the edit modal for editing a question, we pass 
  // the data of the initial question to be displayed in the inputs of the modal
  modifyQuestion(){
    if (this.quiz) {
  this.contentEdit.questionId = this.quiz.quiz_questions[this.index].id! ; 
  this.contentEdit.question = this.quiz.quiz_questions[this.index].question ; 
  this.contentEdit.option1 = this.quiz.quiz_questions[this.index].option1 ; 
  this.contentEdit.option2 = this.quiz.quiz_questions[this.index].option2 ; 
  this.contentEdit.option3 = this.quiz.quiz_questions[this.index].option3 ; 
  this.contentEdit.option4 = this.quiz.quiz_questions[this.index].option4; 
  this.contentEdit.correctOption = this.quiz.quiz_questions[this.index].answer;
  this.contentEdit.open() ;
  
}
  }
  
// This function is used to delete a question for a quiz. We decrease 
// the index, if it is not zero, after deletion to display another question 
// to the user. We use the ChangeDetectorRef to detect and apply changes  
   deleteQuestion() {
    if (this.quiz?.quiz_questions ) {
      this.contentDelete.target = target.question ; 
      this.contentDelete.id = this.quiz.quiz_questions[this.index].id! ; 
      this.contentDelete.open() ; 
      if (this.index != 0) {
        this.index-- ;
        this.cdr.detectChanges() ;
      }

    }
  }

}
