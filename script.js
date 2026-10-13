"use strict";

/*
 * TECHBRIDGE INTERACTIVE INTERNSHIP ROADMAP
 *
 * This script:
 * 1. Stores the tasks for both internship tracks.
 * 2. Displays the selected track's eight tasks.
 * 3. Allows visitors to switch tracks without refreshing the page.
 * 4. Updates the selected-track indicator and button states.
 */


/* =========================================================
   1. DATA ANALYTICS TASKS
   ========================================================= */

const dataAnalyticsTasks = [

    {
        number: 1,
        title: "Data Cleaning Basics",
        day: 1,
        description:
            "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
        difficulty: "Beginner"
    },

    {
        number: 2,
        title: "Formulas & Pivot Tables",
        day: 4,
        description:
            "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
        difficulty: "Beginner"
    },

    {
        number: 3,
        title: "Data Visualization",
        day: 8,
        description:
            "Create charts and a simple dashboard that communicate useful insights from a dataset.",
        difficulty: "Beginner → Intermediate"
    },

    {
        number: 4,
        title: "Introduction to SQL",
        day: 11,
        description:
            "Practice basic SQL queries and use them to answer real-world questions about data.",
        difficulty: "Beginner → Intermediate"
    },

    {
        number: 5,
        title: "SQL Joins & Aggregations",
        day: 15,
        description:
            "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
        difficulty: "Intermediate"
    },

    {
        number: 6,
        title: "Lookup Functions & Data Wrangling",
        day: 19,
        description:
            "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
        difficulty: "Intermediate"
    },

    {
        number: 7,
        title: "Mini Analysis Project",
        day: 22,
        description:
            "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
        difficulty: "Intermediate"
    },

    {
        number: 8,
        title: "Capstone Project",
        day: 26,
        description:
            "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
        difficulty: "Intermediate"
    }

];


/* =========================================================
   2. WEB DEVELOPMENT TASKS
   ========================================================= */

const webDevelopmentTasks = [

    {
        number: 1,
        title: "Build the TechBridge Homepage",
        day: 1,
        description:
            "Create the first version of the TechBridge website using HTML and CSS.",
        difficulty: "Beginner"
    },

    {
        number: 2,
        title: "Build the TechBridge Programs Experience",
        day: 4,
        description:
            "Create a Programs experience presenting TechBridge's available learning programs.",
        difficulty: "Beginner"
    },

    {
        number: 3,
        title: "Build the Internship Tasks Experience",
        day: 8,
        description:
            "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
        difficulty: "Beginner → Intermediate"
    },

    {
        number: 4,
        title: "Build an Interactive Internship Roadmap",
        day: 11,
        description:
            "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
        difficulty: "Beginner → Intermediate"
    },

    {
        number: 5,
        title: "Build the Intern Registration Experience",
        day: 15,
        description:
            "Create a professional registration and onboarding interface for TechBridge interns.",
        difficulty: "Intermediate"
    },

    {
        number: 6,
        title: "Build the Task Submission System",
        day: 19,
        description:
            "Create an interface through which interns can prepare and submit their task work.",
        difficulty: "Intermediate"
    },

    {
        number: 7,
        title: "Build the Intern Dashboard",
        day: 22,
        description:
            "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
        difficulty: "Intermediate"
    },

    {
        number: 8,
        title: "Build the Complete TechBridge Internship Platform",
        day: 26,
        description:
            "Combine the different components created during the internship into a complete TechBridge platform.",
        difficulty: "Intermediate"
    }

];


/* =========================================================
   3. TRACK CONFIGURATION
   ========================================================= */

/*
 * Each track has:
 * - A display name.
 * - An array containing its eight tasks.
 */

const internshipTracks = {

    dataAnalytics: {
        name: "Data Analytics",
        tasks: dataAnalyticsTasks
    },

    webDevelopment: {
        name: "Web Development",
        tasks: webDevelopmentTasks
    }

};


/* =========================================================
   4. FIND THE HTML ELEMENTS
   ========================================================= */

const taskList = document.getElementById("task-list");

const selectedTrackLabel =
    document.getElementById("selected-track");

const trackButtons =
    document.querySelectorAll(".track-button");


/* =========================================================
   5. DIFFICULTY CLASS CONFIGURATION
   ========================================================= */

/*
 * These CSS classes connect each difficulty level
 * to its corresponding visual badge.
 */

const difficultyClasses = {

    "Beginner": "beginner",

    "Beginner → Intermediate": "beginner-intermediate",

    "Intermediate": "intermediate"

};


/* =========================================================
   6. CREATE ONE TASK CARD
   ========================================================= */

/*
 * This function receives one task object and creates
 * an HTML article containing its information.
 */

function createTaskCard(task) {

    // Create the article that will contain the task.
    const card = document.createElement("article");

    card.classList.add("task-card");


    // Create the task number.
    const taskNumber = document.createElement("div");

    taskNumber.classList.add("task-number");

    taskNumber.textContent = `Task ${task.number}`;


    // Create the task title.
    const taskTitle = document.createElement("h3");

    taskTitle.textContent = task.title;


    // Create the task day.
    const taskDay = document.createElement("p");

    taskDay.classList.add("task-day");

    taskDay.textContent = `Day ${task.day}`;


    // Create the difficulty badge.
    const difficulty = document.createElement("p");

    difficulty.classList.add("difficulty");

    difficulty.textContent = task.difficulty;


    /*
     * Look up the CSS class associated with the difficulty.
     * If no matching class exists, use a neutral fallback.
     */

    const difficultyClass =
        difficultyClasses[task.difficulty] || "intermediate";

    difficulty.classList.add(difficultyClass);


    // Create the task description.
    const description = document.createElement("p");

    description.classList.add("task-description");

    description.textContent = task.description;


    /*
     * Add each element to the card in the correct order.
     */

    card.append(
        taskNumber,
        taskTitle,
        taskDay,
        difficulty,
        description
    );


    // Return the completed card to the calling function.
    return card;

}


/* =========================================================
   7. RENDER THE SELECTED TRACK
   ========================================================= */

/*
 * This function:
 * - Checks whether the requested track exists.
 * - Clears the previous task list.
 * - Creates eight new cards.
 * - Updates the track label.
 * - Updates the selected state of both buttons.
 */

function renderTrack(trackKey) {

    // Check whether the requested track exists.
    if (!Object.hasOwn(internshipTracks, trackKey)) {

        console.error("Unknown internship track:", trackKey);

        return;

    }


    // Retrieve the selected track's configuration.
    const selectedTrack = internshipTracks[trackKey];


    /*
     * Remove the previous track's tasks.
     * This prevents duplicate cards when visitors switch tracks.
     */

    taskList.replaceChildren();


    /*
     * Loop through the selected track's task array.
     * Each task object becomes one HTML card.
     */

    selectedTrack.tasks.forEach(function (task) {

        const card = createTaskCard(task);

        taskList.appendChild(card);

    });


    // Update the selected-track indicator.
    selectedTrackLabel.textContent =
        `Currently viewing: ${selectedTrack.name}`;


    /*
     * Update both buttons so the selected track
     * is communicated visually and accessibly.
     */

    trackButtons.forEach(function (button) {

        const isSelected =
            button.dataset.track === trackKey;

        button.setAttribute(
            "aria-pressed",
            String(isSelected)
        );

    });

}


/* =========================================================
   8. CONNECT THE BUTTONS TO JAVASCRIPT
   ========================================================= */

/*
 * Every track button listens for a click.
 * When clicked, it tells renderTrack() which track to show.
 */

trackButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedTrackKey = button.dataset.track;

        renderTrack(selectedTrackKey);

    });

});


/* =========================================================
   9. DISPLAY THE DEFAULT TRACK
   ========================================================= */

/*
 * Data Analytics is the default track.
 * Visitors can switch to Web Development immediately.
 */

renderTrack("dataAnalytics");