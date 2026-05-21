let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// SAVE
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

// ADD TASK
function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value === "") return alert("Enter task!");

  tasks.push({ text: input.value, done: false });
  input.value = "";

  save();
}

// DELETE
function deleteTask(i) {
  tasks.splice(i, 1);
  save();
}

// TOGGLE DONE
function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  save();
}

// EDIT
function editTask(i) {
  let newTask = prompt("Edit task:", tasks[i].text);
  if (newTask) {
    tasks[i].text = newTask;
    save();
  }
}

// FILTER
function filterTasks(type) {
  render(type);
}

// RENDER UI
function render(filter = "all") {
  let list = document.getElementById("taskList");
  let empty = document.getElementById("emptyState");

  list.innerHTML = "";

  let visible = 0;

  tasks.forEach((t, i) => {

    if (filter === "active" && t.done) return;
    if (filter === "done" && !t.done) return;

    visible++;

    list.innerHTML += `
      <li>
        <span onclick="toggleTask(${i})" class="${t.done ? 'done' : ''}">
          ${t.text}
        </span>

        <div>
         <button onclick="editTask(${i})" class="editBtn">✏</button>
<button onclick="deleteTask(${i})" class="deleteBtn">🗑</button>
        </div>
      </li>
    `;
  });

  // EMPTY STATE LOGIC
  if (visible === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
  }
}

// ENTER KEY SUPPORT
document.getElementById("taskInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// INIT
render();