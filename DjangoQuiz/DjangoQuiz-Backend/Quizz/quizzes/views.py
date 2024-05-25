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
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = []
        
        for quiz in queryset:
            serializer = self.get_serializer(quiz)
            quiz_data = serializer.data
            questions = quiz.quiz_question.all()
            question_serializer = QuizQuestionSerializer(questions, many=True)
            quiz_data['quiz_questions'] = question_serializer.data
            data.append(quiz_data)
        
        return Response(data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Call perform_create to save the instance
        self.perform_create(serializer)

        # Access the created instance
        quiz_instance = serializer.instance

        # Access the generated ID
        quiz_id = quiz_instance.id

        # Get the list of questions from the request data
        questions_data = request.data.get('quiz_questions')

        # Create associated questions for the quiz
        if questions_data:
            for question_data in questions_data:
                # Set the quiz_id for each question_data
                question_data['quiz'] = quiz_id  # Use the quiz_id here
                question_serializer = QuizQuestionSerializer(data=question_data)
                question_serializer.is_valid(raise_exception=True)
                question_serializer.save()

        # Retrieve all quizzes after creating the new quiz
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

        



    