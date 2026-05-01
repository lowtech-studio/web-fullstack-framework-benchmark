export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.todo) {
    throw createError({ status: 400, statusMessage: 'todo is required' })
  }

  const db = useDatabase()
  const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)')
  insert.run(body.todo)

  return { status: 'ok' }
})
