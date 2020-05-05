function newTask() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("mylist").appendChild(li);
    }
    document.getElementById("myInput").value = "";
}

function doneTask() {
    var input = parseInt(document.getElementById("myInput").value);
    var lis = document.getElementById("mylist");
    lis.childNodes[input].style.textDecoration = "line-through";
    document.getElementById("myInput").value = ""
}

function deleteTask() {
    var input = parseInt(document.getElementById("myInput").value);
    var lis = document.getElementById("mylist");
    lis.removeChild(lis.childNodes[input]);
    document.getElementById("myInput").value = ""
}