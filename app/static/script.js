const taskInput = document.getElementById("taskInput");
const pendingList = document.getElementById("pendingList");
const doneList = document.getElementById("doneList");

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const title = taskInput.value.trim();
  if (title === "") return;
  const tasks = getTasks();
  tasks.push({
    title,
    completed: false,
    created: new Date().toISOString(),
  });
  saveTasks(tasks);
  taskInput.value = "";
  renderTasks();
}

// function updateTask() {}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function renderTasks() {
  const tasks = getTasks();
  pendingList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justfity-content-between align-text-start";

    const taskHTML = `
            <div class="me-auto">
              ${task.completed ? `<s>${task.title}</s>` : task.title}
              </br>
              <small class="text-muted">
                Criado em: ${new Date(task.created).toLocaleDateString()}
              </small>
            </div>
            <div>
              <button class="btn btn-sm btn-${
                task.completed ? "warning" : "success"
              }" onclick="toggleTask(${index})">
                <i class="fas fa-${task.completed ? "undo" : "check"}"></i>
              </button>
              <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    li.innerHTML = taskHTML;

    if (task.completed) {
      doneList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

// function clearAll() {}

renderTasks();
