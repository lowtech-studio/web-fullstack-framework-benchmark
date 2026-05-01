import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, zod$, z, Form } from "@builder.io/qwik-city";
import { getAllTodos, createTodo, deleteTodo } from "~/lib/db";

export const useGetTodos = routeLoader$(async () => {
  return getAllTodos();
});

export const useCreateTodo = routeAction$(
  async (data) => {
    createTodo(data.todo);
    return { success: true };
  },
  zod$({ todo: z.string().min(1) })
);

export const useDeleteTodo = routeAction$(
  async (data) => {
    deleteTodo(Number(data.id));
    return { success: true };
  },
  zod$({ id: z.string() })
);

export default component$(() => {
  const todos = useGetTodos();
  const createAction = useCreateTodo();
  const deleteAction = useDeleteTodo();

  return (
    <>
      <h1>ToDo App Benchmark</h1>
      <Form action={createAction} spaReset>
        <input
          id="create-todo-field"
          type="text"
          name="todo"
          value={createAction.formData?.get("todo")?.toString() ?? ""}
        />
        <input id="create-todo-button" type="submit" value="Submit" />
      </Form>
      <ul id="todos">
        {todos.value.map((todo) => (
          <li key={todo.id}>
            {todo.todo}{" "}
            <Form action={deleteAction}>
              <input type="hidden" name="id" value={String(todo.id)} />
              <a
                href="#"
                id={`delete-todo-link-${todo.todo}`}
                onClick$={(e, el) => {
                  e.preventDefault();
                  el.closest("form")!.requestSubmit();
                }}
              >
                Delete
              </a>
            </Form>
          </li>
        ))}
      </ul>
    </>
  );
});
