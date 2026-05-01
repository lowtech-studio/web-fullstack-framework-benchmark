<script lang="ts">
    interface Todo {
        id: number;
        todo: string;
    }

    interface Props {
        todos: Todo[];
    }

    let { todos }: Props = $props();

    let todoList = $state<Todo[]>([...todos]);
    let inputValue = $state('');

    function getCsrfToken(): string {
        return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
    }

    function getTodos() {
        fetch('/todos/list')
            .then((res) => res.json())
            .then((data: Todo[]) => {
                todoList = data;
            });
    }

    function createTodo() {
        if (!inputValue) return;

        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({ todo: inputValue }),
        })
            .then((res) => res.json())
            .then(() => {
                getTodos();
                inputValue = '';
            });
    }

    function deleteTodo(todo: Todo) {
        fetch(`/todos/${todo.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
        })
            .then((res) => res.json())
            .then(() => {
                getTodos();
            });
    }
</script>

<svelte:head>
    <title>ToDo App</title>
</svelte:head>

<h1>ToDo App Benchmark</h1>
<input id="create-todo-field" type="text" name="todo" bind:value={inputValue} />
<input
    id="create-todo-button"
    type="submit"
    value="Submit"
    onclick={createTodo}
/>
<ul id="todos">
    {#each todoList as todo (todo.id)}
        <li>
            {todo.todo} <a
                href="#"
                id="delete-todo-link-{todo.todo}"
                onclick={(e) => { e.preventDefault(); deleteTodo(todo); }}
            >Delete</a>
        </li>
    {/each}
</ul>
