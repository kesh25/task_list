// Define UI vars 

const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners 
loadEventyListeners();

// load all event listeners 
function loadEventyListeners() {
    // DOM Load event 
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event 
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event 
    clearBtn.addEventListener('click', clearTasks);
    // filter through the tasks 
    filter.addEventListener('keyup', filterTasks);

}

// GET tasks from LS 
function getTasks() {
    let tasks;
    const confirmItem = localStorage.getItem('tasks');

    if (confirmItem === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // creat li element 
        const li = document.createElement('li');
        // add class 
        li.className = 'collection-item';
        // create text node and append to li 
        console.log(taskInput.value)
        li.appendChild(document.createTextNode(task));
        // create new link element 
        const link = document.createElement('a');
        // add class  
        link.className = 'delete-item secondary-content';
        // icon html
        link.innerHTML = "<i class='fa fa-remove'></i>";
        // append to link to li 
        li.appendChild(link);

        // append li to ul 
        taskList.appendChild(li);
    })
}

// Add task 
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        // creat li element 
        const li = document.createElement('li');
        // add class 
        li.className = 'collection-item';
        // create text node and append to li 
        console.log(taskInput.value)
        li.appendChild(document.createTextNode(taskInput.value));
        // create new link element 
        const link = document.createElement('a');
        // add class  
        link.className = 'delete-item secondary-content';
        // icon html
        link.innerHTML = "<i class='fa fa-remove'></i>";
        // append to link to li 
        li.appendChild(link);

        // append li to ul 
        taskList.appendChild(li);




        // store in local storage 
        storeTaskInLocaleStorage(taskInput.value);


    }
    // clear input
    taskInput.value = '';
    e.preventDefault();
}

// store task in local storage 
function storeTaskInLocaleStorage(task) {
    let tasks;
    const confirmItem = localStorage.getItem('tasks');
    if (confirmItem === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    console.log(tasks);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// remove task 
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure?')) {
            const item = e.target.parentElement.parentElement;
            item.remove();

            // remove from localstorage 
            removeTaskFromLocaleStorage(item);
        }
    }
}

// remove from LS 
function removeTaskFromLocaleStorage(taskItem) {
    let tasks;
    const confirmItem = localStorage.getItem('tasks');
    if (confirmItem === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        if (taskItem.textContent === task) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks 
function clearTasks() {
    // taskList.innerHTML = '';
    // faster with for loop 
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocaleStorage();
}

// ls clear 
function clearTasksFromLocaleStorage() {
    localStorage.clear();
}

// filter tasks 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    console.log(text);
}