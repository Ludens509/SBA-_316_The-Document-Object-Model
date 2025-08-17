
let taskData = [];


const inputfield = document.getElementById("taskInput");
const btnAdd = document.querySelector('.add-btn');
const categorySelect = document.querySelector('select');
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');

let currentFilter = 'all';

console.log(inputfield);
console.log(btnAdd);
console.log(categorySelect);



function addEventListeners(){
    taskForm.addEventListener('submit',);

    inputfield.addEventListener('input',validateInput);
}


function loadTask() {
    if (taskData.length === 0) {
        for (const task of taskData) {
            console.log(task);
        }
    }
}
// Input Validation
function validateInput() {
  if (inputfield.value === "") {
    alert("Please provide a task.");
    inputfield.focus();
    return false;
  }
  return inputfield.value;
}

function runTask() {
    taskList.innerHTML = '';

    const filteredTask = GetFilterTasks();

    // if(filteredTask === 0){
    //     emptyState.style.display = 'block';
    //     return;
    // }

    // emptyState.style.display = 'none';

    for (let i = 0; i < filteredTask.length; i++) {
        const taskElement = filteredTask[i];
        taskList.appendChild(taskElement);
    }

}



function GetFilterTasks() {
    filteredTask = [];
    for (let i = 0; i < taskData.length; i++) {
        const task = taskData[i];
        if (currentFilter === 'work' || currentFilter === 'home' || currentFilter === 'study') {
            if (task.category === currentFilter) {
                filteredTask.push(task);
            }
        } else {
            filteredTask.push(task);
        }
    }
    return filteredTask;
}

function createTask(task) {
    const taskItem = document.querySelector('.task-item');
    const clone = taskTemplate.content.cloneNode(true);

    const taskText = taskItem.querySelector('.task-text');
    const taskCategory = taskItem.querySelector('.task-category');

    taskText.textContent = task.text;
    taskCategory.textContent = getCategoryIcon(task.category) + '' + task.category;
    taskCategory.classList.add(task.category);

    return clone;
}
// Get category icon
function getCategoryIcon(category) {
    const icons = {
        work: '🏢',
        home: '🏠',
        study: '📚'
    };
    return icons[category] || '📝';
}
