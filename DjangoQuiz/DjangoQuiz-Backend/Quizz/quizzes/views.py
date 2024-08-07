from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Quiz, QuizQuestion
from .serializers import QuizSerializer, QuizQuestionSerializer
from rest_framework.decorators import action

class QuizQuestionViewSet(viewsets.ModelViewSet) :
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer

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
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = []
        
        for quiz in queryset:
            serializer = self.get_serializer(quiz)
            quiz_data = serializer.data
            questions = quiz.quiz_questions.all()
            question_serializer = QuizQuestionSerializer(questions, many=True)
            quiz_data['quiz_questions'] = question_serializer.data
            data.append(quiz_data)
        
        return Response(data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        queryset = self.get_queryset() ; 
        data = []
        for query in queryset : 
            serializer = self.get_serializer(query)
            quiz_data = serializer.data 
            questions = query.quiz_questions.all()
            question_serializer = QuizQuestionSerializer(questions,many=True)
            quiz_data['quiz_questions'] = question_serializer.data 
            data.append(quiz_data)

        return Response(data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        # Retrieve the updated list of quizzes after deletion
        queryset = self.get_queryset()
        data = []
        for quiz in queryset:
            serializer = self.get_serializer(quiz)
            quiz_data = serializer.data
            questions = quiz.quiz_questions.all()
            question_serializer = QuizQuestionSerializer(questions, many=True)
            quiz_data['quiz_questions'] = question_serializer.data
            data.append(quiz_data)

        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["post"])
    def add_question(self, request, pk=None):
        quiz = self.get_object()
        serializer = QuizQuestionSerializer(data=request.data)
        if (serializer.is_valid()) : 
            serializer.save(quiz=quiz)
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        else : 
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    
    
