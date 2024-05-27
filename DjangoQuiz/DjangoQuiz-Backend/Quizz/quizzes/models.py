from django.db import models

# Create your models here.

class Quiz(models.Model) : 
    title = models.CharField(max_length=255)
    description = models.TextField() 

    def __str__(self) : 
        return self.title 
    
class QuizQuestion(models.Model):
    quiz = models.ForeignKey(Quiz , related_name='quiz_questions', on_delete=models.CASCADE)
    question = models.TextField() 
    option1 = models.CharField(max_length=255) 
    option2 = models.CharField(max_length=255) 
    option3 = models.CharField(max_length=255) 
    option4 = models.CharField(max_length=255) 

    def __str__(self) : 
        return self.title 