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

  @Input() quizId!: number ;

  
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
    this.quizService.deleteQuiz(this.quizId) ; 
    this.modalService.dismissAll();
  }
}
