// Defining UI Variables

// text input to add task
const taskInput = document.getElementById('input');
// add task btn
const addTaskBtn = document.querySelector('.form-control-btn');
// search input
const searchInput = document.getElementById('search');
// ul containing task items
const taskList = document.querySelector('.task-list');
// clear tasks btn
const clearTaskBtn = document.querySelector('.clear-tasks-btn');
// tasks
let tasks;



// load all events
loadEventListeners();




// ***********************************  
// LOAD ALL EVENT LISTENERS - Function
// ***********************************

function loadEventListeners() {

  // DOM loading event
  document.addEventListener('DOMContentLoaded', showTasks);  // an event
  // clicking on add task
  addTaskBtn.addEventListener('click', addTask);
  // clicking on delete item btn
  taskList.addEventListener('click', deleteTask);
  // clicking on clear tasks btn
  clearTaskBtn.addEventListener('click', clearTasks);
  // searching for tasks
  searchInput.addEventListener('keyup', searchTask)
}





// ***********************************  
// SHOW TASKS FROM LS - Function
// ***********************************

function showTasks() {

  // check if local storage already has tasks
  if(localStorage.getItem('tasks') === null) {   // if not then create an array
    tasks = [];
  } else {      // if yes then retrive it by unconvertsion from string
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    createTaskItem(task);
  });
}







// ***********************************  
// CREATE NEW TASK ITEM - Function
// ***********************************

function createTaskItem(input) {

  // Create an element
  const li = document.createElement('li');
  // add class
  li.className = 'task-list-item';
  // insert text(task) in task item
  li.appendChild(document.createTextNode(input));

    // create delete btn for task
    const delBtn = document.createElement('button');
    // add class
    delBtn.className = 'task-delete-btn';
    // insert delete btn icon
    delBtn.innerHTML = '<i class="fas fa-times"></i>';

  // insert delete btn in task item
  li.appendChild(delBtn); 

  // APPEND LIST ITEM AS A CHILD TO UL
  taskList.appendChild(li);
}






// ***********************************  
// ADD TASK - Function
// ***********************************  

function addTask(e) {
  
  if(taskInput.value !== '') {

  createTaskItem(taskInput.value);

  // STORE IN LOCAL STORAGE
  storeInLS(taskInput.value);

  // clear input field
  taskInput.value = '';

}

// prevent Default
e.preventDefault();

}





// ***********************************  
// STORING IN LOCAL STORAGE - Function
// ***********************************

function storeInLS(task) {

  // check if local storage already has tasks
  if(localStorage.getItem('tasks') === null) {   // if not then create an array
    tasks = [];
  } else {      // if yes then retrive it by unconvertsion from string
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);  // push the new task to tasks array

  localStorage.setItem('tasks', JSON.stringify(tasks));  // save them in localStorgae
}






// ***********************************  
// DELETE TASK - Function
// ***********************************

function deleteTask(e) {

  if (e.target.parentElement.className === 'task-delete-btn') {   //check that the clciked event in the ul is only <i>
  e.target.parentElement.parentElement.remove();

  // remove from local storage
  removeFromLS(e.target.parentElement.parentElement); // use the task item on which clicked

  } else if (e.target.parentElement.className === 'task-list-item') {  // check that event is button
    e.target.parentElement.remove();
  
    // remove from local storage
    removeFromLS(e.target.parentElement); // use the task itme on which clicked
    }

}






// ***********************************  
// REMOVING TASKS FROM LS - Function
// ***********************************

function removeFromLS(taskItem) {
  // check if local storage already has tasks
  if(localStorage.getItem('tasks') === null) {   // if not then create an array
    tasks = [];
  } else {      // if yes then retrive it by unconvertsion from string
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) { // (cur)
    if(taskItem.textContent === task) {   // check if the task on which clicked is same as current task in iteration
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// ***********************************  
// CLEAR TASKS BTN - Function
// ***********************************

function clearTasks() {

  // first way(slower)
  // taskList.innerHTML = '';
if(taskList.innerHTML !== '') {

  if (confirm('Delete all tasks?')) {
    // second way(faster)
    while (taskList.firstChild) {   // while there is a first item in the task list
      taskList.removeChild(taskList.firstChild);   // remove the child of task list on first position
    }   // this loop runs while there is a first item in list(basically while there is a task left)
  }
  // clear tasks from local storage
  clearTasksFromLS();

} else {

  alert('No tasks to clear!');

}

}






// ***********************************  
// CLEAR TASKS FROM LS - Function
// ***********************************

function clearTasksFromLS() {
  localStorage.clear();
}






// ***********************************  
// SEARCH TASKS - Function
// ***********************************

function searchTask(e) {

  // store the searched text in a variable
  const text = searchInput.value.toLowerCase();
  
  document.querySelectorAll('.task-list-item').forEach(function(task) {
    // take the firstchild of the task item(task and not the btn) and store it
    const item = task.firstChild.textContent.toLowerCase();  

    // checks if searched text is included in the task name by checking the index of searched text inside the task name
    // if its false, -1 is returned
    if(item.indexOf(text) === -1) {  // searched text is not different than task name
      task.style.display = 'none';
    } else {
      task.style.display = 'flex';
    }

  })
}