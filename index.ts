document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const taskList: HTMLUListElement = document.getElementById('taskList') as HTMLUListElement;
    const newTaskInput: HTMLInputElement = document.getElementById('newTask') as HTMLInputElement;
    const addTaskBtn: HTMLButtonElement = document.getElementById('addTaskBtn') as HTMLButtonElement;
  
    // Display initial tasks fetched from the API
    fetchTasks();
  
    // Event listener for adding a new task
    addTaskBtn.addEventListener('click', () => {
      const taskContent: string = newTaskInput.value.trim();
      
      // Check if the task content is not empty
      if (taskContent !== '') {
        addTask(taskContent);
        newTaskInput.value = ''; // Clear input field after adding task
      } else {
        // Show error message if task content is empty
        displayErrorMessage('Task cannot be empty');
      }
    });
  
    // Function to fetch tasks from the API
    function fetchTasks(): void {
      fetch('https://module3-api-is2m.onrender.com/random-todos')
        .then(response => response.json())
        .then((data: string[]) => {
          // Display 3 random tasks fetched from the API
          data.forEach(task => {
            addTask(task); // Menambahkan tugas sesuai dengan nilai array
          });
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
          displayErrorMessage('Failed to fetch tasks');
        });
    }
  
    // Function to add a new task to the list
    function addTask(content: string): void {
      const taskItem: HTMLLIElement = document.createElement('li');
      taskItem.textContent = content;
      
      // Create a button to mark task as complete
      const completeBtn: HTMLButtonElement = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.addEventListener('click', () => {
        completeTask(taskItem);
      });
  
      // Create a button to remove the task
      const removeBtn: HTMLButtonElement = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        removeTask(taskItem);
      });
  
      // Append buttons to task item
      taskItem.appendChild(completeBtn);
      taskItem.appendChild(removeBtn);
  
      // Append task item to the task list
      taskList.appendChild(taskItem);
    }
  
    // Function to mark a task as complete
    function completeTask(taskItem: HTMLLIElement): void {
      taskItem.classList.add('completed');
    }
  
    // Function to remove a task from the list
    function removeTask(taskItem: HTMLLIElement): void {
      taskItem.remove();
    }
  
    // Function to display error message
    function displayErrorMessage(message: string): void {
      const errorMessage: HTMLParagraphElement = document.createElement('p');
      errorMessage.textContent = message;
      errorMessage.style.color = 'red';
      document.body.insertBefore(errorMessage, document.body.firstChild);
      setTimeout(() => {
        errorMessage.remove();
      }, 3000); // Remove error message after 3 seconds
    }
  });
  