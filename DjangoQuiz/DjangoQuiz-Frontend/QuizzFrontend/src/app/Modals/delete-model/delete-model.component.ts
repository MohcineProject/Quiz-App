import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { QuizServiceService } from '../../services/quiz-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-model',
  standalone: true,
  imports: [],
  templateUrl: './delete-model.component.html',
  styleUrl: './delete-model.component.scss'
})
export class DeleteModelComponent {

  @Input() id!: number ;
  @Input() target! : target ; 
  @ViewChild('content') content ! : TemplateRef<any>;


  
  constructor(private modalService: NgbModal, private quizService: QuizServiceService) { }

  open () {
    this.modalService.open(this.content, {ariaLabelledBy:'modal-basic-title'});
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.setAttribute('style', 'z-index: 105;');
    }
  }


  delete() {
    if (this.target == target.quiz) {
    this.quizService.deleteQuiz(this.id) ; 
  } else {
    this.quizService.deleteQuizQuestion(this.id) ;
  }
    this.modalService.dismissAll();
  }
}
export enum target {
  quiz = 'quiz' , 
  question = 'question',

}