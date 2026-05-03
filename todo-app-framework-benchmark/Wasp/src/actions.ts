import { type CreateTodo, type DeleteTodo } from 'wasp/server/operations'

export const createTodo: CreateTodo<{ todo: string }, void> = async (args, context) => {
  await context.entities.Todo.create({
    data: { todo: args.todo },
  })
}

export const deleteTodo: DeleteTodo<{ todo: string }, void> = async (args, context) => {
  await context.entities.Todo.deleteMany({
    where: { todo: args.todo },
  })
}
