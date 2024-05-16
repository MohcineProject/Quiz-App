import { Component } from '@angular/core';
import { QuizzQuestionComponent } from '../quizz-question/quizz-question.component';
import { QuizzAddQuestionComponent } from '../quizz-add-question/quizz-add-question.component';
import { QuizzQuestion } from '../interfaces/quizz-question';
import { QuizzServiceService } from '../services/quizz-service.service';

@Component({
  selector: 'app-quizz-window',
  standalone: true,
  imports: [QuizzQuestionComponent, QuizzAddQuestionComponent],
  templateUrl: './quizz-window.component.html',
  styleUrl: './quizz-window.component.scss'
})
export class QuizzWindowComponent {

  quizzQuestion! : QuizzQuestion[] | null ;

  constructor(private quizzService: QuizzServiceService) { }
  
  ngOnInit() {
    this.quizzQuestion = this.quizzService.getQuizzQuestion();
  }

  

}
