import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { QuizzWindowComponent } from './components/quizz-window/quizz-window.component';
import { QuizServiceService } from './services/quiz-service.service';
import { CommonModule } from '@angular/common';
import { quizz } from './interfaces/quizz';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizzWindowComponent, CommonModule, SideBarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'QuizzFrontend';
  


}
