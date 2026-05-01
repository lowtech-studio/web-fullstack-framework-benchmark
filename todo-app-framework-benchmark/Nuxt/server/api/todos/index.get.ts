export default defineEventHandler(() => {
  const db = useDatabase()
  const todos = db.prepare('SELECT id, todo FROM todos').all()
  return todos
})
