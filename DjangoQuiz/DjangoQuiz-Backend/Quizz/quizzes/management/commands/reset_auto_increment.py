from django.core.management.base import BaseCommand
from django.db import connection
from quizzes.models import Quiz, QuizQuestion 

class Command(BaseCommand):
    help = 'Resets auto-increment values for specific models '

    def handle(self, *args, **kwargs):
        self.reset_auto_increment(Quiz)
        self.reset_auto_increment(QuizQuestion)
        self.stdout.write(self.style.SUCCESS('Successfully reseted auto-increment values'))

    def reset_auto_increment(self, model):
        with connection.cursor() as cursor : 
            cursor.execute(f"ALTER TABLE {model._meta.db_table} AUTO_INCREMENT = 1")
    