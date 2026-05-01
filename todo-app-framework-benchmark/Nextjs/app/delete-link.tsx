'use client';

import { useTransition } from 'react';
import { deleteTodoAction } from './actions';

export default function DeleteLink({ id, todo }: { id: number; todo: string }) {
  const [, startTransition] = useTransition();

  return (
    <a
      href="#"
      id={`delete-todo-link-${todo}`}
      onClick={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('id', String(id));
        startTransition(() => deleteTodoAction(formData));
      }}
    >
      Delete
    </a>
  );
}
