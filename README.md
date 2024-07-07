# Quizz-App

## Description 
A web app that I built to display quizzes with their questions to the user. I developed it as a potential tool for my school club BDI (the club organizes events for international students) to use for quiz events instead of other applications such as Kahoot. It is now fully functional and can be used to save quizzes along with their questions and perform CRUD operations on them. There are other features coming soon, such as displaying the quiz in full screen, making the interaction with the questions more dynamic, and more.

## Executing the Project 

To execute this project, clone this repository to your local machine in a folder of your choice:

```sh
git clone <URI>
```

You will have two folders: `DjangoQuiz-Backend` for the backend of the application, and `DjangoQuiz-Frontend` for the frontend. 

First, ensure you have a database service running (I used MySQL, for example) and add your connection credentials in the `DATABASES` variable at:

```sh
DjangoQuiz\DjangoQuiz-Backend\Quizz\Quizz\settings.py
```

Next, open a terminal, navigate to:

```sh
DjangoQuiz\DjangoQuiz-Backend\Quizz\Quizz
```

and run the following command:

```sh
py.exe .\manage.py runserver
```

This will execute the backend server in development mode.

For the frontend, open a second terminal and navigate to the following path:

```sh
DjangoQuiz\DjangoQuiz-Frontend\QuizzFrontend
```

Run the following command:

```sh
ng serve
```

The frontend server will run, and you can check the application on the local URI: `http://localhost:4200`.



