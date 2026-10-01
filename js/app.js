(() => {
  const storageKey = 'taskflow.tasks.v1';
  const categories = ['Personal', 'College', 'Work'];
  const starterTasks = [
    { id: 'sample-1', title: 'Plan the week and set priorities', category: 'Personal', completed: false },
    { id: 'sample-2', title: 'Review notes for biology seminar', category: 'College', completed: false },
    { id: 'sample-3', title: 'Send the project update to Maya', category: 'Work', completed: true },
    { id: 'sample-4', title: 'Pick up groceries on the way home', category: 'Personal', completed: false },
    { id: 'sample-5', title: 'Finish the reading for Friday', category: 'College', completed: false }
  ];

  function saveTasks(tasks) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (error) {
      console.warn('TaskFlow could not save tasks in this browser.', error);
    }
  }

  function getTasks() {
    try {
      const savedTasks = localStorage.getItem(storageKey);
      if (savedTasks !== null) {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) return parsedTasks;
      }
    } catch (error) {
      console.warn('TaskFlow could not read saved tasks.', error);
    }
    const initialTasks = starterTasks.map((task) => ({ ...task }));
    saveTasks(initialTasks);
    return initialTasks;
  }

  let tasks = getTasks();

  function getAll() {
    return tasks;
  }

  function add(title, category) {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    const safeCategory = categories.includes(category) ? category : 'Personal';
    tasks = [{ id: `task-${Date.now()}-${Math.random().toString(16).slice(2)}`, title: cleanTitle, category: safeCategory, completed: false }, ...tasks];
    saveTasks(tasks);
  }

  function toggle(id) {
    tasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks(tasks);
  }

  function remove(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks(tasks);
  }

  function render(container, list, emptyState) {
    container.replaceChildren();
    for (const task of list) {
      const row = document.createElement('li');
      row.className = `task-row${task.completed ? ' is-complete' : ''}`;
      row.dataset.taskId = task.id;

      const checkbox = document.createElement('input');
      checkbox.className = 'task-check';
      checkbox.type = 'checkbox';
      checkbox.checked = Boolean(task.completed);
      checkbox.setAttribute('aria-label', `Mark ${task.title} ${task.completed ? 'pending' : 'complete'}`);

      const copy = document.createElement('div');
      copy.className = 'task-copy';
      const title = document.createElement('span');
      title.className = 'task-name';
      title.textContent = task.title;
      const category = document.createElement('span');
      const categoryName = categories.includes(task.category) ? task.category : 'Personal';
      category.className = `category-tag category-${categoryName.toLowerCase()}`;
      category.textContent = categoryName;
      copy.append(title, category);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-task';
      deleteButton.type = 'button';
      deleteButton.dataset.action = 'delete';
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('aria-label', `Delete ${task.title}`);

      row.append(checkbox, copy, deleteButton);
      container.append(row);
    }
    if (emptyState) emptyState.hidden = list.length > 0;
  }

  function bindActions(container, onChange) {
    container.addEventListener('change', (event) => {
      if (!event.target.matches('.task-check')) return;
      const row = event.target.closest('[data-task-id]');
      if (!row) return;
      toggle(row.dataset.taskId);
      onChange();
    });
    container.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="delete"]');
      if (!button) return;
      const row = button.closest('[data-task-id]');
      if (!row) return;
      remove(row.dataset.taskId);
      onChange();
    });
  }

  window.TaskFlow = { categories, getAll, add, render, bindActions };
})();
