// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')


// load all all EventListener
loadEventListener();

// load all all EventListener
function loadEventListener(){
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task Event
  form.addEventListener('submit', AddTask)
  // remove task Event
  taskList.addEventListener('click', removeTask);
  // clear task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter task Event
  filter.addEventListener('keyup', filterTasks);
}
// Get task from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks')===null){
     tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // create li 
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(task));
  // create new link Element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);
  });
}

// Add Task
function AddTask(e){
  if (taskInput.value === ''){
     alert('Add a task')
  }

      // create li 
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // create text node and append to li
      li.appendChild(document.createTextNode(taskInput.value));
      // create new link Element
      const link = document.createElement('a');
      // add class
      link.className = 'delete-item secondary-content';
      // add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // append the link to li
      li.appendChild(link);

      // append li to ul
      taskList.appendChild(li);

      // store in LS
      storeTaskInLocalStorage(taskInput.value);

      // clear input
      taskInput.value = '';

      e.preventDefault();
};

// store Task
function storeTaskInLocalStorage (task) {
  let tasks;
  if(localStorage.getItem('tasks')===null){
     tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('ARE YOU SURE')){
  e.target.parentElement.parentElement.remove();

  // Remove from LS
  removeTaskFromLocalStorage( e.target.parentElement.parentElement)
    }
  }
}

// Remove from LS(creating function)
function removeTaskFromLocalStorage(taskItem) {
  if(localStorage.getItem('tasks')===null){
    tasks=[];
 }else{
   tasks=JSON.parse(localStorage.getItem('tasks'));
 }

 tasks.forEach(function(task,index) {
    if(taskItem.textContent === task){
       tasks.splice(index, 1);
    }
 });

 localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks (){
  // taskList.innerHTML = '';

  // faster way
  while(taskList.firstChild){
     taskList.removeChild(taskList.firstChild);
  }


  // https://jsperf.com/innerhtml-vs-removechird

  // clear from LS
  clearTasksFromLocalStorage();
}

// clear Tasks from LS(creating a function)
function clearTasksFromLocalStorage() {
   localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // we want to take all the list item
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
       task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}



