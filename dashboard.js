"use strict";

const dashboardTasks = [
{
number: 1,
title: "Build the TechBridge Homepage",
day: 1,
description: "Create the first version of the TechBridge website using HTML and CSS.",
difficulty: "Beginner",
status: "completed"
},
{
number: 2,
title: "Build the TechBridge Programs Experience",
day: 4,
description: "Create a Programs experience presenting TechBridge's available learning programs.",
difficulty: "Beginner",
status: "in-progress"
},
{
number: 3,
title: "Build the Internship Tasks Experience",
day: 8,
description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
difficulty: "Beginner → Intermediate",
status: "not-started"
},
{
number: 4,
title: "Build an Interactive Internship Roadmap",
day: 11,
description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
difficulty: "Beginner → Intermediate",
status: "not-started"
},
{
number: 5,
title: "Build the Intern Registration Experience",
day: 15,
description: "Create a professional registration and onboarding interface for TechBridge interns.",
difficulty: "Intermediate",
status: "not-started"
},
{
number: 6,
title: "Build the Task Submission System",
day: 19,
description: "Create an interface through which interns can prepare and submit their task work.",
difficulty: "Intermediate",
status: "not-started"
},
{
number: 7,
title: "Build the Intern Dashboard",
day: 22,
description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
difficulty: "Intermediate",
status: "not-started"
},
{
number: 8,
title: "Build the Complete TechBridge Internship Platform",
day: 26,
description: "Combine the different components created during the internship into a complete TechBridge platform.",
difficulty: "Intermediate",
status: "not-started"
}
];

const dashboardStorageKey = "techbridge-dashboard-progress";

const taskListElement = document.getElementById("dashboard-task-list");
const taskResultsElement = document.getElementById("task-results");
const totalTasksElement = document.getElementById("total-tasks");
const completedTasksElement = document.getElementById("completed-tasks");
const remainingTasksElement = document.getElementById("remaining-tasks");
const progressPercentageElement = document.getElementById("progress-percentage");
const progressTrackElement = document.getElementById("progress-track");
const progressFillElement = document.getElementById("progress-fill");
const progressMessageElement = document.getElementById("progress-message");

const taskFilterButtons = document.querySelectorAll("[data-status-filter]");
const technologyButtons = document.querySelectorAll("[data-technology]");

let activeTaskFilter = "all";

function loadSavedProgress() {
try {
const savedProgress = localStorage.getItem(dashboardStorageKey);

    if (!savedProgress) {
        return;
    }

    const savedStatuses = JSON.parse(savedProgress);

    if (!savedStatuses || typeof savedStatuses !== "object" || Array.isArray(savedStatuses)) {
        return;
    }

    dashboardTasks.forEach(function (task) {
        const savedStatus = savedStatuses[task.number];

        if (["completed", "in-progress", "not-started"].includes(savedStatus)) {
            task.status = savedStatus;
        }
    });
} catch (error) {
    console.error("Unable to load saved dashboard progress:", error);
}

}

function saveProgress() {
try {
const taskStatuses = {};

    dashboardTasks.forEach(function (task) {
        taskStatuses[task.number] = task.status;
    });

    localStorage.setItem(dashboardStorageKey, JSON.stringify(taskStatuses));
} catch (error) {
    console.error("Unable to save dashboard progress:", error);
}

}

function getStatusLabel(status) {
const statusLabels = {
completed: "Completed",
"in-progress": "In Progress",
"not-started": "Not Started"
};

return statusLabels[status] || "Not Started";

}

function createTaskCard(task) {
const card = document.createElement("article");
card.className = "dashboard-task-card";

const metadata = document.createElement("div");
metadata.className = "dashboard-task-meta";

const taskNumber = document.createElement("span");
taskNumber.className = "dashboard-task-number";
taskNumber.textContent = `Task ${task.number}`;

const taskDay = document.createElement("span");
taskDay.className = "dashboard-task-day";
taskDay.textContent = `Day ${task.day}`;

const difficulty = document.createElement("span");
difficulty.className = "dashboard-task-difficulty";
difficulty.textContent = task.difficulty;

metadata.append(taskNumber, taskDay, difficulty);

const title = document.createElement("h3");
title.textContent = task.title;

const status = document.createElement("span");
status.className = `dashboard-task-status status-${task.status}`;
status.textContent = getStatusLabel(task.status);

const description = document.createElement("p");
description.className = "dashboard-task-description";
description.textContent = task.description;

const actions = document.createElement("div");
actions.className = "dashboard-task-actions";

const detailsButton = document.createElement("button");
detailsButton.type = "button";
detailsButton.className = "btn-outline";
detailsButton.textContent = "View Details";
detailsButton.addEventListener("click", function () {
    showTaskDetails(task);
});

actions.appendChild(detailsButton);

if (task.status !== "completed") {
    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "btn-primary";
    completeButton.textContent = "Mark as Completed";
    completeButton.addEventListener("click", function () {
        markTaskCompleted(task.number);
    });

    actions.appendChild(completeButton);
}

card.append(metadata, title, status, description, actions);

return card;

}

function renderTasks() {
taskListElement.replaceChildren();

const filteredTasks = dashboardTasks.filter(function (task) {
    return activeTaskFilter === "all" || task.status === activeTaskFilter;
});

taskResultsElement.textContent =
    `Showing ${filteredTasks.length} of ${dashboardTasks.length} tasks`;

if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "dashboard-empty";
    emptyMessage.textContent = "No tasks match this filter. Choose another status to see more tasks.";
    taskListElement.appendChild(emptyMessage);
    return;
}

filteredTasks.forEach(function (task) {
    taskListElement.appendChild(createTaskCard(task));
});

}

function updateProgress() {
const total = dashboardTasks.length;

const completed = dashboardTasks.filter(function (task) {
    return task.status === "completed";
}).length;

const remaining = total - completed;
const percentage = Math.round((completed / total) * 100);

totalTasksElement.textContent = total;
completedTasksElement.textContent = completed;
remainingTasksElement.textContent = remaining;
progressPercentageElement.textContent = `${percentage}%`;

progressFillElement.style.width = `${percentage}%`;
progressTrackElement.setAttribute("aria-valuenow", String(percentage));

if (remaining === 0) {
    progressMessageElement.textContent = "Excellent work! You have completed all eight tasks.";
} else {
    progressMessageElement.textContent =
        `You have completed ${completed} of ${total} tasks, with ${remaining} remaining. Keep going!`;
}

}

function markTaskCompleted(taskNumber) {
const task = dashboardTasks.find(function (item) {
return item.number === taskNumber;
});

if (!task || task.status === "completed") {
    return;
}

task.status = "completed";

saveProgress();
updateProgress();
renderTasks();

}

function showTaskDetails(task) {
const dialog = document.getElementById("dashboard-task-dialog");

if (!dialog) {
    createTaskDialog();
}

const taskDialog = document.getElementById("dashboard-task-dialog");

document.getElementById("dashboard-dialog-title").textContent =
    `Task ${task.number}: ${task.title}`;

document.getElementById("dashboard-dialog-day").textContent =
    `Scheduled Day: ${task.day}`;

document.getElementById("dashboard-dialog-difficulty").textContent =
    `Difficulty: ${task.difficulty}`;

document.getElementById("dashboard-dialog-status").textContent =
    `Status: ${getStatusLabel(task.status)}`;

document.getElementById("dashboard-dialog-description").textContent =
    task.description;

if (typeof taskDialog.showModal === "function") {
    taskDialog.showModal();
} else {
    taskDialog.setAttribute("open", "");
}

}

function createTaskDialog() {
const dialog = document.createElement("dialog");
dialog.id = "dashboard-task-dialog";
dialog.className = "dashboard-dialog";
dialog.setAttribute("aria-labelledby", "dashboard-dialog-title");

const content = document.createElement("div");
content.className = "dashboard-dialog-content";

const header = document.createElement("div");
header.className = "dashboard-dialog-header";

const title = document.createElement("h2");
title.id = "dashboard-dialog-title";

const closeButton = document.createElement("button");
closeButton.type = "button";
closeButton.className = "dashboard-dialog-close";
closeButton.setAttribute("aria-label", "Close task details");
closeButton.textContent = "×";
closeButton.addEventListener("click", function () {
    if (typeof dialog.close === "function") {
        dialog.close();
    } else {
        dialog.removeAttribute("open");
    }
});

header.append(title, closeButton);

const day = document.createElement("p");
day.id = "dashboard-dialog-day";

const difficulty = document.createElement("p");
difficulty.id = "dashboard-dialog-difficulty";

const status = document.createElement("p");
status.id = "dashboard-dialog-status";

const descriptionHeading = document.createElement("h3");
descriptionHeading.textContent = "Task Description";

const description = document.createElement("p");
description.id = "dashboard-dialog-description";

content.append(
    header,
    day,
    difficulty,
    status,
    descriptionHeading,
    description
);

dialog.appendChild(content);
document.querySelector(".page").appendChild(dialog);

dialog.addEventListener("click", function (event) {
    if (event.target === dialog && typeof dialog.close === "function") {
        dialog.close();
    }
});

}

taskFilterButtons.forEach(function (button) {
button.addEventListener("click", function () {
activeTaskFilter = button.dataset.statusFilter;

    taskFilterButtons.forEach(function (filterButton) {
        const isActive = filterButton === button;

        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
    });

    renderTasks();
});

});

const technologyInformation = {
nextjs: {
title: "Next.js",
description: "Next.js is a React framework for building web applications. It provides routing, server rendering, and tools for building production-ready websites.",
points: [
"Built on React.",
"Supports file-based routing.",
"Can render pages on the server or the client."
],
link: "https://nextjs.org/"
},
vue: {
title: "Vue.js",
description: "Vue.js is a JavaScript framework for building user interfaces. It uses a component-based approach and can be adopted gradually.",
points: [
"Uses reactive data and components.",
"Supports declarative templates.",
"Can power small interactive features or complete applications."
],
link: "https://vuejs.org/"
},
angular: {
title: "Angular",
description: "Angular is a web development platform for building structured applications, maintained by Google and designed around TypeScript.",
points: [
"Uses TypeScript.",
"Includes routing and dependency injection tools.",
"Provides a structured approach to larger applications."
],
link: "https://angular.dev/"
},
backend: {
title: "Backend Development",
description: "Backend development handles server-side logic, data storage, authentication, and communication between the application and its database.",
points: [
"Node.js runs JavaScript outside the browser.",
"Express.js is a web framework for Node.js.",
"Django is a Python framework for building web applications.",
"PostgreSQL is a relational database used to store structured information."
],
link: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side"
}
};

function renderTechnology(technologyKey) {
const technology = technologyInformation[technologyKey];

if (!technology) {
    return;
}

document.getElementById("technology-title").textContent = technology.title;
document.getElementById("technology-description").textContent = technology.description;

const extra = document.getElementById("technology-extra");
extra.replaceChildren();

const list = document.createElement("ul");

technology.points.forEach(function (point) {
    const item = document.createElement("li");
    item.textContent = point;
    list.appendChild(item);
});

extra.appendChild(list);

const link = document.getElementById("technology-link");
link.href = technology.link;
link.textContent = `Learn More About ${technology.title}`;

technologyButtons.forEach(function (button) {
    const isActive = button.dataset.technology === technologyKey;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
});

}

technologyButtons.forEach(function (button) {
button.addEventListener("click", function () {
renderTechnology(button.dataset.technology);
});
});

loadSavedProgress();
updateProgress();
renderTasks();
renderTechnology("nextjs");