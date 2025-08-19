
let taskData = [];


const inputfield = document.getElementById("taskInput");
const btnAdd = document.querySelector('.add-btn');
const categorySelect = document.querySelector('select');
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const btnWrapper = document.querySelector('.filter-buttons');
const filterButtons = btnWrapper.childNodes;
const container =  document.querySelector('.form-container');
const emptyState = document.getElementById('emptyState');



// Create Header with tittle
console.log(container);
const header = document.createElement('header');
console.log(header);
container.prepend(header);
header.textContent= 'Task Manager';
header.style.fontWeight = 'bold';
header.style.marginBottom = '20px';
header.style.fontSize = '24px';
header.style.textAlign = 'center';

console.log("----------", filterButtons);
// console.log("----------",btnWrapper);


let currentFilter = 'all';


function render() {
    loadTask();
    runTasks();
    addEventListeners();
}

// this function contains  all the event Listener
function addEventListeners() {
    taskForm.addEventListener('submit', handleTask);

    inputfield.addEventListener('input', validateInput);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
}


// This function allow to create tasks
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
//This function allow to pass each filtered task into its created element

function runTasks() {
    taskList.innerHTML = '';

    const filteredTasks = GetFilterTasks();


    filteredTasks.forEach(task => {
        const taskElement = createTask(task);
        taskList.appendChild(taskElement);
    });

}

// This function contain the template element where the tasks are being displayed in
function createTask(task) {

    const clone = taskTemplate.content.cloneNode(true);
    const taskItem = clone.querySelector('.task-item');

    const taskText = taskItem.querySelector('.task-text');
    const taskCategory = taskItem.querySelector('.task-category');

    taskText.textContent = task.text;
    //pass down the current icon function that contains the object icon
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

//this function handle the toggle envent on filter button
function handleFilterChange(e) {
    // toggle between active filter button

    for(const btn of filterButtons){
        // console.log("element btn", btn.nodeName);

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


// This function return the current task based on filtered selected category
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

// This function is to load data in case of use of Local Storage
function loadTask() {
    if (taskData.length === 0) {
        for (const task of taskData) {
            console.log(task);

        }
    }
}

//This function is the render function that calls all others function
render();

