"""
Management command to seed the database with 10 000 todos.

Usage:
    python manage.py seed_todos
"""

from django.core.management.base import BaseCommand

from todos.models import Todo


class Command(BaseCommand):
    help = "Seed the database with 10 000 todos"

    def add_arguments(self, parser):
        parser.add_argument(
            "--count",
            type=int,
            default=10_000,
            help="Number of todos to create (default: 10 000)",
        )

    def handle(self, *args, **options):
        count = options["count"]
        self.stdout.write(f"Seeding {count} todos…")

        todos = [Todo(todo=f"Todo {i + 1}") for i in range(count)]
        Todo.objects.bulk_create(todos)

        self.stdout.write(self.style.SUCCESS(f"Successfully created {count} todos."))
