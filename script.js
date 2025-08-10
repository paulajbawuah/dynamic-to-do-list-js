document.addEventListener('DOMContentLoaded', function() {
  // Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Create the addTask Function
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      // Create new list item
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      // Create remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';

      // Assign onclick event to remove button
      removeButton.onclick = function() {
        taskList.removeChild(listItem);
      };

      // Append elements
      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);

      // Clear input field
      taskInput.value = '';
    } else {
      alert('Please enter a task!');
    }
  }

  // Attach Event Listeners
  // Add click event to add button
  addButton.addEventListener('click', addTask);

  // Add keypress event to input field
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});