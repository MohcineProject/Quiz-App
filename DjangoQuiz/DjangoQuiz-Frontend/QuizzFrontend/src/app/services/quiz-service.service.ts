import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { QuizzQuestion } from '../interfaces/quizz-question';
import { quizz } from '../interfaces/quizz';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  private backendURL = environment.backendURL ; 
  private backendURLQuestions = environment.backendURLQuestions ; 
  constructor(private httpClient : HttpClient) { }
  
  quizzes : BehaviorSubject<quizz[]> = new BehaviorSubject<quizz[]>([]);
  selectedQuiz: BehaviorSubject<quizz | null> = new BehaviorSubject<quizz |null>(null);
  quizId: number = 0 ; 


  // A function to retrieve the quizzes from the server
  fetchQuizzees() {
    this.httpClient.get<any[]>(this.backendURL).subscribe((quizzes) => {
      this.quizzes.next(quizzes);
      this.selectedQuiz.next(this.quizzes.getValue()[this.quizId]) ;
      
    });    
    return this.quizzes.asObservable() ;
  }

  // A function to add a quiz 
  addQuizz(quiz : quizz) {
    // Send the post request to the server with the quiz data 
    this.httpClient.post<any>(this.backendURL, quiz).subscribe((quizzes) => {
      // Update the quizzes observable with the new list of data
     this.quizzes.next(quizzes) ; 
    
    }); 

  }

  // A funtion to update the selecte quiz observable for the subscribed components
  selectQuizz(quizId : number) {

  this.quizId = quizId;
  this.selectedQuiz.next(this.quizzes.getValue()[quizId]) ;  

}

  
  // A function to get the selected quiz
  getSelectedQuizz() {
    return this.selectedQuiz; 
  }


  // This is the service function responsible for deleting a quiz 
 deleteQuiz(quizId : number) {
  // Get the selected quiz index 
   const index = this.quizzes.getValue().findIndex(q => q.id === quizId);
  // Send the http request to the server to delete the quiz based on the Id 
   this.httpClient.delete<any>(this.backendURL + quizId.toString()).subscribe(quizzes => {
     this.quizzes.next(quizzes) ;
     if (index === 0  ) {
         if (this.quizzes.getValue().length === 0) {
           this.selectedQuiz.next(null);
         } 
         else {
           this.selectedQuiz.next(this.quizzes.getValue()[index]) ;
         }
     } else {
       this.selectedQuiz.next(this.quizzes.getValue()[index-1]) ;
     }



  })
 
  


}
// A function to update a quiz 
updateQuiz(id: number, title: string, description: string) {
  const body = { title, description };
  this.httpClient.patch<quizz>(this.backendURL+ id.toString()+ "/", body).subscribe(
    () => {
    this.fetchQuizzees();  
  }
)
}

// A function to update questions
UpdateQuestion(id: number , question : String , option1 : String , option2 : String, option3 : String, option4 : String, answer :String) {
  const body = { question, option1, option2, option3, option4 , answer};
  this.httpClient.patch<QuizzQuestion>(this.backendURLQuestions+ id.toString()+ "/", body).subscribe(
    () => {
    this.fetchQuizzees();  
  })
  }


  
// This function is used to delete a quiz question: 
deleteQuizQuestion(id : number) {
// Request the deletion of the quiz question using the id
this.httpClient.delete<any>(this.backendURLQuestions+ id.toString()+ "/").subscribe( ()=>{
// Reinitialize the quizzes with the new values
this.fetchQuizzees();
}) ;
}


// This function is responsible for adding a quiz question 
addQuizQuestion( quizQuestion : QuizzQuestion , quizId : number){
  // Send the server a request to add a quiz question
  this.httpClient.post<any>(this.backendURL + quizId.toString() + "/add_question/", quizQuestion).subscribe(
    () =>{
      this.fetchQuizzees();
    }

  );

}
}

