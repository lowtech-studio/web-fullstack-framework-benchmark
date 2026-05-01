import { useFetcher } from "react-router";
import type { Route } from "./+types/home";
import { createTodo, deleteTodo, getTodos } from "../db.server";
import { data, redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ToDo App" }];
}

export async function loader(_: Route.LoaderArgs) {
  return { todos: getTodos() };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "create") {
    const todo = formData.get("todo");
    if (typeof todo !== "string" || !todo.trim()) {
      return data({ error: "todo is required" }, { status: 400 });
    }
    createTodo(todo.trim());
    return redirect("/");
  }

  if (intent === "delete") {
    const id = formData.get("id");
    if (typeof id !== "string") {
      return data({ error: "id is required" }, { status: 400 });
    }
    deleteTodo(Number(id));
    return redirect("/");
  }

  return data({ error: "Unknown intent" }, { status: 400 });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { todos } = loaderData;
  const fetcher = useFetcher();

  return (
    <>
      <h1>ToDo App Benchmark</h1>
      <fetcher.Form method="post">
        <input type="hidden" name="intent" value="create" />
        <input id="create-todo-field" type="text" name="todo" />
        <input
          id="create-todo-button"
          type="submit"
          value="Submit"
        />
      </fetcher.Form>
      <ul id="todos">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}{" "}
            <fetcher.Form method="post" style={{ display: "inline" }}>
              <input type="hidden" name="intent" value="delete" />
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                id={`delete-todo-link-${todo.todo}`}
                style={{ background: "none", border: "none", cursor: "pointer", color: "blue", textDecoration: "underline", padding: 0 }}
              >
                Delete
              </button>
            </fetcher.Form>
          </li>
        ))}
      </ul>
    </>
  );
}

