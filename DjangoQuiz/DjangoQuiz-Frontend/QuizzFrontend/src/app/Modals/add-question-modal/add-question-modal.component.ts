import { Component,  Input,  TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizServiceService } from '../../services/quiz-service.service';
import { QuizzQuestion } from '../../interfaces/quizz-question';

@Component({
  selector: 'app-add-question-modal',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './add-question-modal.component.html',
  styleUrl: './add-question-modal.component.scss'
})
export class AddQuestionModalComponent {

  @Input() quizId! : number ; 
   option1! : String ; 
   option2! : String ; 
   option3! : String ; 
   option4! : String ; 
   question! : String ;
  @ViewChild("content") content! : TemplateRef<any> ; 

  constructor(private modalService : NgbModal , private quizService: QuizServiceService){};


// The function to open the modal to the user 
open(){
  // Use the modal service (NgbModal) to open the referenced modal "content" in the html file
  this.modalService.open(this.content , {ariaLabelledBy:'modal-basic-title'});
  // Solve a bug that happens with the modal backdrop; it appears on top of the 
  // dialog, therefore we change the z-index to display the modal correctly
  const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.setAttribute('style', 'z-index: 105;');
    }
}

// The submit function used by this modal, it executes 
// the quiz service function of updating a quiz question
submit(){
  // Construct the quizQuestion
  const quizQuestion : QuizzQuestion = {
    question : this.question , 
    option1 : this.option1 , 
    option2 : this.option2 , 
    option3 : this.option3 , 
    option4 : this.option4 , 
  }
  // Pass the id of the targeted quiz and the new quizQuestion to add 
  this.quizService.addQuizQuestion(quizQuestion, this.quizId) ; 
  // close the modal 
  this.modalService.dismissAll();
}



}
