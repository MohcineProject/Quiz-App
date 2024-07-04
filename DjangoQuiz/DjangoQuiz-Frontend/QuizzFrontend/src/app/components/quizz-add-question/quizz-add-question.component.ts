import { Component, Input, ViewChild } from '@angular/core';
import { AddQuestionModalComponent } from '../../Modals/add-question-modal/add-question-modal.component';
@Component({
  selector: 'app-quizz-add-question',
  standalone: true,
  imports: [AddQuestionModalComponent],
  templateUrl: './quizz-add-question.component.html',
  styleUrl: './quizz-add-question.component.scss'
})
export class QuizzAddQuestionComponent {

  @Input() quizId! : number ; 
  @ViewChild('content') content! : AddQuestionModalComponent ; 

 

  // The function responsible for adding a question to a quiz
  addQuestionToQuiz(){
    this.content.open();
  }
}
