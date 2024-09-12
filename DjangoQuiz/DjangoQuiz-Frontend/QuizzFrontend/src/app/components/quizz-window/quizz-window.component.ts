import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { QuizzQuestionComponent } from '../quizz-question/quizz-question.component';
import { QuizzAddQuestionComponent } from '../quizz-add-question/quizz-add-question.component';
import { QuizServiceService } from '../../services/quiz-service.service';
import { quizz } from '../../interfaces/quizz';
import { CommonModule } from '@angular/common';
import { EditQuestionComponent } from '../../Modals/edit-question/edit-question.component';
import { DeleteModelComponent, target } from '../../Modals/delete-model/delete-model.component';
import { FullscreenService } from '../../services/fullscreen.service';


/**
 * This component displays the current selected quiz questions. 
 * 
 * It enables the user to navigate and modify the questions in the quiz. 
 * It provides also the ability to add new questions to the quiz.
 * 
 */
@Component({
  selector: 'app-quizz-window',
  standalone: true,
  imports: [QuizzQuestionComponent, QuizzAddQuestionComponent, CommonModule, EditQuestionComponent, DeleteModelComponent],
  providers: [FullscreenService],
  templateUrl: './quizz-window.component.html',
  styleUrl: './quizz-window.component.scss'
})
export class QuizzWindowComponent {


  quiz: quizz | null = null;
  index: number = 0;
  isFullScreen: boolean = false;
  @ViewChild('contentEdit') contentEdit!: EditQuestionComponent;
  @ViewChild('contentDelete') contentDelete!: DeleteModelComponent;


  constructor(private quizService: QuizServiceService, private cdr: ChangeDetectorRef, private fullscreenService: FullscreenService, private elRef: ElementRef) { }



  /**
   * Initializes the component by subscribing to the quiz service and fullscreen service.
   *
   * It retrieves the selected quiz and sets the index to 0.
   * It also checks if the fullscreen mode is active and updates the isFullScreen variable accordingly.
   *
   */
  ngOnInit() {
    this.quizService.getSelectedQuizz().subscribe(quiz => {
      this.quiz = quiz;
      this.index = 0;
    }

    );
    this.fullscreenService.isFullscreen().subscribe((value) => { this.isFullScreen = value; })
  }


  /**
   * Choose the new quiz question to the right (handles limit case).
   *
   * This function increments the index of the current quiz question if it is less than the total number of questions minus one.
   * If the current index is equal to the total number of questions minus one and the quiz is not in full screen mode,
   * the index is incremented to display the QuizAddQuestion Component.
   *
   */
  right() {
    if (this.quiz) {
      const num = this.quiz.quiz_questions.length;
      if (this.index < num - 1) {
        this.index++;
      } else if (this.index == num - 1) {
        if (!this.isFullScreen) this.index++;
      }
      this.cdr.detectChanges();
    }

  }

  /**
   * Decrements the index of the current quiz question by 1 if it is greater than 0.
   * Updates the ChangeDetectorRef to detect and apply changes to the component.
   *
   */
  left() {
    if (this.index > 0) {
      this.index--;
      this.cdr.detectChanges();
    }
  }



  /**
   * Modifies the question by updating the contentEdit object with the data of the current question.
   * If the quiz is not null, it assigns the questionId, question, option1, option2, option3, option4, and correctOption
   * properties of the contentEdit object with the corresponding values from the current question in the quiz.
   * Then it opens the edit modal.
   * 
   * @remark A better method for passing the arguments is coming soon
   *
   */
  modifyQuestion() {
    if (this.quiz) {
      this.contentEdit.questionId = this.quiz.quiz_questions[this.index].id!;
      this.contentEdit.question = this.quiz.quiz_questions[this.index].question;
      this.contentEdit.option1 = this.quiz.quiz_questions[this.index].option1;
      this.contentEdit.option2 = this.quiz.quiz_questions[this.index].option2;
      this.contentEdit.option3 = this.quiz.quiz_questions[this.index].option3;
      this.contentEdit.option4 = this.quiz.quiz_questions[this.index].option4;
      this.contentEdit.correctOption = this.quiz.quiz_questions[this.index].answer;
      this.contentEdit.open();

    }
  }


  /**
   *   Deletes a question from the quiz.
   *
   * This function is used to delete a question for a quiz. We decrease 
   * the index, if it is not zero, after deletion to display another question 
   * to the user. We use the ChangeDetectorRef to detect and apply changes 
  */
  deleteQuestion() {
    if (this.quiz?.quiz_questions) {
      this.contentDelete.target = target.question;
      this.contentDelete.id = this.quiz.quiz_questions[this.index].id!;
      this.contentDelete.open();
      if (this.index != 0) {
        this.index--;
        this.cdr.detectChanges();
      }

    }
  }

  /**
   *  Toggles the fullscreen mode for the quiz window.
   * 
   *  If the current index is equal to the length of the quiz questions, 
   *  it navigates to the left to avoid displaying the Add Question Component.
   * 
   */
  async maximize() {
    await this.fullscreenService.toggleFullscreen(this.elRef.nativeElement);
    if (this.index == this.quiz?.quiz_questions.length) this.left();

  }

}


