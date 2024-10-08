import { Component, Input, ViewChild } from '@angular/core';
import { QuizServiceService } from '../../services/quiz-service.service';
import { quizz } from '../../interfaces/quizz';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../Modals/modal/modal.component';
import { DeleteModelComponent, target } from '../../Modals/delete-modal/delete-modal.component';
import { EditQuizModalComponent } from '../../Modals/edit-quiz-modal/edit-quiz-modal.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, ModalComponent, DeleteModelComponent, EditQuizModalComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  quizzes! : quizz[] ; 
  @ViewChild('AddQuizcontent') AddQuizcontent! : ModalComponent ; 
  @ViewChild('DeleteContent') DeleteContent! : DeleteModelComponent ; 
  @ViewChild('EditQuizContent') EditQuizContent! : EditQuizModalComponent ;


  constructor( private quizService: QuizServiceService) { }


  // A lifecycle hook that requests the quizzes list to display on the side bar
  ngOnInit() {
    this.quizService.fetchQuizzees().subscribe(quizzes => this.quizzes = quizzes) ; 
    
  }

  selectQuiz( quizId : number){

      this.quizService.selectQuizz(quizId ) ; 
      
  }
  
  openAddQuizModal(){
    this.AddQuizcontent.open() ;
  }

  openDeleteModal(id : number){
    this.DeleteContent.target = target.quiz ; 
    this.DeleteContent.id = id ;
    this.DeleteContent.open() ;
    
  }

  openEditQuizModal(quizId : number){
    this.EditQuizContent.quizId = quizId ;
    this.EditQuizContent.open() ;
    
  }
  
}
