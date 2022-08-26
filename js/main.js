const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

form.addEventListener("submit", addTask);
tasksList.addEventListener('click', doneTask);
tasksList.addEventListener('click', deleteTask);

if (localStorage.getItem('tasks')) {
tasks = JSON.parse(localStorage.getItem('tasks'));
tasks.forEach((task) => {renderTask(task)})
}
function renderTask (task){
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';
    // формируем разметку для новой задачи
    const tasksHTML = `
                        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                            <span class="${cssClass}">${task.text}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                        </li>
    `;
    tasksList.insertAdjacentHTML("beforeend", tasksHTML);
}
checkEmptyList();
//функции
function addTask(e) {
    e.preventDefault();
    const newContent = taskInput.value;
    // Описываем задачу в виде обьекта
    const newTask = {
        id: Date.now(),
        text: newContent,
        done: false
    };
    
    // Добавляем задачу в массив с задачами 
    tasks.push(newTask)
    let cssClass = newTask.done ? ' task-title task-title--done' : 'task-title';
    // формируем разметку для новой задачи
    const tasksHTML = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newContent}</span>
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
    checkEmptyList()
    saveToLocalStorage()
}
function deleteTask(e) {
    if (e.target.dataset.action !== "delete") return;

    const parenNode = e.target.closest('.list-group-item');
    let id = Number(parenNode.id);

    // const index = tasks.findIndex((task) => task.id === id);
    // удаляем задачу из массива с задачами
    // tasks.splice(index, 1)

    // удаляем задачу чрз фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id)

    parenNode.remove()
    console.log(tasks);
    checkEmptyList()
    saveToLocalStorage()
    }
function doneTask(e) {
	// Проверяем что клик был НЕ по кнопке "задача выполнена"
	if (event.target.dataset.action !== 'done') return;

	const parentNode = event.target.closest('.list-group-item');

	// Определяем ID задачи
	const id = Number(parentNode.id);
	const task = tasks.find((task) => task.id === id);
	task.done = !task.done;

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();

	const taskTitle = parentNode.querySelector('.task-title');
	taskTitle.classList.toggle('task-title--done');
}
function checkEmptyList() {
    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)}
    else {
       const emptyListEl = document.querySelector('#emptyList')
       emptyListEl ? emptyListEl.remove() : null;
    }
}
function saveToLocalStorage(params) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}









