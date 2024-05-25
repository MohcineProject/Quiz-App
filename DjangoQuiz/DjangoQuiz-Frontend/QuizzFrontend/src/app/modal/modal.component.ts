import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { quizz } from '../interfaces/quizz';
import { FormsModule } from '@angular/forms';
import { QuizServiceService } from '../services/quiz-service.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  quiz! : quizz ; 
  title!: string ; 
  description! : string ; 
  question! : String ; 
  option1! : String ; 
  option2! : String ; 
  option3! : String ; 
  option4! : String ; 


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
    this.quiz = {
      
      title : this.title, 
      description : this.description, 
      quiz_questions : [{
        question : this.question, 
        option1 : this.option1, 
        option2 : this.option2, 
        option3 : this.option3, 
        option4 : this.option4, 
      }] 
  } ;
  this.quizService.addQuizz(this.quiz) ; 
  this.modalService.dismissAll() ;
}

}
