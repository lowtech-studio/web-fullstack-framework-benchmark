import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  async index({ view }: HttpContext) {
    const todos = await Todo.all()
    return view.render('todos/index', { todos })
  }

  async store({ request, response }: HttpContext) {
    const todo = request.input('todo')
    await Todo.create({ todo })
    return response.redirect('/')
  }

  async destroy({ request, response }: HttpContext) {
    const todo = request.input('todo')
    await Todo.query().where('todo', todo).delete()
    return response.redirect('/')
  }
}