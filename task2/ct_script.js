// Contact Form
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const linkedin = document.getElementById("linkedin").value.trim();
  const github = document.getElementById("github").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !email || !message) {
    alert("Please fill out all required fields.");
    return;
  }

  alert(`Thanks ${name}! Your message has been sent.`);

  this.reset();
});


// To-Do List
let taskCount = 0;

document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("todo-input").value.trim();
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("due-date").value;

  if (!input) {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");

  const taskTop = document.createElement("div");
  taskTop.className = "task-top";

  const taskText = document.createElement("span");
  taskText.textContent = input;

  const priorityLabel = document.createElement("span");
  priorityLabel.className = `task-priority ${priority}`;
  priorityLabel.textContent = priority;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.style.marginTop = "8px";
  removeBtn.style.padding = "5px";
  removeBtn.addEventListener("click", () => {
    li.remove();
    taskCount--;
    updateTaskCount();
  });

  taskTop.appendChild(taskText);
  taskTop.appendChild(priorityLabel);

  li.appendChild(taskTop);

  if (dueDate) {
    const dateInfo = document.createElement("div");
    dateInfo.className = "task-date";
    dateInfo.textContent = "Due: " + dueDate;
    li.appendChild(dateInfo);
  }

  li.appendChild(removeBtn);

  document.getElementById("todo-list").appendChild(li);

  document.getElementById("todo-form").reset();
  taskCount++;
  updateTaskCount();
});

function updateTaskCount() {
  document.getElementById("task-count").textContent = `(${taskCount} task${taskCount !== 1 ? "s" : ""})`;
}
