import { deleteTodo } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body?.todo) {
    throw createError({ statusCode: 400, message: 'todo is required' })
  }
  deleteTodo(body.todo)
  return { status: 'ok' }
})