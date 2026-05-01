export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.todo) {
    throw createError({ status: 400, statusMessage: 'todo is required' })
  }

  const db = useDatabase()
  const deleteQuery = db.prepare('DELETE FROM todos WHERE todo = ?')
  deleteQuery.run(body.todo)

  return { status: 'ok' }
})
