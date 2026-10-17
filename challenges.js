// ============================================
// TECHBRIDGE CHALLENGE DATA
// ============================================

const challenges = [

    // ----------------------------------------
    // DATA ANALYTICS CHALLENGES
    // ----------------------------------------

    {
        id: 1,

        title: "Sales Performance Analysis",

        track: "data-analytics",

        trackName: "Data Analytics",

        difficulty: "Beginner",

        description:
            "Analyze a small sales dataset to understand product performance and identify sales trends.",

        outcome:
            "A cleaned dataset and a short report highlighting important sales insights.",

        objective:
            "Examine sales records to identify the best-performing products, total revenue, and monthly sales patterns.",

        skills: [
            "Spreadsheet basics",
            "Data cleaning",
            "Basic formulas",
            "Data interpretation"
        ],

        tools: [
            "Microsoft Excel or Google Sheets"
        ],

        deliverables: [
            "A cleaned sales dataset",
            "A summary of key sales metrics",
            "A short report containing at least three findings"
        ],

        duration: "2–3 hours"
    },


    {
        id: 2,

        title: "Customer Data Investigation",

        track: "data-analytics",

        trackName: "Data Analytics",

        difficulty: "Intermediate",

        description:
            "Explore customer records to discover purchasing patterns and compare customer groups.",

        outcome:
            "A customer analysis report supported by tables and visualizations.",

        objective:
            "Use customer data to compare purchasing behaviour, identify valuable customer groups, and explain the patterns discovered.",

        skills: [
            "Data cleaning",
            "Sorting and filtering",
            "Pivot Tables",
            "Basic data visualization"
        ],

        tools: [
            "Microsoft Excel or Google Sheets",
            "Optional: Power BI"
        ],

        deliverables: [
            "A cleaned customer dataset",
            "A customer summary table",
            "At least two charts",
            "Three evidence-based recommendations"
        ],

        duration: "3–4 hours"
    },


    {
        id: 3,

        title: "Business Performance Dashboard",

        track: "data-analytics",

        trackName: "Data Analytics",

        difficulty: "Advanced",

        description:
            "Build a dashboard that presents important business performance indicators in one place.",

        outcome:
            "An interactive dashboard that communicates key business metrics and trends.",

        objective:
            "Transform a business dataset into a clear dashboard showing revenue, performance trends, and relevant comparisons.",

        skills: [
            "Data preparation",
            "KPI selection",
            "Data visualization",
            "Analytical thinking"
        ],

        tools: [
            "Microsoft Excel or Power BI",
            "A suitable sample business dataset"
        ],

        deliverables: [
            "A prepared dataset",
            "A dashboard with at least three KPIs",
            "At least three appropriate visualizations",
            "A short explanation of the findings"
        ],

        duration: "5–7 hours"
    },


    // ----------------------------------------
    // WEB DEVELOPMENT CHALLENGES
    // ----------------------------------------

    {
        id: 4,

        title: "Responsive Landing Page",

        track: "web-development",

        trackName: "Web Development",

        difficulty: "Beginner",

        description:
            "Create a responsive landing page for a fictional business, product, or technology program.",

        outcome:
            "A functional landing page that adapts to desktop, tablet, and mobile screens.",

        objective:
            "Build a structured webpage that communicates a clear message and guides visitors towards a primary action.",

        skills: [
            "HTML5 structure",
            "CSS layouts",
            "Responsive design",
            "Basic accessibility"
        ],

        tools: [
            "HTML",
            "CSS",
            "Visual Studio Code",
            "A web browser"
        ],

        deliverables: [
            "A complete landing page",
            "A clear navigation area",
            "A responsive content layout",
            "A prominent call-to-action button"
        ],

        duration: "2–3 hours"
    },


    {
        id: 5,

        title: "Personal Portfolio Website",

        track: "web-development",

        trackName: "Web Development",

        difficulty: "Intermediate",

        description:
            "Build a personal portfolio that presents a developer's skills, projects, and contact information.",

        outcome:
            "A responsive portfolio website that can be shared with recruiters and potential clients.",

        objective:
            "Create a professional online presence that presents projects clearly and makes it easy for visitors to get in touch.",

        skills: [
            "Semantic HTML",
            "CSS Flexbox or Grid",
            "Responsive design",
            "Basic JavaScript",
            "Git fundamentals"
        ],

        tools: [
            "HTML, CSS and JavaScript",
            "Visual Studio Code",
            "Git and GitHub"
        ],

        deliverables: [
            "A homepage with an introduction",
            "A skills section",
            "A project showcase",
            "Contact information",
            "A live deployment link"
        ],

        duration: "4–6 hours"
    },


    {
        id: 6,

        title: "Interactive Task Manager",

        track: "web-development",

        trackName: "Web Development",

        difficulty: "Advanced",

        description:
            "Develop a task manager that allows users to add tasks, mark them as complete, and remove them.",

        outcome:
            "An interactive task management application with clear task states.",

        objective:
            "Use JavaScript to manage task data and update the interface whenever a user adds, completes, or removes a task.",

        skills: [
            "JavaScript variables and arrays",
            "Objects and functions",
            "DOM manipulation",
            "Event listeners",
            "Local storage"
        ],

        tools: [
            "HTML",
            "CSS",
            "JavaScript",
            "Visual Studio Code"
        ],

        deliverables: [
            "An interface for adding tasks",
            "A way to mark tasks as complete",
            "A way to delete tasks",
            "A useful empty-state message",
            "Optional persistence using localStorage"
        ],

        duration: "5–7 hours"
    }

];


// ============================================
// SELECT HTML ELEMENTS
// ============================================

const challengeGrid = document.getElementById("challenge-grid");

const challengeResults = document.getElementById("challenge-results");

const trackFilterButtons = document.querySelectorAll(
    "[data-track-filter]"
);

const difficultyFilter = document.getElementById("difficulty-filter");


// Modal elements

const challengeDialog = document.getElementById("challenge-dialog");

const dialogCloseButton = document.getElementById("dialog-close");

const dialogDoneButton = document.getElementById("dialog-done");


// ============================================
// FILTER STATE
// ============================================

let selectedTrack = "all";

let selectedDifficulty = "all";


// ============================================
// CREATE A CHALLENGE CARD
// ============================================

function createChallengeCard(challenge) {

    // Create the main card.

    const card = document.createElement("article");

    card.className = "challenge-card";


    // Create the track label.

    const trackLabel = document.createElement("span");

    trackLabel.className = `challenge-track ${challenge.track}`;

    trackLabel.textContent = challenge.trackName;


    // Create the difficulty badge.

    const difficultyBadge = document.createElement("span");

    difficultyBadge.className =
        `difficulty-badge difficulty-${challenge.difficulty.toLowerCase()}`;

    difficultyBadge.textContent = challenge.difficulty;


    // Place the track and difficulty labels together.

    const cardMeta = document.createElement("div");

    cardMeta.className = "challenge-card-meta";

    cardMeta.append(trackLabel, difficultyBadge);


    // Create the challenge title.

    const title = document.createElement("h3");

    title.textContent = challenge.title;


    // Create the short description.

    const description = document.createElement("p");

    description.className = "challenge-description";

    description.textContent = challenge.description;


    // Create the expected outcome section.

    const outcomeHeading = document.createElement("h4");

    outcomeHeading.textContent = "Expected Outcome";


    const outcome = document.createElement("p");

    outcome.className = "challenge-outcome";

    outcome.textContent = challenge.outcome;


    // Create the View Challenge button.

    const viewButton = document.createElement("button");

    viewButton.type = "button";

    viewButton.className = "challenge-view-button";

    viewButton.textContent = "View Challenge";


    // Open the corresponding challenge details.

    viewButton.addEventListener("click", function () {

        openChallengeDetails(challenge.id);

    });


    // Assemble the card.

    card.append(
        cardMeta,
        title,
        description,
        outcomeHeading,
        outcome,
        viewButton
    );


    return card;

}


// ============================================
// FILTER AND DISPLAY CHALLENGES
// ============================================

function renderChallenges() {

    // Remove cards from the previous result.

    challengeGrid.replaceChildren();


    // Keep challenges matching BOTH filters.

    const filteredChallenges = challenges.filter(function (challenge) {

        const matchesTrack =
            selectedTrack === "all" ||
            challenge.track === selectedTrack;

        const matchesDifficulty =
            selectedDifficulty === "all" ||
            challenge.difficulty === selectedDifficulty;

        return matchesTrack && matchesDifficulty;

    });


    // Update the result count.

    const resultWord =
        filteredChallenges.length === 1 ? "challenge" : "challenges";

    challengeResults.textContent =
        `${filteredChallenges.length} ${resultWord} found`;


    // Handle an empty result.

    if (filteredChallenges.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.className = "challenge-empty";

        emptyMessage.textContent =
            "No challenges match your selected filters. Try changing your filters.";

        challengeGrid.appendChild(emptyMessage);

        return;

    }


    // Create and display the matching cards.

    filteredChallenges.forEach(function (challenge) {

        const card = createChallengeCard(challenge);

        challengeGrid.appendChild(card);

    });

}


// ============================================
// TRACK FILTER BUTTONS
// ============================================

trackFilterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Read the selected track from the clicked button.

        selectedTrack = button.dataset.trackFilter;


        // Update the active button and accessibility state.

        trackFilterButtons.forEach(function (filterButton) {

            const isSelected =
                filterButton.dataset.trackFilter === selectedTrack;

            filterButton.classList.toggle("is-active", isSelected);

            filterButton.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        });


        // Re-render using the selected filters.

        renderChallenges();

    });

});


// ============================================
// DIFFICULTY FILTER
// ============================================

difficultyFilter.addEventListener("change", function () {

    selectedDifficulty = difficultyFilter.value;

    renderChallenges();

});


// ============================================
// OPEN CHALLENGE DETAILS
// ============================================

function openChallengeDetails(challengeId) {

    // Find the selected challenge.

    const challenge = challenges.find(function (item) {

        return item.id === challengeId;

    });


    // Stop if the challenge cannot be found.

    if (!challenge) {

        return;

    }


    // Populate the modal with the selected challenge.

    document.getElementById("dialog-title").textContent =
        challenge.title;

    document.getElementById("dialog-track").textContent =
        challenge.trackName;

    const dialogDifficulty = document.getElementById("dialog-difficulty");

    dialogDifficulty.textContent = challenge.difficulty;

    dialogDifficulty.className =
        `difficulty-badge difficulty-${challenge.difficulty.toLowerCase()}`;

    document.getElementById("dialog-description").textContent =
        challenge.description;

    document.getElementById("dialog-objective").textContent =
        challenge.objective;

    document.getElementById("dialog-duration").textContent =
        challenge.duration;


    // Populate the skills, tools and deliverables lists.

    populateList("dialog-skills", challenge.skills);

    populateList("dialog-tools", challenge.tools);

    populateList("dialog-deliverables", challenge.deliverables);


    // Display the modal without leaving or refreshing the page.

    if (!challengeDialog.open) {

        challengeDialog.showModal();

    }

}


// ============================================
// POPULATE A LIST INSIDE THE MODAL
// ============================================

function populateList(elementId, items) {

    const list = document.getElementById(elementId);

    // Remove the previous challenge's list items.

    list.replaceChildren();


    // Create one list item for each entry.

    items.forEach(function (item) {

        const listItem = document.createElement("li");

        listItem.textContent = item;

        list.appendChild(listItem);

    });

}


// ============================================
// CLOSE THE MODAL
// ============================================

function closeChallengeDetails() {

    if (challengeDialog.open) {

        challengeDialog.close();

    }

}


// Close using the X button.

dialogCloseButton.addEventListener("click", closeChallengeDetails);


// Close using the Done button.

dialogDoneButton.addEventListener("click", closeChallengeDetails);


// Close when the user clicks the backdrop outside the dialog.

challengeDialog.addEventListener("click", function (event) {

    if (event.target === challengeDialog) {

        closeChallengeDetails();

    }

});


// ============================================
// INITIAL DISPLAY
// ============================================

// Show all six challenges when the page first loads.

renderChallenges();