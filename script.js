document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed. Ready to manipulate elements!');
  
  // Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage when the page loads
  loadTasks();

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => {
      // Create task element without saving to storage (to avoid duplicates)
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';

      removeButton.onclick = function() {
        listItem.remove();
        updateLocalStorage();
      };

      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);
    });
    console.log('Tasks loaded from Local Storage');
  }

  // Function to update Local Storage with current tasks
  function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
      tasks.push(taskItem.textContent.replace('Remove', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Local Storage updated with current tasks');
  }

  // Main function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      // Create new task element
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      // Create remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';

      // Set click handler for removal
      removeButton.onclick = function() {
        listItem.remove();
        updateLocalStorage();
      };

      // Append elements
      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);
      
      // Clear input field
      taskInput.value = '';
      
      // Update Local Storage
      updateLocalStorage();
    } else {
      alert('Please enter a task!');
    }
  }

  // Event Listeners
  addButton.addEventListener('click', addTask);
  console.log('Event listener attached to Add Task button.');

  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  console.log('Event listener attached to task input for Enter key.');
});