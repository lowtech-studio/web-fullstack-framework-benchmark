import { type GetTodos } from 'wasp/server/operations'

export const getTodos: GetTodos = async (_args, context) => {
  return context.entities.Todo.findMany({
    orderBy: { id: 'asc' },
  })
}
