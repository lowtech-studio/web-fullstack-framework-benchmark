import db from '$lib/server/db/index';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => {
	const id = Number(params.id);
	db.prepare('DELETE FROM todos WHERE id = ?').run(id);
	redirect(303, '/');
};
