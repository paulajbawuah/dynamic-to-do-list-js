document.addEventListener('DOMContentLoaded', function() {
  // Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Create the addTask Function
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      // 1. Create new list item
      const listItem = document.createElement('li');
      
      // 2. Set its textContent to taskText
      listItem.textContent = taskText;

      // 3. Create remove button
      const removeButton = document.createElement('button');
      
      // 4. Set button text and class
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';

      // 5. Assign onclick event to remove button
      removeButton.onclick = function() {
        // Remove the li element from taskList
        taskList.removeChild(listItem);
      };

      // 6. Append remove button to li element
      listItem.appendChild(removeButton);

      // 7. Append li to taskList
      taskList.appendChild(listItem);

      // 8. Clear input field
      taskInput.value = '';
    } else {
      alert('Please enter a task!');
    }
  }

  // Event Listeners (kept minimal to focus on the task creation/removal)
  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});