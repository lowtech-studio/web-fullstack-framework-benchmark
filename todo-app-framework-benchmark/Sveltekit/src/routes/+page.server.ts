import db from '$lib/server/db/index';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

interface Todo {
	id: number;
	todo: string;
}

export const load: PageServerLoad = () => {
	const todos = db.prepare('SELECT id, todo FROM todos ORDER BY id').all() as Todo[];
	return { todos };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const todo = data.get('todo');

		if (!todo || typeof todo !== 'string' || todo.trim() === '') {
			return fail(400, { error: 'Todo text is required' });
		}

		db.prepare('INSERT INTO todos (todo) VALUES (?)').run(todo.trim());
		return { success: true };
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id) {
			return fail(400, { error: 'Todo id is required' });
		}

		db.prepare('DELETE FROM todos WHERE id = ?').run(Number(id));
		return { success: true };
	}
};
