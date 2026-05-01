<template>
  <div>
    <h1>ToDo App Benchmark</h1>
    <input id="create-todo-field" v-model="newTodo" type="text" name="todo" />
    <input id="create-todo-button" type="submit" value="Submit" @click="createTodo" />
    <ul id="todos">
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.todo }}
        <a
          :id="`delete-todo-link-${todo.todo}`"
          href="#"
          @click.prevent="deleteTodo(todo)"
        >Delete</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Todo {
  id: number
  todo: string
}

const newTodo = ref('')
const { data: todos, refresh } = await useFetch<Todo[]>('/api/todos')

async function createTodo() {
  if (!newTodo.value) return
  await $fetch('/api/todos', {
    method: 'POST',
    body: { todo: newTodo.value },
  })
  newTodo.value = ''
  await refresh()
}

async function deleteTodo(todo: Todo) {
  await $fetch('/api/todos', {
    method: 'DELETE',
    body: { todo: todo.todo },
  })
  await refresh()
}
</script>

