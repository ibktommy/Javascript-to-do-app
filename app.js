const taskList = document.querySelector(".list-box");
const clearbtn = document.querySelector("#delete-All");
const inputTask = document.querySelector(".input-text");
const addTaskBtn = document.querySelector(".add-task");

// LOAD EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
    // REFRESH PAGE EVENT
    document.addEventListener("DOMContentLoaded", getTaskFromLS);
    // ADD TASK
    inputTask.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            addTask();
        } else {
            return;
        }
    });
    addTaskBtn.addEventListener("click", addTask);
    // DELETE A TASK
    taskList.addEventListener("click", removeTask);
    // CLEAR ALL TASK
    clearbtn.addEventListener("click", clearTasks);
}

// Add Task FUNCTION
function addTask() {
    if (inputTask.value === "") {
        alert("YOU NEED TO ADD A TASK!");
        return;
    }

    // Create List Item Element
    const listItem = document.createElement("li");
    listItem.className = "list-item";
    // ICON Element
    const icon = document.createElement("i");
    icon.className = "far fa-square";
    // TEXT Element
    const para = document.createElement("p");
    para.className = "task-text";
    para.appendChild(document.createTextNode(inputTask.value));
    // Append "icon" and "para" element to ListItem
    listItem.appendChild(icon);
    listItem.appendChild(para);
    // Append listItem to TaskList
    taskList.appendChild(listItem);

    // Store In LS
    storeTaskInLocalStorage(inputTask.value);

    inputTask.value = "";
}

// // LOCAL STORAGE FUNCTION
// Get Task From LS
function getTaskFromLS() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task) => {
        // Create List Item Element
        const listItem = document.createElement("li");
        listItem.className = "list-item";
        // ICON Element
        const icon = document.createElement("i");
        icon.className = "far fa-square";
        // TEXT Element
        const para = document.createElement("p");
        para.className = "task-text";
        para.appendChild(document.createTextNode(task));
        // Append "icon" and "para" element to ListItem
        listItem.appendChild(icon);
        listItem.appendChild(para);
        // Append listItem to TaskList
        taskList.appendChild(listItem);
    });
}

// Add Task To LS
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// REMOVE TASK FUNCTION
function removeTask(e) {
    if (e.target.classList.contains("fa-square")) {
        if (confirm("ARE YOU SURE YOU HAVE COMPLETE THIS TASK?")) {
            e.target.classList.remove("far", "fa-square");
            e.target.classList.add("fas", "fa-check-square");
            e.target.parentElement.classList.add("change");

            // Remove Task FromLS
            removeTaskFromLS(e.target.parentElement);
        }
    }
}

// REMOVE TASK FROM LS
function removeTaskFromLS(taskLS) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
        if (taskLS.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// CLEAR TASKS FUNCTION
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear From LS
    clearAllTaskFromLS();
}

// CLEAR TASKS FROM LS
// Clear From LS
function clearAllTaskFromLS() {
    localStorage.clear();
}
