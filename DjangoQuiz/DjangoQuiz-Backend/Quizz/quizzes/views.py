from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Quiz
from .serializers import QuizSerializer, QuizQuestionSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        quiz_data = serializer.data
        # Retrieve questions associated with the quiz
        questions = instance.quiz_question.all()
        question_serializer = QuizQuestionSerializer(questions, many=True)
        quiz_data['quiz_questions'] = question_serializer.data
        return Response(quiz_data, status=status.HTTP_200_OK)
