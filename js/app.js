document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('#todo-form');
  let input = document.querySelector('#todo-input');
  let errorMsg = document.querySelector('#error-msg');
  let list = document.querySelector('#todo-list');
  let counter = document.querySelector('#counter');
  let allBtn = document.querySelector('#filter-all');
  let activeBtn = document.querySelector('#filter-active');
  let doneBtn = document.querySelector('#filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    let count = 0;
    for (let li of list.children) {
      if (!li.classList.contains('completed')) {
        count++;
      }
    }

    if (count === 1) {
      counter.textContent = count + ' item left';
    } else {
      counter.textContent = count + ' items left';
    }
  }

  function applyFilter() {
    for (let li of list.children) {
      let isDone = li.classList.contains('completed');
      let show = true;

      if (currentFilter === 'active' && isDone) {
        show = false;
      }
      if (currentFilter === 'done' && !isDone) {
        show = false;
      }

      if (show) {
        li.style.display = '';
        li.hidden = false;
      } else {
        li.style.display = 'none';
        li.hidden = true;
      }
    }
  }

  function addItem(e) {
    e.preventDefault();

    let text = input.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');

    let li = document.createElement('li');

    let span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    input.value = '';
    applyFilter();
    updateCounter();
  }

  function handleListClick(e) {
    let clicked = e.target;

    if (clicked.classList.contains('delete-btn')) {
      list.removeChild(clicked.parentNode);
    } 
    else if (clicked.classList.contains('item-text')) {
      clicked.parentNode.classList.toggle('completed');
    } 
    else if (clicked.tagName === 'LI') {
      clicked.classList.toggle('completed');
    }

    applyFilter();
    updateCounter();
  }

  function showAll() {
    currentFilter = 'all';
    applyFilter();
  }

  function showActive() {
    currentFilter = 'active';
    applyFilter();
  }

  function showDone() {
    currentFilter = 'done';
    applyFilter();
  }

  form.addEventListener('submit', addItem);
  list.addEventListener('click', handleListClick);
  allBtn.addEventListener('click', showAll);
  activeBtn.addEventListener('click', showActive);
  doneBtn.addEventListener('click', showDone);

  updateCounter();
});