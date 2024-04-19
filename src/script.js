const input = document.getElementById("input-task");
const addButton = document.getElementById("add-task-button");


// Function to create and append a new task item
function addTask(checked, taskName) {

    let newItem = document.createElement('li');
    newItem.innerHTML = `
            <label><input type="checkbox"></label>
            <span class="task">${taskName}</span>
            <button class="delete-btn">X</button>
        `;
    let taskList = document.getElementById('task-list');
    taskList.appendChild(newItem);
    updateLocalStorage();


    // Attach event listener to the newly created delete button
    let deleteButton = newItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        // Get the parent <li> element of the clicked button
        let liToRemove = this.closest('li');
        // Remove the <li> element from the DOM
        liToRemove.remove();
    });

    // Attach event listener to the newly created checkbox
    let newCheckbox = newItem.querySelector('input[type="checkbox"]');
    newCheckbox.addEventListener('change', function () {
        if (this.checked) {
            let text = this.closest('li').querySelector('.task');
            text.style.textDecoration = 'line-through';
        } else {
            let text = this.closest('li').querySelector('.task');
            text.style.textDecoration = 'none'; // Remove line-through if unchecked
        }
        updateLocalStorage();
    });

}

function updateLocalStorage() {
    let taskListItems = document.querySelectorAll("#task-list li");
    let tasks = [];
    taskListItems.forEach(taskListItem => {
        let isChecked = taskListItem.querySelector("input").checked;
        let taskName = taskListItem.querySelector("span.task").textContent;
        tasks.push({ checked: isChecked, task: taskName });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Add event listener to the add task button
addButton.addEventListener("click", function (){
    if(input.value !== "") {
        let taskName = document.getElementById("input-task");
        addTask(false,taskName.value);
        input.value = "";
    }
});

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
        addTask(task.checked, task.task);
    });
});