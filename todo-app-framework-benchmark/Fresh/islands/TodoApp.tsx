import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface Todo {
  id: number;
  todo: string;
}

export default function TodoApp() {
  const todos = useSignal<Todo[]>([]);
  const inputValue = useSignal("");

  async function getTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    todos.value = data;
  }

  async function createTodo() {
    const todo = inputValue.value;
    if (!todo) return;
    await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo }),
    });
    await getTodos();
    inputValue.value = "";
  }

  async function deleteTodo(todo: Todo) {
    await fetch("/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: todo.todo }),
    });
    await getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <input
        id="create-todo-field"
        type="text"
        name="todo"
        value={inputValue.value}
        onInput={(e) => (inputValue.value = (e.target as HTMLInputElement).value)}
      />
      <input
        id="create-todo-button"
        type="submit"
        value="Submit"
        onClick={createTodo}
      />
      <ul id="todos">
        {todos.value.map((todo) => (
          <li key={todo.id}>
            {todo.todo + " "}
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
