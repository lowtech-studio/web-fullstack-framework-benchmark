import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface Todo {
  id: number;
  todo: string;
}

export default component$(() => {
  const todos = useSignal<Todo[]>([]);
  const inputValue = useSignal("");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const res = await fetch("/api/todos");
    todos.value = await res.json();
  });

  return (
    <>
      <h1>ToDo App Benchmark</h1>
      <input
        id="create-todo-field"
        type="text"
        name="todo"
        bind:value={inputValue}
      />
      <input
        id="create-todo-button"
        type="submit"
        value="Submit"
        onClick$={async () => {
          const todo = inputValue.value;
          if (!todo) return;
          await fetch("/api/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo }),
          });
          const res = await fetch("/api/todos");
          todos.value = await res.json();
          inputValue.value = "";
        }}
      />
      <ul id="todos">
        {todos.value.map((todo) => (
          <li key={todo.id}>
            {todo.todo + " "}
            <a
              href="#"
              id={`delete-todo-link-${todo.todo}`}
              onClick$={async (e) => {
                e.preventDefault();
                await fetch("/api/delete", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: todo.id }),
                });
                const res = await fetch("/api/todos");
                todos.value = await res.json();
              }}
            >
              Delete
            </a>
          </li>
        ))}
      </ul>
    </>
  );
});
