
let taskData = [];


const inputfield = document.getElementById("taskInput");
const btnAdd = document.querySelector('.add-btn');
const categorySelect = document.querySelector('select');
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const btnWrapper = document.querySelector('.filter-buttons');
const filterButtons = btnWrapper.childNodes;
const container =  document.querySelector('.form-container');

console.log(container);
const header = document.createElement('header');
console.log(header);
container.prepend(header);
header.textContent= 'Task Manager';
header.style.fontWeight = 'bold';
header.style.marginBottom = '12px';

console.log("----------", filterButtons);
// console.log("----------",btnWrapper);


let currentFilter = 'all';

console.log(inputfield);
console.log(btnAdd);
console.log(categorySelect);


function render() {
    loadTask();
    runTasks();
    addEventListeners();
}

function addEventListeners() {
    taskForm.addEventListener('submit', handleTask);

    inputfield.addEventListener('input', validateInput);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
}

function handleTask(e) {
    e.preventDefault();

    const taskText = inputfield.value;
    const category = categorySelect.value;

    if (!taskText) {
        throw `Please enter a task`;
        return;
    }

    if (!category) {
        throw `Please select a category`;
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        category: category,
    };

    taskData.push(newTask);
    runTasks();
    //refresh form
    taskForm.reset();


    inputfield.focus();
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

function runTasks() {
    taskList.innerHTML = '';

    const filteredTasks = GetFilterTasks();

    // if(filteredTask === 0){
    //     emptyState.style.display = 'block';
    //     return;
    // }

    // emptyState.style.display = 'none';

    filteredTasks.forEach(task => {
        const taskElement = createTask(task);
        taskList.appendChild(taskElement);
    });

}

function createTask(task) {

    const clone = taskTemplate.content.cloneNode(true);
    const taskItem = clone.querySelector('.task-item');

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

function handleFilterChange(e) {
    // toggle between active filter button

    for(const btn of filterButtons){
        console.log("element btn", btn.nodeName);

        if(btn.nodeName === 'BUTTON'){
            btn.classList.remove('active')
        }
    }
    
    e.target.classList.add('active');

    //This code snippet isn't totally stem from me, credit to stackoverflow.
    // this variable store witch filter is currently active, with the  element dataset that give access to all the data attribute of an HTML element and filter correspond to data-filter attribute in the HTML.
     currentFilter = e.target.dataset.filter;
    //

    runTasks();
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

function loadTask() {
    if (taskData.length === 0) {
        for (const task of taskData) {
            console.log(task);

        }
    }
}

render();

