from rest_framework import viewsets
from .models import Quiz, QuizQuestion
from .serializers import QuizSerializer, QuizQuestionSerializer

# Create your views here.
# views.py

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

