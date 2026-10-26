let dashboardTasks = [];

let activeFilter = "all";

const taskListElement = document.getElementById("dashboard-task-list");
const taskResultsElement = document.getElementById("task-results");
const totalTasksElement = document.getElementById("total-tasks");
const completedTasksElement = document.getElementById("completed-tasks");
const remainingTasksElement = document.getElementById("remaining-tasks");
const progressPercentageElement = document.getElementById("progress-percentage");
const progressTrackElement = document.getElementById("progress-track");
const progressFillElement = document.getElementById("progress-fill");
const progressMessageElement = document.getElementById("progress-message");

const technologyTitleElement = document.getElementById("technology-title");
const technologyDescriptionElement = document.getElementById("technology-description");
const technologyExtraElement = document.getElementById("technology-extra");
const technologyLinkElement = document.getElementById("technology-link");

const technologyInformation = {
    nextjs: {
        title: "Next.js",
        description:
            "Next.js is a React framework for building modern web applications. It supports file-based routing, server-side rendering, and static site generation.",
        extra:
            "Learning focus: Understand how Next.js builds on React, organizes pages, and supports full-stack web development.",
        link: "https://nextjs.org/docs"
    },

    vue: {
        title: "Vue.js",
        description:
            "Vue.js is a JavaScript framework for building interactive user interfaces. It uses a component-based approach and is designed to be approachable for beginners.",
        extra:
            "Learning focus: Explore Vue components, reactive data, directives, and event handling.",
        link: "https://vuejs.org/guide/"
    },

    angular: {
        title: "Angular",
        description:
            "Angular is a web application framework maintained by Google. It provides tools for building structured applications using TypeScript, components, services, and dependency injection.",
        extra:
            "Learning focus: Understand components, templates, services, and how Angular organizes larger applications.",
        link: "https://angular.dev/overview"
    },

    backend: {
        title: "Backend Development",
        description:
            "Backend development focuses on server-side logic, APIs, data storage, validation, and communication between the frontend and server.",
        extra:
            "Technologies to explore: Node.js, Express.js, Django, and PostgreSQL. This task introduces Node.js and Express.js through the TechBridge Task Management API.",
        link: "https://expressjs.com/"
    }
};

function createApiElements() {
    if (!taskListElement || !taskListElement.parentElement) {
        console.error("The dashboard task list element could not be found.");
        return;
    }

    const container = taskListElement.parentElement;

    const apiStatusElement = document.createElement("p");
    apiStatusElement.id = "dashboard-api-status";
    apiStatusElement.className = "dashboard-api-status";
    apiStatusElement.setAttribute("role", "status");
    apiStatusElement.textContent = "Connecting to the task API...";

    const loadingElement = document.createElement("p");
    loadingElement.id = "dashboard-loading";
    loadingElement.className = "dashboard-loading";
    loadingElement.setAttribute("role", "status");
    loadingElement.textContent = "Loading your tasks...";

    const errorElement = document.createElement("div");
    errorElement.id = "dashboard-api-error";
    errorElement.className = "dashboard-api-error";
    errorElement.setAttribute("role", "alert");
    errorElement.textContent =
        "Unable to load tasks. Check your API connection and try again.";
    errorElement.hidden = true;

    container.insertBefore(apiStatusElement, taskListElement);
    container.insertBefore(loadingElement, taskListElement);
    container.insertBefore(errorElement, taskListElement);
}

function setApiStatus(isConnected) {
    const statusElement = document.getElementById("dashboard-api-status");

    if (!statusElement) {
        return;
    }

    statusElement.textContent = isConnected
        ? "API Status: Connected"
        : "API Status: Offline";

    statusElement.classList.toggle("is-connected", isConnected);
    statusElement.classList.toggle("is-offline", !isConnected);
}

function showLoading(isLoading) {
    const loadingElement = document.getElementById("dashboard-loading");

    if (loadingElement) {
        loadingElement.hidden = !isLoading;
    }
}

function showApiError(message) {
    const errorElement = document.getElementById("dashboard-api-error");

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.hidden = false;
    }
}

function hideApiError() {
    const errorElement = document.getElementById("dashboard-api-error");

    if (errorElement) {
        errorElement.hidden = true;
    }
}

async function loadTasks() {
    showLoading(true);
    hideApiError();

    try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
            throw new Error("The server could not retrieve the tasks.");
        }

        const tasks = await response.json();

        if (!Array.isArray(tasks)) {
            throw new Error("The API returned an unexpected response.");
        }

        dashboardTasks = tasks.map(function (task) {
            return {
                number: task.id,
                title: task.title,
                day: task.day,
                description: task.description,
                difficulty: task.difficulty,
                status: task.status
            };
        });

        setApiStatus(true);
        updateProgress();
        renderTasks();
    } catch (error) {
        console.error("Unable to load tasks:", error);

        dashboardTasks = [];

        setApiStatus(false);
        updateProgress();
        renderTasks();

        showApiError(
            "Unable to load tasks. Make sure the TechBridge API server is running, then reload this page."
        );
    } finally {
        showLoading(false);
    }
}

function getStatusLabel(status) {
    const labels = {
        completed: "Completed",
        "in-progress": "In Progress",
        "not-started": "Not Started"
    };

    return labels[status] || "Unknown";
}

function getFilteredTasks() {
    if (activeFilter === "all") {
        return dashboardTasks;
    }

    return dashboardTasks.filter(function (task) {
        return task.status === activeFilter;
    });
}

function createTaskCard(task) {
    const card = document.createElement("article");
    card.className = "dashboard-task-card";

    const header = document.createElement("div");
    header.className = "dashboard-task-card-header";

    const number = document.createElement("span");
    number.className = "dashboard-task-number";
    number.textContent = "Task " + task.number;

    const status = document.createElement("span");
    status.className = "dashboard-task-status";
    status.classList.add("status-" + task.status);
    status.textContent = getStatusLabel(task.status);

    header.appendChild(number);
    header.appendChild(status);

    const title = document.createElement("h3");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.className = "dashboard-task-description";
    description.textContent = task.description;

    const metadata = document.createElement("div");
    metadata.className = "dashboard-task-meta";

    const day = document.createElement("span");
    day.className = "dashboard-task-day";
    day.textContent = "Day " + task.day;

    const difficulty = document.createElement("span");
    difficulty.className = "dashboard-task-difficulty";
    difficulty.textContent = task.difficulty;

    metadata.appendChild(day);
    metadata.appendChild(difficulty);

    const actions = document.createElement("div");
    actions.className = "dashboard-task-actions";

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "btn-outline";
    detailsButton.textContent = "View Task";

    detailsButton.addEventListener("click", function () {
        showTaskDetails(task.number);
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

    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(metadata);
    card.appendChild(actions);

    return card;
}

function renderTasks() {
    if (!taskListElement) {
        return;
    }

    taskListElement.replaceChildren();

    const filteredTasks = getFilteredTasks();

    if (taskResultsElement) {
        taskResultsElement.textContent =
            "Showing " +
            filteredTasks.length +
            " of " +
            dashboardTasks.length +
            " tasks";
    }

    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "dashboard-empty";

        if (dashboardTasks.length === 0) {
            emptyMessage.textContent =
                "No tasks are available. Check the API connection and try again.";
        } else if (activeFilter === "completed") {
            emptyMessage.textContent =
                "You have not completed any tasks yet.";
        } else if (activeFilter === "in-progress") {
            emptyMessage.textContent =
                "There are no tasks currently in progress.";
        } else if (activeFilter === "not-started") {
            emptyMessage.textContent =
                "There are no tasks waiting to be started.";
        } else {
            emptyMessage.textContent = "No tasks found.";
        }

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

    const percentage =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    if (totalTasksElement) {
        totalTasksElement.textContent = total;
    }

    if (completedTasksElement) {
        completedTasksElement.textContent = completed;
    }

    if (remainingTasksElement) {
        remainingTasksElement.textContent = remaining;
    }

    if (progressPercentageElement) {
        progressPercentageElement.textContent = percentage + "%";
    }

    if (progressFillElement) {
        progressFillElement.style.width = percentage + "%";
    }

    if (progressTrackElement) {
        progressTrackElement.setAttribute(
            "aria-valuenow",
            String(percentage)
        );
    }

    if (progressMessageElement) {
        if (total === 0) {
            progressMessageElement.textContent =
                "Your progress will appear when tasks are loaded.";
        } else if (percentage === 100) {
            progressMessageElement.textContent =
                "Excellent work! You have completed all your tasks.";
        } else if (percentage === 0) {
            progressMessageElement.textContent =
                "Your learning journey starts here. Complete your first task to make progress.";
        } else {
            progressMessageElement.textContent =
                "You have completed " +
                completed +
                " of " +
                total +
                " tasks. Keep going!";
        }
    }
}

async function markTaskCompleted(taskNumber) {
    const task = dashboardTasks.find(function (item) {
        return item.number === taskNumber;
    });

    if (!task || task.status === "completed") {
        return;
    }

    try {
        const response = await fetch("/api/tasks/" + taskNumber, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "completed"
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Unable to update task status."
            );
        }

        task.status = result.task.status;

        setApiStatus(true);
        hideApiError();
        updateProgress();
        renderTasks();
    } catch (error) {
        console.error("Unable to update task:", error);
        setApiStatus(false);

        alert(
            "Unable to mark this task as completed. Check that the API server is running and try again."
        );
    }
}

async function showTaskDetails(taskNumber) {
    let dialog = document.getElementById("dashboard-task-dialog");

    if (!dialog) {
        createTaskDialog();
        dialog = document.getElementById("dashboard-task-dialog");
    }

    const titleElement = document.getElementById("dashboard-dialog-title");
    const dayElement = document.getElementById("dashboard-dialog-day");
    const difficultyElement = document.getElementById(
        "dashboard-dialog-difficulty"
    );
    const statusElement = document.getElementById(
        "dashboard-dialog-status"
    );
    const descriptionElement = document.getElementById(
        "dashboard-dialog-description"
    );

    titleElement.textContent = "Loading task details...";
    dayElement.textContent = "";
    difficultyElement.textContent = "";
    statusElement.textContent = "";
    descriptionElement.textContent =
        "Retrieving task information from the API.";

    if (typeof dialog.showModal === "function") {
        if (!dialog.open) {
            dialog.showModal();
        }
    } else {
        dialog.setAttribute("open", "");
    }

    try {
        const response = await fetch("/api/tasks/" + taskNumber);
        const task = await response.json();

        if (!response.ok) {
            throw new Error(
                task.error || "Unable to retrieve task details."
            );
        }

        titleElement.textContent = "Task " + task.id + ": " + task.title;
        dayElement.textContent = "Scheduled Day: " + task.day;
        difficultyElement.textContent = "Difficulty: " + task.difficulty;
        statusElement.textContent = "Status: " + getStatusLabel(task.status);
        descriptionElement.textContent = task.description;

        setApiStatus(true);
        hideApiError();
    } catch (error) {
        console.error("Unable to load task details:", error);

        setApiStatus(false);

        titleElement.textContent = "Unable to Load Task";
        descriptionElement.textContent =
            "Task details could not be retrieved. Check that the API server is running and try again.";
    }
}

function createTaskDialog() {
    const dialog = document.createElement("dialog");
    dialog.id = "dashboard-task-dialog";
    dialog.className = "dashboard-dialog";

    const content = document.createElement("div");
    content.className = "dashboard-dialog-content";

    const header = document.createElement("div");
    header.className = "dashboard-dialog-header";

    const title = document.createElement("h2");
    title.id = "dashboard-dialog-title";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "dashboard-dialog-close";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Close task details");

    closeButton.addEventListener("click", function () {
        if (typeof dialog.close === "function") {
            dialog.close();
        } else {
            dialog.removeAttribute("open");
        }
    });

    header.appendChild(title);
    header.appendChild(closeButton);

    const day = document.createElement("p");
    day.id = "dashboard-dialog-day";

    const difficulty = document.createElement("p");
    difficulty.id = "dashboard-dialog-difficulty";

    const status = document.createElement("p");
    status.id = "dashboard-dialog-status";

    const description = document.createElement("p");
    description.id = "dashboard-dialog-description";

    content.appendChild(header);
    content.appendChild(day);
    content.appendChild(difficulty);
    content.appendChild(status);
    content.appendChild(description);

    dialog.appendChild(content);
    document.body.appendChild(dialog);

    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
            if (typeof dialog.close === "function") {
                dialog.close();
            } else {
                dialog.removeAttribute("open");
            }
        }
    });
}

function initializeTaskFilters() {
    const filterButtons = document.querySelectorAll("[data-status-filter]");

    filterButtons.forEach(function (button) {
        button.setAttribute(
            "aria-pressed",
            String(button.dataset.statusFilter === activeFilter)
        );

        button.addEventListener("click", function () {
            activeFilter = button.dataset.statusFilter;

            filterButtons.forEach(function (filterButton) {
                const isActive =
                    filterButton.dataset.statusFilter === activeFilter;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            renderTasks();
        });
    });
}

function renderTechnology(technologyKey) {
    const technology = technologyInformation[technologyKey];

    if (!technology) {
        return;
    }

    if (technologyTitleElement) {
        technologyTitleElement.textContent = technology.title;
    }

    if (technologyDescriptionElement) {
        technologyDescriptionElement.textContent = technology.description;
    }

    if (technologyExtraElement) {
        technologyExtraElement.textContent = technology.extra;
    }

    if (technologyLinkElement) {
        technologyLinkElement.href = technology.link;
        technologyLinkElement.target = "_blank";
        technologyLinkElement.rel = "noopener noreferrer";
    }

    document.querySelectorAll("[data-technology]").forEach(function (button) {
        const isActive = button.dataset.technology === technologyKey;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function initializeTechnologyExplorer() {
    document.querySelectorAll("[data-technology]").forEach(function (button) {
        button.addEventListener("click", function () {
            renderTechnology(button.dataset.technology);
        });
    });

    renderTechnology("nextjs");
}

function initializeDashboard() {
    createApiElements();
    createTaskDialog();
    initializeTaskFilters();
    initializeTechnologyExplorer();
    loadTasks();
}

initializeDashboard();