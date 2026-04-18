# Django Todo App

Todo application built with Django (Python) for the web-fullstack-framework-benchmark.

## Requirements

- Python 3.10+
- Django 5.2+

## Setup

```bash
# Install Django
pip install django

# Apply migrations
python3 manage.py migrate

# Seed the database with 10 000 todos
python3 manage.py seed_todos

# Start the development server on port 3000
python3 manage.py runserver 0.0.0.0:3000
```

## Run the benchmark

On the first terminal:

```bash
cd Django
python3 manage.py runserver 0.0.0.0:3000
```

On the second terminal (from the `todo-app-framework-benchmark` folder):

```bash
greenframe analyze http://172.17.0.1:3000 ./greenframe/todo-basic.js
```

## Project structure

```
Django/
├── manage.py
├── db.sqlite3
├── todoproject/          # Project configuration
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── todos/                # Todos application
    ├── apps.py
    ├── models.py         # Todo model
    ├── views.py          # index / create / delete views
    ├── urls.py           # URL routing
    ├── admin.py          # Admin registration
    ├── templates/
    │   └── todos/
    │       └── index.html
    └── management/
        └── commands/
            └── seed_todos.py   # python3 manage.py seed_todos
```
