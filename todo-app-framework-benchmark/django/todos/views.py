import sqlite3
import os
from django.http import HttpResponseRedirect
from django.shortcuts import render

DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'todos.db')


def index(request):
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT todo FROM todos')
    todos = cursor.fetchall()
    conn.close()

    if request.method == 'POST':
        todo = request.POST.get('todo', '').strip()
        if todo:
            conn = sqlite3.connect(DATABASE_PATH)
            cursor = conn.cursor()
            cursor.execute('INSERT INTO todos (todo) VALUES (?)', (todo,))
            conn.commit()
            conn.close()
        return HttpResponseRedirect('/')

    return render(request, 'index.html', {'todos': todos})


def delete(request):
    todo = request.GET.get('todo', '')
    if todo:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM todos WHERE todo = ?', (todo,))
        conn.commit()
        conn.close()
    return HttpResponseRedirect('/')
