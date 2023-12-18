const mainInput = document.getElementById("input_box");
const mainList = document.getElementById("list_of_tasks");
const buttInput = document.getElementById("addTask");

// Створення лішок
function createTaskElement(task) {
    let elementLi = document.createElement('li');
    elementLi.textContent = task.name;

    let spanElement = document.createElement("span"); // створення хрестика (видалення)
    spanElement.innerHTML = '\u00d7';
    spanElement.className = "deleteButton"; // Додавання класу

    spanElement.addEventListener('click', function(event) {
        event.stopPropagation(); // Зупиняємо подію всплеску, щоб не активувалася подія для батьківського LI
        elementLi.remove();
        saveData();
    });

    elementLi.appendChild(spanElement);

    if (task.done) {
        elementLi.classList.add('checked');
    }

    return elementLi;
}

// Додавання завдання
function addTask(event) {
    event.preventDefault();
    if (mainInput.value === '') {
        alert('You must write something!');
    } else {
        let newTask = { name: mainInput.value, done: false };
        mainList.appendChild(createTaskElement(newTask));
        mainInput.value = '';
        saveData();
    }
}

buttInput.addEventListener("submit", addTask);

mainList.addEventListener('click', function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData() {
    let tasks = [];
    mainList.querySelectorAll('li').forEach(function(taskElement) {
        let task = {
            name: taskElement.textContent,
            done: taskElement.classList.contains('checked')
        };
        tasks.push(task);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showList() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        let tasks = JSON.parse(storedTasks);
        mainList.innerHTML = '';
        tasks.forEach(function(task) {
            mainList.appendChild(createTaskElement(task));
        });
    }
}

showList();

