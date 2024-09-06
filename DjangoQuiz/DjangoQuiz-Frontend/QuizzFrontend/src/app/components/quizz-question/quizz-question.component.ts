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
  selectedOption : String | null = null ;

  checkAnswer(option: string) {
    if (option === this.question?.answer) {
      return true;
    }
    return false;
  }


  selectOption(option :String) {
    if(!this.selectedOption)
    {this.selectedOption = option;
    setTimeout(() => {
      this.selectedOption = null 
    }, 3000)}
  }

}
