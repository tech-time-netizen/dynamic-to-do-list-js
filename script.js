// Wait for the HTML document to fully load before running any JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from localStorage
    function loadTasks() {
        // Get tasks from localStorage, default to empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Loop through each task object and add it to the DOM
        storedTasks.forEach(task => addTask(task.text, false, task.completed));
    }

    // Modified addTask function to handle text, completion status, and localStorage
    function addTask(taskText, save = true, completed = false) {
        // Get task text from parameter (localStorage) or input field
        const text = taskText || taskInput.value.trim();

        // Check if the input is empty
        if (text === '') {
            if (!taskText) {
                alert('Please enter a task!');
            }
            return;
        }

        // Create a new <li> element to hold the task
        const li = document.createElement('li');
        
        // Create a checkbox for marking tasks as complete
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed; // Set initial state from localStorage
        // Add styling class if task is completed
        if (completed) {
            li.classList.add('completed');
        }

        // Create a span for the task text (to make it editable)
        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;
        taskSpan.className = 'task-text';

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Event listener for checkbox (mark as complete)
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed'); // Toggle strikethrough styling
            updateLocalStorage(); // Update localStorage with new completion status
        });

        // Event listener for editing task text
        taskSpan.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskSpan.textContent;
            input.className = 'edit-input';
            // Replace span with input field for editing
            li.replaceChild(input, taskSpan);
            input.focus();
            // Save changes on Enter or blur
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit(input, li);
                }
            });
            input.addEventListener('blur', () => saveEdit(input, li));
        });

        // Event listener for "Remove" button
        removeButton.onclick = () => {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        // Append checkbox, task text, and remove button to <li>
        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // If user-added task, clear input and save to localStorage
        if (save) {
            taskInput.value = '';
            updateLocalStorage();
        }
    }

    // Function to save edited task
    function saveEdit(input, li) {
        const newText = input.value.trim();
        if (newText === '') {
            alert('Task cannot be empty!');
            return;
        }
        const taskSpan = document.createElement('span');
        taskSpan.textContent = newText;
        taskSpan.className = 'task-text';
        // Restore click-to-edit functionality
        taskSpan.addEventListener('click', () => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.value = taskSpan.textContent;
            newInput.className = 'edit-input';
            li.replaceChild(newInput, taskSpan);
            newInput.focus();
            newInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit(newInput, li);
                }
            });
            newInput.addEventListener('blur', () => saveEdit(newInput, li));
        });
        li.replaceChild(taskSpan, input);
        updateLocalStorage();
    }

    // Function to update localStorage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        // Get all tasks from the DOM
        taskList.querySelectorAll('li').forEach(li => {
            const text = li.querySelector('.task-text').textContent;
            const completed = li.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text, completed });
        });
        // Save tasks array to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for "Add Task" button
    addButton.addEventListener('click', () => addTask());

    // Event listener for "Enter" key in input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from localStorage when the page loads
    loadTasks();
});