import { getAllTodos } from '@/lib/db';
import { createTodoAction } from './actions';
import DeleteLink from './delete-link';

export default async function Home() {
  const todos = getAllTodos();

  return (
    <>
      <h1>ToDo App Benchmark</h1>
      <form action={createTodoAction}>
        <input id="create-todo-field" type="text" name="todo" />
        <input id="create-todo-button" type="submit" value="Submit" />
      </form>
      <ul id="todos">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}{' '}
            <DeleteLink id={todo.id} todo={todo.todo} />
          </li>
        ))}
      </ul>
    </>
  );
}
