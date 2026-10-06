/**
 * To-Do Application Logic
 * Task lifecycle management, status filtering, and LocalStorage sync
 */

document.addEventListener('DOMContentLoaded', () => {
  const addTaskForm = document.getElementById('addTaskForm');
  const taskTitleInput = document.getElementById('taskTitleInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const categorySelect = document.getElementById('categorySelect');
  const tasksList = document.getElementById('tasksList');
  const filterBtns = document.querySelectorAll('.btn-filter');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');

  // Stats elements
  const totalTasksCount = document.getElementById('totalTasksCount');
  const pendingTasksCount = document.getElementById('pendingTasksCount');
  const completedTasksCount = document.getElementById('completedTasksCount');

  let currentFilter = 'all';

  // Default tasks for initial preview
  const defaultTasks = [
    {
      id: 1,
      title: 'Complete Data Structures & Algorithms lab assignment',
      priority: 'high',
      category: 'College',
      completed: false
    },
    {
      id: 2,
      title: 'Review Flutter widget lifecycle documentation',
      priority: 'medium',
      category: 'Coding',
      completed: true
    },
    {
      id: 3,
      title: 'Practice Python array problem solving on LeetCode',
      priority: 'medium',
      category: 'Study',
      completed: false
    },
    {
      id: 4,
      title: 'Prepare presentation slides for Web Technology project',
      priority: 'high',
      category: 'College',
      completed: false
    }
  ];

  let tasks = JSON.parse(localStorage.getItem('pushti_portfolio_todos')) || defaultTasks;

  const saveTasks = () => {
    localStorage.setItem('pushti_portfolio_todos', JSON.stringify(tasks));
  };

  const updateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasksCount.textContent = total;
    pendingTasksCount.textContent = pending;
    completedTasksCount.textContent = completed;
  };

  const renderTasks = () => {
    tasksList.innerHTML = '';

    const filtered = tasks.filter(task => {
      if (currentFilter === 'active') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true;
    });

    if (filtered.length === 0) {
      let emptyMsg = 'No tasks in this category.';
      if (currentFilter === 'all') emptyMsg = 'No tasks yet! Add your first goal above.';
      else if (currentFilter === 'completed') emptyMsg = 'No completed tasks yet. Keep moving forward!';
      
      tasksList.innerHTML = `
        <div class="empty-task-state">
          <i class="bi bi-clipboard-check" style="font-size: 2rem; color: #94a3b8; display: block; margin-bottom: 8px;"></i>
          <span>${emptyMsg}</span>
        </div>
      `;
      updateStats();
      return;
    }

    filtered.forEach(task => {
      const item = document.createElement('div');
      item.className = `task-item ${task.completed ? 'completed' : ''}`;
      
      item.innerHTML = `
        <div class="task-left">
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
          <span class="task-text">${escapeHtml(task.title)}</span>
        </div>

        <div class="task-badges">
          <span class="badge-priority priority-${task.priority}">${task.priority}</span>
          <span class="badge-cat">${escapeHtml(task.category)}</span>
          <button type="button" class="btn-delete-task" data-id="${task.id}" title="Delete task">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;

      // Checkbox listener
      const checkbox = item.querySelector('.task-checkbox');
      checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      // Delete listener
      const deleteBtn = item.querySelector('.btn-delete-task');
      deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      });

      tasksList.appendChild(item);
    });

    updateStats();
  };

  // Add new task
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleVal = taskTitleInput.value.trim();
    if (!titleVal) return;

    const newTask = {
      id: Date.now(),
      title: titleVal,
      priority: prioritySelect.value,
      category: categorySelect.value,
      completed: false
    };

    tasks.unshift(newTask);
    saveTasks();
    taskTitleInput.value = '';
    renderTasks();
  });

  // Filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderTasks();
    });
  });

  // Clear completed
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      const hasCompleted = tasks.some(t => t.completed);
      if (!hasCompleted) return;

      if (confirm('Are you sure you want to remove all completed tasks?')) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
      }
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  renderTasks();
});
