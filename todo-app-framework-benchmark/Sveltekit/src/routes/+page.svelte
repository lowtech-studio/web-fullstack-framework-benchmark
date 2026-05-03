<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>ToDo App Benchmark</h1>

<form method="POST" action="?/create">
	<input id="create-todo-field" type="text" name="todo" />
	<input id="create-todo-button" type="submit" value="Submit" />
</form>

<ul id="todos">
	{#each data.todos as todo (todo.id)}
		<li>
			{todo.todo}
			<a id="delete-todo-link-{todo.todo}" href="/delete/{todo.id}">Delete</a>
		</li>
	{/each}
</ul>
