const STORAGE_KEY = 'todo-list-items';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'No tasks yet. Add one above!';
    list.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `todo-item ${task.completed ? 'completed' : ''}`;

    const main = document.createElement('div');
    main.className = 'todo-main';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark ${task.text} complete`);

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    main.appendChild(checkbox);
    main.appendChild(text);

    item.appendChild(main);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });
}

function addTask(value) {
  const text = value.trim();

  if (!text) {
    input.focus();
    return;
  }

  tasks.unshift({
    id: Date.now(),
    text,
    completed: false,
  });

  saveTasks();
  renderTasks();
  input.value = '';
  input.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(input.value);
});

renderTasks();
