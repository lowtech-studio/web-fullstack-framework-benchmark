import { useState } from 'react'
import { getTodos, useQuery, createTodo, deleteTodo } from 'wasp/client/operations'
import type { Todo } from 'wasp/entities'

export function MainPage() {
  const { data: todos } = useQuery(getTodos) as { data: Todo[] | undefined }
  const [inputValue, setInputValue] = useState('')

  const handleCreate = async () => {
    if (!inputValue) return
    await createTodo({ todo: inputValue })
    setInputValue('')
  }

  const handleDelete = async (todo: string) => {
    await deleteTodo({ todo })
  }

  return (
    <>
      <h1>ToDo App Benchmark</h1>
      <input
        id="create-todo-field"
        type="text"
        name="todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input
        id="create-todo-button"
        type="submit"
        value="Submit"
        onClick={handleCreate}
      />
      <ul id="todos">
        {todos && todos.map((item) => (
          <li key={item.id}>
            {item.todo}{' '}
            <a
              href="#"
              id={`delete-todo-link-${item.todo}`}
              onClick={(e) => {
                e.preventDefault()
                handleDelete(item.todo)
              }}
            >
              Delete
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
