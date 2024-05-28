import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizServiceService } from '../../services/quiz-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-quiz-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-quiz-modal.component.html',
  styleUrl: './edit-quiz-modal.component.scss'
})
export class EditQuizModalComponent {

@ViewChild('content') content! : TemplateRef<any>;
description! : string ; 
title! : string ; 
@Input() quizId!: number ;



  constructor(private modalService : NgbModal, private quizService : QuizServiceService) {}

  open () {
    this.modalService.open(this.content, {ariaLabelledBy:'modal-basic-title'});
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.setAttribute('style', 'z-index: 105;');
    }
  }

  submit() {
    this.quizService.updateQuiz(this.quizId, this.title, this.description) ;
    this.modalService.dismissAll();
  }
  
}
