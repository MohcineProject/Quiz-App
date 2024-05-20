import { QuizzQuestion } from "./quizz-question"

export interface quizz {
    id : number , 
    title: string , 
    descrition : string , 
    quizzQuestions : QuizzQuestion[] , 
}