document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    var taskList = document.getElementById('taskList');
    var newTaskInput = document.getElementById('newTask');
    var addTaskBtn = document.getElementById('addTaskBtn');
    // Display initial tasks fetched from the API
    fetchTasks();
    // Event listener for adding a new task
    addTaskBtn.addEventListener('click', function () {
        var taskContent = newTaskInput.value.trim();
        // Check if the task content is not empty
        if (taskContent !== '') {
            addTask(taskContent);
            newTaskInput.value = ''; // Clear input field after adding task
        }
        else {
            // Show error message if task content is empty
            displayErrorMessage('Task cannot be empty');
        }
    });
    // Function to fetch tasks from the API
    function fetchTasks() {
        fetch('https://module3-api-is2m.onrender.com/random-todos')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            // Display 3 random tasks fetched from the API
            data.forEach(function (task) {
                addTask(task); // Menambahkan tugas sesuai dengan nilai array
            });
        })
            .catch(function (error) {
            console.error('Error fetching tasks:', error);
            displayErrorMessage('Failed to fetch tasks');
        });
    }
    // Function to add a new task to the list
    function addTask(content) {
        var taskItem = document.createElement('li');
        taskItem.textContent = content;
        // Create a button to mark task as complete
        var completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', function () {
            completeTask(taskItem);
        });
        // Create a button to remove the task
        var removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function () {
            removeTask(taskItem);
        });
        // Append buttons to task item
        taskItem.appendChild(completeBtn);
        taskItem.appendChild(removeBtn);
        // Append task item to the task list
        taskList.appendChild(taskItem);
    }
    // Function to mark a task as complete
    function completeTask(taskItem) {
        taskItem.classList.add('completed');
    }
    // Function to remove a task from the list
    function removeTask(taskItem) {
        taskItem.remove();
    }
    // Function to display error message
    function displayErrorMessage(message) {
        var errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        document.body.insertBefore(errorMessage, document.body.firstChild);
        setTimeout(function () {
            errorMessage.remove();
        }, 3000); // Remove error message after 3 seconds
    }
});
