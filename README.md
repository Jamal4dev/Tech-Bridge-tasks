# TechBridge Internship Management Platform

A responsive TechBridge website that brings together the public landing page, learning programs, the 30-day internship roadmap, an intern progress dashboard, and a searchable Challenge Hub.

## Features

- **Landing page:** TechBridge overview, Data Analytics and Web Development tracks, application CTA, and community links.
- **Internship roadmap:** Eight tasks for each learning track, with a track switcher.
- **Intern dashboard:** Shows intern profile, task totals, completed and remaining tasks, and a live completion percentage.
- **Task management:** View task details, filter by status, search task titles/descriptions/metadata, and change a task between `not-started`, `in-progress`, and `completed`.
- **Challenge Hub:** Six challenges (three per track), track and difficulty filters, search across challenge details, and a detail dialog showing skills, tools, objectives, and deliverables.
- **Responsive styling:** Layouts adapt to desktop and mobile screens. Light, system, and dark theme options are available on the main pages.
- **API feedback:** The dashboard shows loading, connection, and error states.

## Project Structure

techbridge-tasks/
├── .gitignore
├── index.html
├── dashboard.html
├── challenges.html
├── programs.html
├── tasks.html
├── style.css
├── script.js
├── dashboard.js
├── challenges.js
├── package.json
├── package-lock.json
├── README.md
├── images/
│   └── techbridge-logo.png
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── data/
│       └── tasks.json
├── netlify/
│   └── functions/
│       └── tasks.mjs
└── netlify.toml

Main Components

index.html: Main landing page.

dashboard.html: Internship dashboard for task management and progress tracking.

challenges.html: Challenge Hub for Data Analytics and Web Development challenges.

programs.html: Programs page.

tasks.html: Tasks page.

style.css: Shared website styling and responsive layouts.

script.js: Main website JavaScript functionality.

dashboard.js: Dashboard functionality, including task search, status management, and progress updates.

challenges.js: Challenge search and filtering functionality.

images/: Contains the TechBridge logo and other website image assets.

backend/server.js: Local backend server.

backend/package.json: Backend dependencies and startup scripts.

backend/package-lock.json: Records the backend's resolved npm dependency versions.

backend/data/tasks.json: Task data used by the backend.

netlify/functions/: Contains the Netlify serverless API functions.

netlify.toml: Netlify deployment configuration.

package.json: Root npm project configuration.

package-lock.json: Root npm dependency lockfile.

.gitignore: Specifies files and directories Git should ignore.

README.md: Project documentation, setup instructions, and deployment information.

## Technology

- HTML5, CSS3, and vanilla JavaScript
- Node.js and Express for local development
- Netlify Functions for the deployed task API
- Netlify Blobs for persistent task storage in the deployed environment

## Run locally with the Express backend

Requirements: Node.js (18 or newer recommended) and npm.

1. Clone or download this repository.
2. Open a terminal in the project folder.
3. Install the backend dependency and start the server:

   ```bash
   cd backend
   npm install
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

The Express server serves the website files and exposes the task API at `/api/tasks`. It reads and writes task statuses to `backend/data/tasks.json`.

## Run the Netlify version locally

The deployed version uses Netlify Functions and Netlify Blobs rather than the local JSON-file store.

1. Install the root dependencies:

   ```bash
   npm install
   ```

2. Start the Netlify development environment:

   ```bash
   npx netlify dev
   ```

3. Open the local URL printed by Netlify CLI. Use the same origin for the site and `/api/tasks` so requests reach the function.

Netlify Blobs requires a supported Netlify development/deployment context. If local Blobs storage is not configured for your environment, use the Express instructions above for local UI/API testing.

## Task API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/tasks` | Return all tasks |
| `GET` | `/api/tasks/:id` | Return one task |
| `PUT` | `/api/tasks/:id` | Update a task status |

A `PUT` request accepts JSON such as:

```json
{
  "status": "in-progress"
}
```

Allowed status values are `not-started`, `in-progress`, and `completed`. Invalid status values return `400`; unknown task IDs return `404`.

## Deployment

The root `netlify.toml` publishes the static website and routes `/api/tasks` requests to `netlify/functions/tasks.mjs`. The function stores task state in the Netlify Blobs store named `techbridge-tasks`.

To deploy:

1. Push the project to GitHub.
2. Import the repository into Netlify.
3. Use the repository root as the base directory and publish directory `.` (configured in `netlify.toml`).
4. Ensure the site is deployed with Netlify Functions and Blobs available.
5. Test the deployed `/api/tasks` endpoint and the dashboard status updates after deployment.

## Manual verification checklist

- [ ] Open the landing page and navigate to Programs, Internship Roadmap, Challenges, and Dashboard.
- [ ] Switch the roadmap between Data Analytics and Web Development; verify eight tasks appear for each.
- [ ] Search dashboard tasks by title, task number, description, and status; combine search with each status filter.
- [ ] Change a task status to each of the three allowed values and verify the progress percentage/counts update.
- [ ] Refresh the dashboard and verify saved task statuses remain.
- [ ] Open task details and close the dialog.
- [ ] Confirm the Challenge Hub contains three challenges per track.
- [ ] Combine challenge search with track and difficulty filters; verify empty results are explained.
- [ ] Open and close challenge details.
- [ ] Test navigation and layouts at desktop and mobile widths.
- [ ] Test the deployed API response and verify an invalid status is rejected.

## Important demo limitation

This project is an internship demonstration, not a production multi-user system. The deployed task store contains one shared set of task statuses; there is no authentication or per-intern data isolation. A production deployment should add authentication, authorization, and user-specific task records before allowing multiple interns to use the dashboard.
