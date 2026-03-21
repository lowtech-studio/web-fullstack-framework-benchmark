import { createTodo } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body?.todo) {
    throw createError({ statusCode: 400, message: 'todo is required' })
  }
  createTodo(body.todo)
  return { status: 'ok' }
})