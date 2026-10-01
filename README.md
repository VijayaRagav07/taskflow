# TaskFlow

A small personal task manager made with HTML, CSS, and vanilla JavaScript. There is no build step, package manager, backend, or external dependency. Open `index.html` in a browser to use it.

## Pages

- `index.html` is the Today view with task totals, quick add, and recent tasks.
- `dashboard.html` is the full progress overview.
- `tasks.html` contains the searchable, filterable task list.
- `about.html` explains how the app stores data.

All pages share the same task list in browser `localStorage`. The starter tasks are saved the first time the app opens. Tasks and the selected theme stay in that browser until its site data is cleared.

## Project files

```text
index.html
dashboard.html
tasks.html
about.html
css/style.css
css/dashboard.css
css/tasks.css
js/app.js
js/tasks.js
js/dashboard.js
js/theme.js
assets/logo.svg
assets/empty-state.svg
assets/favicon.svg
README.md
```

## Git and GitHub practice

A possible exercise sequence:

1. Initialize Git, make a first commit, and push the repository to GitHub.
2. Open a GitHub Issue for a small improvement, create a branch named `feature/issue-number-short-name`, make the change, and open a pull request that closes the issue.
3. Create two branches from the same base. On each branch, edit the same sentence in this README differently and commit the changes. Merge one branch, then merge the other to produce a real content conflict. Resolve the marked section, commit the resolution, and verify the final result.

No conflict markers are included in the starter project; the conflict is created during the exercise.
