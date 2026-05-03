import { createFileRoute, useRouter } from '@tanstack/solid-router'
import { createServerFn } from '@tanstack/solid-start'
import { For, createSignal } from 'solid-js'
import { getDb, type Todo } from '../db'

// ── Server functions ──────────────────────────────────────────────────────────

const getTodos = createServerFn({ method: 'GET' }).handler((): Todo[] => {
  const db = getDb()
  return db.prepare('SELECT id, todo FROM todos').all() as Todo[]
})

const createTodo = createServerFn({ method: 'POST' })
  .inputValidator((d: { todo: string }) => d)
  .handler(({ data }) => {
    const db = getDb()
    db.prepare('INSERT INTO todos (todo) VALUES (?)').run(data.todo)
  })

const deleteTodo = createServerFn({ method: 'POST' })
  .inputValidator((d: { id: number }) => d)
  .handler(({ data }) => {
    const db = getDb()
    db.prepare('DELETE FROM todos WHERE id = ?').run(data.id)
  })

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/')({
  loader: () => getTodos(),
  component: Home,
})

function Home() {
  const router = useRouter()
  const todos = Route.useLoaderData()
  let inputRef!: HTMLInputElement

  async function handleCreate() {
    const value = inputRef.value.trim()
    if (!value) return
    await createTodo({ data: { todo: value } })
    inputRef.value = ''
    router.invalidate()
  }

  async function handleDelete(id: number) {
    await deleteTodo({ data: { id } })
    router.invalidate()
  }

  return (
    <>
      <h1>ToDo App Benchmark</h1>
      <input
        id="create-todo-field"
        type="text"
        name="todo"
        ref={inputRef}
      />
      <input
        id="create-todo-button"
        type="button"
        value="Submit"
        onClick={handleCreate}
      />
      <ul id="todos">
        <For each={todos()}>
          {(todo) => (
            <li>
              {todo.todo}{' '}
              <a
                href="#"
                id={`delete-todo-link-${todo.todo}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleDelete(todo.id)
                }}
              >
                Delete
              </a>
            </li>
          )}
        </For>
      </ul>
    </>
  )
}
