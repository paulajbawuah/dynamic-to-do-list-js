document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed. Ready to manipulate elements!');

  // Step 2: Select DOM Elements (from previous steps)
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Step 3: Create the addTask Function (from previous steps, updated with task creation/removal)
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';

      // This is an asynchronous callback: It executes "later" when the button is clicked.
      removeButton.onclick = function() {
        listItem.remove();
      };

      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);
      taskInput.value = '';

    } else {
      alert('Please enter a task!');
    }
  }

  // Attach Event Listeners:

  // 1. Add an event listener to addButton that calls addTask when the button is clicked.
  // The 'addTask' function here acts as a callback.
  // This is an example of an asynchronous callback because it responds to a user action
  // (a click) that occurs at an unpredictable time, after the initial execution flow.
  // JavaScript, despite being single-threaded, handles such asynchronous operations
  // via mechanisms like the callback queue and event loop [2].
  addButton.addEventListener('click', addTask);
  console.log('Event listener attached to Add Task button.');

  // 2. Add an event listener to taskInput for the 'keypress' event
  //    to allow tasks to be added by pressing the “Enter” key.
  //    Inside this event listener, check if event.key is equal to 'Enter' before calling addTask.
  // The anonymous function here is also an asynchronous callback.
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  console.log('Event listener attached to task input for Enter key.');

  // 3. Invoke the addTask function on DOMContentLoaded.
  //    - Outside addTask, add an event listener to document for the DOMContentLoaded event.
  //    - Set the callback function to invoke addTask.
  //    - This ensures your data fetching logic runs once the HTML document has fully loaded.

  // Clarification on "Invoke the addTask function on DOMContentLoaded":
  // The code already places all your setup logic (including selecting elements,
  // defining addTask, and attaching its event listeners) *within* the `DOMContentLoaded`
  // callback function. This is the correct approach for ensuring that your JavaScript
  // interacts with the HTML only after the document has been fully loaded and parsed.
  //
  // However, directly *invoking* `addTask()` right when `DOMContentLoaded` fires
  // (e.g., `document.addEventListener('DOMContentLoaded', addTask);`) would mean that
  // `addTask` would execute immediately upon page load. In the context of a To-Do list,
  // this would attempt to add an empty task (and trigger the "Please enter a task!" alert)
  // as soon as the page loads, which is typically not the desired behavior.
  //
  // Instead, the goal is that the *application's setup* happens on `DOMContentLoaded`,
  // and the `addTask` function itself is then called *later* as a **callback**
  // by the event listeners (like `addButton.addEventListener('click', addTask)`)
  // in response to **asynchronous user actions** [3, 4]. The `addTask` function is
  // designed to be executed "later" [1] when a specific event occurs, not immediately on load.
  //
  // Therefore, the current structure where `addTask` is defined and its listeners are
  // attached *within* the `DOMContentLoaded` handler is correct for setting up the application.
  // You do not need to add another direct invocation of `addTask()` for the `DOMContentLoaded` event itself.
});