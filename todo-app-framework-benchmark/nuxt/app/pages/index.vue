<template>
  <div>
    <h1>ToDo App Benchmark</h1>
    <form @submit.prevent="createTodo">
      <input  id="create-todo-field" v-model="newTodo" type="text" name="todo" />
      <button id="create-todo-button" type="submit">Submit</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.todo">
        {{ todo.todo }}
        <a :id="`delete-todo-link-${todo.todo}`" href="#" @click.prevent="deleteTodo(todo.todo)">Delete</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const newTodo = ref('')
const { data: todos } = await useFetch('/api/todos')

async function createTodo() {
  if (!newTodo.value) return
  await $fetch('/api/todos', {
    method: 'POST',
    body: { todo: newTodo.value }
  })
  newTodo.value = ''
  refreshNuxtData()
}

async function deleteTodo(todo: string) {
  await $fetch('/api/todos', {
    method: 'DELETE',
    body: { todo }
  })
  refreshNuxtData()
}
</script>