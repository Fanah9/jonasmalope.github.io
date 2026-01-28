// DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Track the currently edited task
let editingTask = null;

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((taskText) => addTask(taskText));
}

// Function to save tasks to local storage
function saveTasks() {
  const taskItems = taskList.querySelectorAll('li');
  const tasks = Array.from(taskItems).map(taskItem => taskItem.querySelector('.task-text').textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask(taskText) {
  const taskItem = document.createElement('li');

  taskItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  // Edit button functionality
  const editBtn = taskItem.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => {
    // Set the input field with the current task text
    taskInput.value = taskText;
    editingTask = taskItem;  // Store the task being edited
    addTaskBtn.textContent = 'Save Changes';  // Change button text
  });

  // Delete button functionality
  const deleteBtn = taskItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks(); // Save tasks after deletion
  });

  taskList.appendChild(taskItem);
  saveTasks(); // Save tasks after adding a new one
}

// Add task when clicking 'Add Task' button
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    if (editingTask) {
      // If we are editing, update the task
      editingTask.querySelector('.task-text').textContent = taskText;
      addTaskBtn.textContent = 'Add Task';  // Reset button text
      editingTask = null;  // Clear the task being edited
    } else {
      addTask(taskText);
    }

    // Clear the input field
    taskInput.value = '';
  }
});

// Add task by pressing Enter key
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

// Load tasks from local storage when the page loads
window.addEventListener('load', loadTasks);
