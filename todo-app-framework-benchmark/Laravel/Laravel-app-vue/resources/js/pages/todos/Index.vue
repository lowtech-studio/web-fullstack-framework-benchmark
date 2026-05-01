<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

defineOptions({ layout: null });

interface Todo {
    id: number;
    todo: string;
}

const props = defineProps<{
    todos: Todo[];
}>();

const todoList = ref<Todo[]>(props.todos);
const createTodoField = ref<HTMLInputElement | null>(null);

function getTodos() {
    fetch('/todos/list')
        .then((res) => res.json())
        .then((data: Todo[]) => {
            todoList.value = data;
        });
}

function createTodo() {
    const field = createTodoField.value;
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
</script>

<template>
    <Head title="ToDo App" />
    <h1>ToDo App Benchmark</h1>
    <input id="create-todo-field" ref="createTodoField" type="text" name="todo" />
    <input id="create-todo-button" type="submit" value="Submit" @click="createTodo" />
    <ul id="todos">
        <li v-for="todo in todoList" :key="todo.id">
            {{ todo.todo }} <a
                href="#"
                :id="`delete-todo-link-${todo.todo}`"
                @click.prevent="deleteTodo(todo)"
            >Delete</a>
        </li>
    </ul>
</template>

