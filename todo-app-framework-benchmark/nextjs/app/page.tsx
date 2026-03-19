import { getTodos } from './db';
import { createTodoAction, deleteTodoAction } from './actions';

export default async function Home() {
  const todos = getTodos();

  return (
    <div>
      <h1>ToDo App Benchmark</h1>
      <form action={createTodoAction}>
        <input id="create-todo-field" type="text" name="todo" />
        <input id="create-todo-button" type="submit" value="Submit" />
      </form>
      <ul id="todos">
        {todos.map((row) => (
          <li key={row.todo}>
            {row.todo}{' '}
            <form action={deleteTodoAction}>
              <input type="hidden" name="todo" value={row.todo} />
              <button  id={`delete-todo-link-${row.todo}`} type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
