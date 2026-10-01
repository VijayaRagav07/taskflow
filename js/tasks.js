(() => {
  const list = document.querySelector('#all-task-list');
  if (!list) return;
  const empty = document.querySelector('#tasks-empty');
  const searchInput = document.querySelector('#task-search');
  const categoryFilter = document.querySelector('#category-filter');
  const resultCount = document.querySelector('#task-result-count');
  const form = document.querySelector('[data-add-task-form]');
  const searchText = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchText) ||
    task.category.toLowerCase().includes(searchText)
);
  function refresh() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const visibleTasks = TaskFlow.getAll().filter((task) => {
      const matchesText = task.title.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || task.category === category;
      return matchesText && matchesCategory;
    });
    TaskFlow.render(list, visibleTasks, empty);
    resultCount.textContent = visibleTasks.length;
  }

  TaskFlow.bindActions(list, refresh);
  searchInput.addEventListener('input', refresh);
  categoryFilter.addEventListener('change', refresh);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    TaskFlow.add(formData.get('title'), formData.get('category'));
    form.reset();
    searchInput.value = '';
    categoryFilter.value = 'all';
    form.querySelector('[name="title"]').focus();
    refresh();
  });
  refresh();
})();
