import { createSignal, For } from "solid-js";
import { createResource } from "solid-js";
import { getDb } from "~/lib/db";

interface Todo {
  id: number;
  todo: string;
}

async function fetchTodos(): Promise<Todo[]> {
  "use server";
  return getDb().prepare("SELECT id, todo FROM todos").all() as Todo[];
}

async function createTodoAction(todo: string): Promise<void> {
  "use server";
  getDb().prepare("INSERT INTO todos (todo) VALUES (?)").run(todo);
}

async function deleteTodoAction(id: number): Promise<void> {
  "use server";
  getDb().prepare("DELETE FROM todos WHERE id = ?").run(id);
}

export default function Home() {
  const [todos, { refetch }] = createResource<Todo[]>(fetchTodos);
  const [newTodo, setNewTodo] = createSignal("");

  async function createTodo() {
    const value = newTodo().trim();
    if (!value) return;
    await createTodoAction(value);
    setNewTodo("");
    refetch();
  }

  async function deleteTodo(todo: Todo) {
    await deleteTodoAction(todo.id);
    refetch();
  }

  return (
    <>
      <h1>ToDo App Benchmark</h1>
      <input
        id="create-todo-field"
        type="text"
        name="todo"
        value={newTodo()}
        onInput={e => setNewTodo(e.currentTarget.value)}
      />
      <input
        id="create-todo-button"
        type="submit"
        value="Submit"
        onClick={createTodo}
      />
      <ul id="todos">
        <For each={todos()}>
          {todo => (
            <li>
              {todo.todo + " "}
              <a
                href="#"
                id={`delete-todo-link-${todo.todo}`}
                onClick={e => {
                  e.preventDefault();
                  deleteTodo(todo);
                }}
              >
                Delete
              </a>
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
