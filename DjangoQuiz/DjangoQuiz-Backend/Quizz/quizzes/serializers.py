# serializers.py
from rest_framework import serializers
from .models import Quiz, QuizQuestion

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = ['id', 'question', 'option1', 'option2', 'option3', 'option4', 'answer']

class QuizSerializer(serializers.ModelSerializer):
    quiz_questions = QuizQuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'quiz_questions']

    def create(self, validated_data):
        quiz_questions_data = validated_data.pop('quiz_questions')
        quiz = Quiz.objects.create(**validated_data)
        for question_data in quiz_questions_data:
            QuizQuestion.objects.create(quiz=quiz, **question_data)
        return quiz
