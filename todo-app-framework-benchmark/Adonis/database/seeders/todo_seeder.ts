import Todo from '#models/todo'
import { BaseSeeder } from '@adonisjs/lucid/seeders'


export default class extends BaseSeeder {
  async run() {
    for (let i = 1; i <= 10000; i++) {
      await Todo.create({
        todo: `Todo ${i}`
      })

    }

  }
}