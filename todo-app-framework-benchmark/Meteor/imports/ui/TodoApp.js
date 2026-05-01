function getTodos() {
  fetch('/').then(res => res.json()).then(data => {
    const list = document.getElementById('todos');
    list.innerHTML = '';
    data.forEach(todo => {
      const item = document.createElement('li');
      item.textContent = todo.todo + ' ';

      const a = document.createElement('a');
      const linkText = document.createTextNode('Delete');
      a.appendChild(linkText);
      a.href = '#';
      a.id = `delete-todo-link-${todo.todo}`;
      a.addEventListener('click', event => {
        event.preventDefault();
        fetch('/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        }).then(res => res.json()).then(() => getTodos());
      });

      item.appendChild(a);
      list.appendChild(item);
    });
  });
}

function createTodo() {
  const field = document.getElementById('create-todo-field');
  const todo = field.value;
  fetch('/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todo }),
  }).then(res => res.json()).then(() => {
    getTodos();
    field.value = '';
  });
}

window.addEventListener('load', () => getTodos());

document.getElementById('create-todo-button').addEventListener('click', () => createTodo());
