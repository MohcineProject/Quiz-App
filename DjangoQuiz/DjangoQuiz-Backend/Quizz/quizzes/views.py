from django.db import connection
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
        """
        Creates a new quiz and its associated questions.

        Args:
            request (Request): The HTTP request object.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: The HTTP response object with the created quizzes and their associated questions.

        Raises:
            ValidationError: If the serializer data is invalid.

        """
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
    
    
def auth(request):
    sessionId =request.headers['Authorization']
    with connection as conn:
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM sessions WHERE session_id = '{sessionId}'")
        if cursor.rowcount == 0 :
            return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        else : 
            return Response({"message": "Authorized"}, status=status.HTTP_200_OK) 



def login(request) : 
    password = request.data.get('password') 
    email = request.get("email") 
    if password is None or email is None : 
        return Response({"message" :"Password or email are missing"} , status=status.HTTP_400_BAD_REQUEST)
    with connection.cursor()as cursor : 
        cursor.execute(f'SELECT password , emailFROM user WHERE email ="{email}"') 
        if cursor.rowcount == 0 : 
            return Response({"message" : "User not found"} , status=status.HTTP_404_NOT_FOUND)
        user = cursor.fetchone()
        if user[2] != password :
            return Response({"message" : "There was an error in your credentials"} , status=status.HTTP_401_UNAUTHORIZED)
        else : 
            import uuid
            session_id = uuid.uuid4()
            cursor.execute(f'INSERT INTO sessions (session_id, user_id) VALUES ("{session_id}" , "{user[0]}")')
            return Response({"message" : "authorized"} , headers={"Authorization" : session_id} , status=status.HTTP_200_OK)