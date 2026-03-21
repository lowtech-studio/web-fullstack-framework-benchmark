import { getTodos } from '../utils/db'

export default defineEventHandler(() => {
  return getTodos()
})