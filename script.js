// Constants declared for input button and task list area
const taskInput = document.querySelector("#task-input");
const taskSection = document.querySelector(".tasks");
const addButton = document.querySelector("#push");

// Listener for the Enter key. Used to add a new task.
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        createTask(e);
    }
});

// Click event for the 'Add' button
addButton.addEventListener("click", (e) => {
    createTask(e);
});

// Function to create a task
function createTask(e) {
    e.preventDefault(); // Prevent form submission and page reload

    const taskValue = taskInput.value.trim();
    console.log("Task value:", taskValue); // Debug log
    if (taskValue === "") {
        alert("The task field is blank. Enter a task name and try again.");
        return;
    }

    // Create task container
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    console.log("Task div created:", taskDiv); // Debug log

    // Create label and checkbox
    const label = document.createElement("label");
    label.id = "taskname";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => updateTask(checkbox));

    const taskText = document.createElement("p");
    taskText.textContent = taskValue;

    // Append checkbox and text to label
    label.appendChild(checkbox);
    label.appendChild(taskText);

    // Create delete button
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete");
    deleteDiv.innerHTML = `<i class="uil uil-trash"></i>`;
    
    // Append elements to task container
    taskDiv.appendChild(label);
    taskDiv.appendChild(deleteDiv);
    
    // Append task to task section
    taskSection.appendChild(taskDiv);
    console.log("Task appended to task section:", taskSection); // Debug log

    // Clear input field
    taskInput.value = "";

    // Update overflow class if needed
    checkOverflow();
}

// Function to mark tasks as complete
function updateTask(task) {
    let taskItem = task.nextElementSibling;
    if (task.checked) {
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}

// Event delegation for delete buttons
taskSection.addEventListener("click", (e) => {
    if (e.target.closest(".delete")) {
        e.target.closest(".task").remove();
        checkOverflow();
    }
});

// Function to check for overflow and update class
function checkOverflow() {
    taskSection.offsetHeight >= 300
        ? taskSection.classList.add("overflow")
        : taskSection.classList.remove("overflow");
}