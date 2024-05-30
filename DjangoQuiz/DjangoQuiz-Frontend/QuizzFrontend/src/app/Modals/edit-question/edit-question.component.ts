import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizServiceService } from '../../services/quiz-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.scss'
})
export class EditQuestionComponent {
  question! : String ; 
  option1! : String ; 
  option2! : String ; 
  option3! : String ; 
  option4! : String ; 
 questionId! : number ; 
  @ViewChild('content') content ! : TemplateRef<any>;

  constructor(private modalService: NgbModal, private quizService: QuizServiceService) { }

  open () {
    this.modalService.open(this.content, {ariaLabelledBy:'modal-basic-title'});
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.setAttribute('style', 'z-index: 105;');
    }
  }

  submit() {
    this.quizService.UpdateQuestion(this.questionId, this.question, this.option1 , this.option2 
      , this.option3 , this.option4
    )
    this.modalService.dismissAll();
  }

}
