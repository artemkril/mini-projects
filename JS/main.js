const mainInput = document.getElementById("input_box");
const mainList = document.getElementById("list_of_tasks");
const buttInput = document.getElementById("addTask");

// Створення лішок
function createTaskElement(taskText) {
    let elementLi = document.createElement('li')
    elementLi.innerHTML = taskText;

    let spanElement = document.createElement("span"); //створення хрестика (видалення)
    spanElement.innerHTML = '\u00d7';
    spanElement.className = "deleteButton"; //Додавання класу

    spanElement.addEventListener('click', function (event) {
        event.stopPropagation(); // Зупиняємо подію всплеску, щоб не активувалася подія для батьківського LI
        elementLi.remove();
        saveData();
    });


    elementLi.appendChild(spanElement);
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
    }
}, false)

function saveData() {
    localStorage.setItem("data", mainList.innerHTML)

}
function showList() {
    mainList.innerHTML = localStorage.getItem("data")
}
showList()


