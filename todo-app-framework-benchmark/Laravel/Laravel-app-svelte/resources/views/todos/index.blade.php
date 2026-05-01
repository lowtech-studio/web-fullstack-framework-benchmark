<!DOCTYPE html>
<html lang="en">
    <head>
        <title>ToDo App</title>
    </head>
    <body>
        <h1>ToDo App Benchmark</h1>

        <form method="POST" action="{{ route('todos.store') }}" style="display:inline;">
            @csrf
            <input id="create-todo-field" type="text" name="todo" />
            <input id="create-todo-button" type="submit" value="Submit" />
        </form>

        <ul id="todos">
            @foreach ($todos as $todo)
                <li>
                    {{ $todo->todo }}
                    <form method="POST" action="{{ route('todos.destroy', $todo) }}" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" id="delete-todo-link-{{ $todo->todo }}">Delete</button>
                    </form>
                </li>
            @endforeach
        </ul>
    </body>
</html>
