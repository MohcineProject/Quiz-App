import { Component, Input } from '@angular/core';
import { quizz } from '../../interfaces/quizz';
import { QuizzQuestion } from '../../interfaces/quizz-question';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz-question.component.html',
  styleUrl: './quizz-question.component.scss'
})
export class QuizzQuestionComponent {
  @Input()  question : QuizzQuestion | null = null  ; 

}
