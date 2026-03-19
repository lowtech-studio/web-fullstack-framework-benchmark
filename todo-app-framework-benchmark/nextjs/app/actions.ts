'use server';

import { createTodo, deleteTodo } from './db';
import { revalidatePath } from 'next/cache';

export async function createTodoAction(formData: FormData) {
  const todo = formData.get('todo') as string;
  if (todo) {
    createTodo(todo);
    revalidatePath('/');
  }
}

export async function deleteTodoAction(formData: FormData) {
  const todo = formData.get('todo') as string;
  if (todo) {
    deleteTodo(todo);
    revalidatePath('/');
  }
}
