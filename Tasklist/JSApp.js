const form = document.querySelector('#task-form');
const clearBtn = document.querySelector('.btn-dark');
const tasklist = document.querySelector('#ul');
const inputVal = document.querySelector('#task');
const filter = document.querySelector('#filter');

loadEventListener();

function loadEventListener() {
  document.addEventListener('DOMContentLoaded', loadTask);

  form.addEventListener('submit', addTask);

  tasklist.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clearTask);

  filter.addEventListener('keyup', filterTask);
}

function loadTask() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.className = 'list-group-item alert alert-warning';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'float-right btn btn-outline-danger btn-sm';
    link.innerHTML = '<span>x</span>';

    li.appendChild(link);
    tasklist.appendChild(li);
  });
}

function addTask(e) {
  if (inputVal.value === '') {
    alert('Add a task!1');
  }

  const li = document.createElement('li');
  li.className = 'list-group-item alert alert-warning';
  li.appendChild(document.createTextNode(inputVal.value));

  const link = document.createElement('a');
  link.className = 'float-right btn btn-outline-danger btn-sm';
  link.innerHTML = '<span>x</span>';

  li.appendChild(link);
  tasklist.appendChild(li);

  storeToLocalStorage(inputVal.value);

  inputVal.value = '';

  e.preventDefault();
}

function storeToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('btn')) {
    if (confirm('Are you damn sure??')) {
      e.target.parentElement.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeFromLocalStorage(tasksItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  var ti = String(tasksItem.textContent);
  console.log(ti);
  //var end = ti.length;
  var previous = ti.length - 1;
  let res = ti.substr(0, previous);
  //console.log(end);
  //console.log(res);
  tasks.forEach(function(task, index) {
    if (res === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(e) {
  while (tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }

  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.list-group-item').forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
