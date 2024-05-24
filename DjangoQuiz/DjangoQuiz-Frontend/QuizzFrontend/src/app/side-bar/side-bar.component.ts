import { Component, Input } from '@angular/core';
import { QuizServiceService } from '../services/quiz-service.service';
import { quizz } from '../interfaces/quizz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  quizzes! : quizz[] ; 
  constructor( private quizService: QuizServiceService) { }

  ngOnInit() {
    this.quizService.fetchQuizzees().subscribe(quizzes => this.quizzes = quizzes) ; 
    
  }

  selectQuiz( quizId : number){

      this.quizService.selectQuizz(quizId ) ; 
      
  }
  
  test(){
    console.log(this.quizzes) ; 
  }
  
}
