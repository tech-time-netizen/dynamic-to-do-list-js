document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');    

    function addTask() { 
        const taskTest = taskInput.value.trim();
        if (taskTest === '') {
            alert('Please enter a task.');
            return;
        }
        const li = document.createElement('li');
        li.textContent = taskTest;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        taskInput.value = ''; // Clear the input field      

        
    }
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});