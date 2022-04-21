const inputElement = document.querySelector(".new_task_input");
const addTaskButton = document.querySelector(".new_task_button");
const tasksContainer = document.querySelector(".task_container");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const clock = setInterval(function time() {
    let dateToday = new Date();

    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();

    if (hr < 10) hr = '0' + hr;

    if (min < 10) min = '0' + min; 

    if (sec < 10) sec = '0' + sec;

    hours.textContent = hr;
    minutes.textContent = min;
    seconds.textContent = sec;
})

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("content");
    taskContent.innerText = inputElement.value;
    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("icon");
    deleteItem.classList.add("fa-regular");
    deleteItem.classList.add("fa-trash-can");

    deleteItem.addEventListener("click", () =>
        handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();

}

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild == (taskContent);

        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
    
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild == (taskContent);

        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
    
}

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
}

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;
  
    const localStorageTasks = [...tasks].map((task) => {
      const content = task.firstChild;
      const isCompleted = content.classList.contains("completed");
  
      return { description: content.innerText, isCompleted };
    });

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
}

const refreshTaskLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))

    if (!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");
    
        const taskContent = document.createElement("content");
        taskContent.innerText = task.description;

        if (task.isCompleted) {
            taskContent.classList.add("completed");
        }

        taskContent.addEventListener("click", () => handleClick(taskContent));
    
        const deleteItem = document.createElement("icon");
        deleteItem.classList.add("fa-regular");
        deleteItem.classList.add("fa-trash-can");
    
        deleteItem.addEventListener("click", () =>
            handleDeleteClick(taskItemContainer, taskContent));
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
    
        tasksContainer.appendChild(taskItemContainer);
    }
}

refreshTaskLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());
