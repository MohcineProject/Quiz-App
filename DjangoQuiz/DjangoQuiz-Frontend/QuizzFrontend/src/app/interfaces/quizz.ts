import { QuizzQuestion } from "./quizz-question"

export interface quizz {
    id : number , 
    title: string , 
    description : string , 
    quiz_questions : QuizzQuestion[] , 
}