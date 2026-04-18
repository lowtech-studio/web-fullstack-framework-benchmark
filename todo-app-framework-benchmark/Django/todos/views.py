from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST, require_GET

from .models import Todo


def index(request):
    """List all todos."""
    todos = Todo.objects.all()
    return render(request, "todos/index.html", {"todos": todos})


@require_POST
def create(request):
    """Create a new todo."""
    todo_text = request.POST.get("todo", "").strip()
    if todo_text:
        Todo.objects.create(todo=todo_text)
    return redirect("todos:index")


@require_GET
def delete(request):
    """Delete a todo by its text value (matching VanillaJS SSR behaviour)."""
    todo_text = request.GET.get("todo", "")
    Todo.objects.filter(todo=todo_text).delete()
    return redirect("todos:index")

