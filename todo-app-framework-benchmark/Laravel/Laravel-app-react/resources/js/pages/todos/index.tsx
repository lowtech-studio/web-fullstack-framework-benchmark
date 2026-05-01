import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import type { Todo } from '@/types';

interface Props {
    todos: Todo[];
}

export default function TodoIndex({ todos }: Props) {
    const [todoList, setTodoList] = useState<Todo[]>(todos);
    const inputRef = useRef<HTMLInputElement>(null);

    function getTodos() {
        fetch('/todos/list')
            .then((res) => res.json())
            .then((data: Todo[]) => {
                setTodoList(data);
            });
    }

    function createTodo() {
        const field = inputRef.current;
        if (!field) return;
        const todo = field.value;

        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
            },
            body: JSON.stringify({ todo }),
        })
            .then((res) => res.json())
            .then(() => {
                getTodos();
                field.value = '';
            });
    }

    function deleteTodo(todo: Todo) {
        fetch(`/todos/${todo.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
            },
        })
            .then((res) => res.json())
            .then(() => {
                getTodos();
            });
    }

    return (
        <>
            <Head title="ToDo App" />
            <h1>ToDo App Benchmark</h1>
            <input id="create-todo-field" type="text" name="todo" ref={inputRef} />
            <input
                id="create-todo-button"
                type="submit"
                value="Submit"
                onClick={createTodo}
            />
            <ul id="todos">
                {todoList.map((todo) => (
                    <li key={todo.id}>
                        {todo.todo}{' '}
                        <a
                            href="#"
                            id={`delete-todo-link-${todo.todo}`}
                            onClick={(e) => {
                                e.preventDefault();
                                deleteTodo(todo);
                            }}
                        >
                            Delete
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
}

TodoIndex.layout = null;
