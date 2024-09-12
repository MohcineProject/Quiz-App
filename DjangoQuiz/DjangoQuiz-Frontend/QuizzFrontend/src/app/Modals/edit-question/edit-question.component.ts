import { Component, TemplateRef, ViewChild } from '@angular/core';
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
 correctOption! : String ; 
 questionId! : number ; 
  @ViewChild('content') content! : TemplateRef<any>;

  constructor(private modalService: NgbModal, private quizService: QuizServiceService) { }

  ngOnInit(): void {
    console.log(this.correctOption);
  }

  // A function for opening the modal
  open () {
    this.modalService.open(this.content, {ariaLabelledBy:'modal-basic-title'});
    console.log(this.correctOption)
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.setAttribute('style', 'z-index: 105;');
    }
  }


  // A function to submit the data to the backend
  submit() {
    this.quizService.UpdateQuestion(this.questionId, this.question, this.option1 , this.option2 
      , this.option3 , this.option4 , this.correctOption )
    this.modalService.dismissAll();
  }

}
