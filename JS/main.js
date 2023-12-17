const mainInput = document.getElementById("input_box");
const mainList = document.getElementById("list_of_tasks");
const buttInput = document.getElementById("addTask");

// Створення лішок
function createTaskElement(taskText) {
    let elementLi = document.createElement('li')
    elementLi.innerHTML = taskText;

    let span = document.createElement("span"); //створення хрестика (видалення)
    span.innerHTML = '\u00d7';

    elementLi.appendChild(span);
    return elementLi;
}

// Додавання завдання
function addTask(event) {
    event.preventDefault();
    if (mainInput.value === '') {
        alert('You must write something!');
    }
    else {
        let newTask = createTaskElement(mainInput.value);
        mainList.appendChild(newTask);
        mainInput.value = '';
    }

    saveData();
}
buttInput.addEventListener("submit", addTask)

mainList.addEventListener('click', function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData()
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        saveData()
    }
}, false)

function saveData() {
    localStorage.setItem("data", mainList.innerHTML)
}
function showList() {
    mainList.innerHTML = localStorage.getItem("data")
}
showList()
