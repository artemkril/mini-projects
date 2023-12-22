const tasks = getInitialTasks();

const mainList = document.getElementById('list_of_tasks');
const createTaskForm = document.getElementById('create_task_form');
const mainInput = document.getElementById('input_box');

createTaskForm.addEventListener('submit', onCreateTaskSubmit);

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

function getInitialTasks() {
    try {
        const data = localStorage.getItem('tasks');
        if (data) {
            // Якщо є дані, то повертаємо їх
            return JSON.parse(data);
        } else {
            return [];
        }
    } catch (e) {
        // Якщо сталась помилка (наприклад не змогли розпарсити дані), то повертаємо пустий масив
        return [];
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function rerender() {
    showList();
    saveTasks();
}

function createTask(name) {
    return {
        id: generateId(),
        name: name,
        done: false,
    };
}

function addTaskToList(task) {
    tasks.push(task);
    rerender();
}

function toggleTaskDoneState(taskId) {
    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (task) {
        task.done = !task.done;
        rerender();
    }
}

function deleteTaskFromList(taskId) {
    const taskIndex = tasks.findIndex(function (task) {
        return task.id === taskId;
    });

    if (taskIndex >= 0) {
        tasks.splice(taskIndex, 1);
        rerender();
    }
}

// Додавання завдання
function onCreateTaskSubmit(event) {
    event.preventDefault();

    if (mainInput.value === '') {
        alert('You must write something!');
        return;
    }

    const newTask = createTask(mainInput.value);
    addTaskToList(newTask);

    mainInput.value = '';
}

// Створення лішок
function createTaskElement(task) {
    console.log(task);

    let elementLi = document.createElement('li');
    elementLi.id = task.id;
    elementLi.textContent = task.name;

    let spanElement = document.createElement('span'); // створення хрестика (видалення)
    spanElement.innerHTML = '\u00d7';
    spanElement.className = 'deleteButton'; // Додавання класу

    spanElement.addEventListener('click', function (event) {
        event.stopPropagation(); // Зупиняємо подію всплеску, щоб не активувалася подія для батьківського LI
        deleteTaskFromList(task.id);
    });

    elementLi.appendChild(spanElement);

    if (task.done) {
        elementLi.classList.add('checked');
    }

    elementLi.addEventListener('click', function () {
        toggleTaskDoneState(task.id);
    });

    return elementLi;
}

function showList() {
    mainList.innerHTML = '';

    tasks.forEach(function (task) {
        mainList.appendChild(createTaskElement(task));
    });
}

showList();
