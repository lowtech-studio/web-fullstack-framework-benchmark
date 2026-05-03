import { type PrismaClient } from '@prisma/client'

export const seedTodos = async (prisma: PrismaClient) => {
  // Clear existing todos
  await prisma.todo.deleteMany()

  // Insert 10000 todos in a single transaction for performance
  const todos = Array.from({ length: 10000 }, (_, i) => ({ todo: `Todo item ${i + 1}` }))

  await prisma.todo.createMany({
    data: todos,
  })

  console.log('Seeded 10000 todos successfully.')
}
