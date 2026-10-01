(() => {
  const list = document.querySelector('#dashboard-task-list');
  if (!list) return;
  const empty = document.querySelector('#dashboard-empty');
  const totalCount = document.querySelector('#total-count');
  const completedCount = document.querySelector('#completed-count');
  const pendingCount = document.querySelector('#pending-count');
  const dateLabel = document.querySelector('#today-date');
  const form = document.querySelector('[data-add-task-form]');

  function refresh() {
    const tasks = TaskFlow.getAll();
    const completed = tasks.filter((task) => task.completed).length;
    if (totalCount) totalCount.textContent = tasks.length;
    if (completedCount) completedCount.textContent = completed;
    if (pendingCount) pendingCount.textContent = tasks.length - completed;
    TaskFlow.render(list, tasks.slice(0, 5), empty);
  }

  if (dateLabel) {
    dateLabel.textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toUpperCase();
  }
  TaskFlow.bindActions(list, refresh);
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    TaskFlow.add(formData.get('title'), formData.get('category'));
    form.reset();
    form.querySelector('[name="title"]').focus();
    refresh();
  });
  refresh();
})();
