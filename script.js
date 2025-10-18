const input = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(addTaskToDOM);

addButton.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    const task = { text, completed: false };
    tasks.push(task);
    saveTasks();
    addTaskToDOM(task);
    input.value = "";
});
function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    // Toggle complete on click
    li.addEventListener("click", () => {
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        li.remove();
        delBtn.style.margin-left: 25px;
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

}
