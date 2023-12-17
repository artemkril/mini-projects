const Main_Input = document.getElementById("input_box");
const Main_List = document.getElementById("list_of_tasks");
const buttInput = document.getElementById("addTask");
function addTask(event){
    event.preventDefault();

    if (Main_Input.value === ''){
        alert('You must write something!');
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = Main_Input.value;
        Main_List.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    Main_Input.value = '';
    saveData();
}
buttInput.addEventListener("submit", addTask)

Main_List.addEventListener('click',  function(event){
    if (event.target.tagName === "LI"){
        event.target.classList.toggle("checked");
        saveData()
    } else if(event.target.tagName === "SPAN"){
        event.target.parentElement.remove();
        saveData()
    }
},false)

function saveData(){
    localStorage.setItem("data", Main_List.innerHTML)
}
function showList(){
    Main_List.innerHTML = localStorage.getItem("data")
}
showList()
