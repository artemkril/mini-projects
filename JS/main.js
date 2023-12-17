const mainInput = document.getElementById("input_box");
const mainList = document.getElementById("list_of_tasks");
const buttInput = document.getElementById("addTask");
function addTask(event){
    event.preventDefault();

    if (mainInput.value === ''){
        alert('You must write something!');
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = mainInput.value;
        mainList.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    mainInput.value = '';
    saveData();
}
buttInput.addEventListener("submit", addTask)

mainList.addEventListener('click',  function(event){
    if (event.target.tagName === "LI"){
        event.target.classList.toggle("checked");
        saveData()
    } else if(event.target.tagName === "SPAN"){
        event.target.parentElement.remove();
        saveData()
    }
},false)

function saveData(){
    localStorage.setItem("data", mainList.innerHTML)
}
function showList(){
    mainList.innerHTML = localStorage.getItem("data")
}
showList()
