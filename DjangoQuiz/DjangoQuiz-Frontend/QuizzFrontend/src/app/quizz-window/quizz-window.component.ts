import { Component } from '@angular/core';
import { QuizzQuestionComponent } from '../quizz-question/quizz-question.component';
import { QuizzAddQuestionComponent } from '../quizz-add-question/quizz-add-question.component';

@Component({
  selector: 'app-quizz-window',
  standalone: true,
  imports: [QuizzQuestionComponent, QuizzAddQuestionComponent],
  templateUrl: './quizz-window.component.html',
  styleUrl: './quizz-window.component.scss'
})
export class QuizzWindowComponent {

}
