const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')

let tasks = [];

form.addEventListener("submit", addTask);
tasksList.addEventListener('click', doneTask);
tasksList.addEventListener('click', deleteTask);

//функции
function addTask(e) {
        e.preventDefault();
        const newContent = taskInput.value;
        const tasksHTML = `
    <li class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title">${newContent}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li>
    `
    tasksList.insertAdjacentHTML("beforeend", tasksHTML);
    taskInput.value = "" ;
    taskInput.focus();
    if (tasksList.children.length > 1){
        emptyList.classList.add('none')
    }
    tasks.push(newContent)
    console.log(tasks);
}
function deleteTask(e) {
    if (e.target.dataset.action !== "delete") return;
        const parenNode = e.target.closest('.list-group-item');
        parenNode.remove()
        tasks.delete(newContent)
        console.log(tasks);
    if (tasksList.children.length === 1){
            emptyList.classList.remove('none')
        }
    }
function doneTask(e) {
    if (e.target.dataset.action !== "done") return;
    const parentNode = e.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
}
function SaveHTMLtoLS(params) {
    
}








