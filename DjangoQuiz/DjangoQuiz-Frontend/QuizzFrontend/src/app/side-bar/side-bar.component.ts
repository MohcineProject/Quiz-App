import { Component, Input } from '@angular/core';
import { QuizzServiceService } from '../services/quizz-service.service';
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
  constructor( private quizzService: QuizzServiceService) { }

  ngOnInit() {
    this.quizzes = this.quizzService.fetchQuizzes() ; 
  }

  
}
