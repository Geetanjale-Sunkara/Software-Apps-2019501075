function newTask() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        li.innerHTML += '<button onclick="doneTaskk(this)" >Task Done</button><button onclick="deleteTaskk(this)" >Delete Task</button>'
        document.getElementById("mylist").appendChild(li);
    }
    document.getElementById("myInput").value = "";
}

function deleteTaskk(ev) {
    ev.parentNode.parentNode.removeChild(ev.parentNode);
}

function doneTaskk(ev) {
    ev.parentNode.style.textDecoration = "line-through";
    ev.parentNode.removeChild(ev);
}