'use server';

import { revalidatePath } from 'next/cache';
import { createTodo, deleteTodo } from '@/lib/db';

export async function createTodoAction(formData: FormData) {
  const todo = formData.get('todo') as string;
  if (!todo || !todo.trim()) return;
  createTodo(todo.trim());
  revalidatePath('/');
}

export async function deleteTodoAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) return;
  deleteTodo(id);
  revalidatePath('/');
}
