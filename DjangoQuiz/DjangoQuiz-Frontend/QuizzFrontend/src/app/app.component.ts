import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { QuizzWindowComponent } from './quizz-window/quizz-window.component';
import { QuizzServiceService } from './services/quizz-service.service';
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
  quizzes! : quizz[] ; 
  constructor(private quizzService : QuizzServiceService) {  }
  

  ngOnInit() {
     this.quizzes = this.quizzService.fetchQuizzes()  ; 

  }


}
