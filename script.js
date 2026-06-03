const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function updateCounter() {
    document.getElementById("taskCount").innerText =
        `Total Tasks: ${taskList.children.length}`;
}

function saveTasks() {

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector(".task-check").checked
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(taskText, completed = false) {

    const li = document.createElement("li");

    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-check">
            <span>${taskText}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    const checkbox = li.querySelector(".task-check");
    const taskSpan = li.querySelector("span");

    checkbox.checked = completed;

    if (completed) {
        taskSpan.classList.add("completed");
    }

    checkbox.addEventListener("change", () => {

        if (checkbox.checked) {
            taskSpan.classList.add("completed");
        } else {
            taskSpan.classList.remove("completed");
        }

        saveTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        updateCounter();
        saveTasks();
    });

    taskList.appendChild(li);

    updateCounter();
    saveTasks();
}

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTask(taskText);

    taskInput.value = "";
    taskInput.focus();
}

window.addEventListener("load", () => {

    const savedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTask(task.text, task.completed);
    });

    updateCounter();
    taskInput.focus();

});