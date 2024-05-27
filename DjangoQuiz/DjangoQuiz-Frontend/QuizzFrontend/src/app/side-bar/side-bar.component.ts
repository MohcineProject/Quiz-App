import { Component, Input, ViewChild } from '@angular/core';
import { QuizServiceService } from '../services/quiz-service.service';
import { quizz } from '../interfaces/quizz';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { DeleteModelComponent } from '../delete-model/delete-model.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, ModalComponent, DeleteModelComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  quizzes! : quizz[] ; 
  @ViewChild('AddQuizcontent') AddQuizcontent! : ModalComponent ; 
  @ViewChild('DeleteContent') DeleteContent! : DeleteModelComponent ; 

  constructor( private quizService: QuizServiceService) { }

  ngOnInit() {
    this.quizService.fetchQuizzees().subscribe(quizzes => this.quizzes = quizzes) ; 
    
  }

  selectQuiz( quizId : number){

      this.quizService.selectQuizz(quizId ) ; 
      
  }
  
  openAddQuizModal(){
    this.AddQuizcontent.open() ;
  }

  openDeleteModal(quizId : number){
    this.DeleteContent.quizId = quizId ;
    this.DeleteContent.open() ;
    
  }
  
}
