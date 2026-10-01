(() => {
  const themeKey = 'taskflow.theme.v1';
  const root = document.documentElement;

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
      button.innerHTML = `${isDark ? '☼' : '◐'} <span>${isDark ? 'Light' : 'Dark'} theme</span>`;
    });
  }

  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem(themeKey) || 'light';
  } catch (error) {
    console.warn('TaskFlow could not read the saved theme.', error);
  }
  applyTheme(savedTheme);

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try {
        localStorage.setItem(themeKey, nextTheme);
      } catch (error) {
        console.warn('TaskFlow could not save the theme.', error);
      }
    });
  });
})();
