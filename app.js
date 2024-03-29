// Place your code here
// Add any additional code necessary to fulfill the requirements of the assignment
document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const newTaskInput = document.getElementById("newTask");
    const addTaskBtn = document.getElementById("addTaskBtn");
  
    // Function to fetch tasks from the API
    async function fetchTasks() {
      try {
        const response = await fetch("https://module3-api-is2m.onrender.com/random-todos");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  
    // Function to display tasks
    function displayTasks(tasks) {
      taskList.innerHTML = "";
      tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
      });
    }
  
    // Function to create task element
    function createTaskElement(task) {
      const li = document.createElement("li");
      li.textContent = task.title;
      li.dataset.id = task.id;
      if (task.completed) {
        li.classList.add("completed");
      }
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.classList.add("complete-btn");
      li.appendChild(completeBtn);
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      li.appendChild(removeBtn);
      return li;
    }
  
    // Function to add a new task
    function addTask(taskTitle) {
      if (taskTitle.trim() !== "") {
        const newTask = {
          title: taskTitle,
          completed: false
        };
        const li = createTaskElement(newTask);
        taskList.appendChild(li);
      } else {
        alert("Please enter a task.");
      }
    }
  
    // Function to complete a task
    function completeTask(taskId) {
      const taskItem = document.querySelector(`[data-id="${taskId}"]`);
      if (taskItem) {
        taskItem.classList.toggle("completed");
      }
    }
  
    // Function to remove a task
    function removeTask(taskId) {
      const taskItem = document.querySelector(`[data-id="${taskId}"]`);
      if (taskItem) {
        taskItem.remove();
      }
    }
  
    // Event listener to add a new task
    addTaskBtn.addEventListener("click", function () {
      const newTaskTitle = newTaskInput.value.trim();
      addTask(newTaskTitle);
      newTaskInput.value = "";
    });
  
    // Event listener using event delegation to handle complete or remove a task
    taskList.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("complete-btn")) {
        const taskId = target.parentElement.dataset.id;
        completeTask(taskId);
      }
      if (target.classList.contains("remove-btn")) {
        const taskId = target.parentElement.dataset.id;
        removeTask(taskId);
      }
    });
  
    // Initially display 3 random tasks from the API
    fetchTasks()
      .then(tasks => tasks.slice(0, 3))
      .then(displayTasks);
  });
  