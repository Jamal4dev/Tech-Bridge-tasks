import { getStore } from "@netlify/blobs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const seedTasks = require("../../backend/data/tasks.json");

const ALLOWED_STATUSES = [
    "completed",
    "in-progress",
    "not-started"
];

function jsonResponse(status, data) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store"
        }
    });
}

async function readTasks(store) {
    let tasks = await store.get("tasks", { type: "json" });

    if (!tasks) {
        await store.setJSON("tasks", seedTasks, {
            onlyIfNew: true
        });

        tasks = await store.get("tasks", { type: "json" });
    }

    return tasks || seedTasks;
}

function getTaskId(pathname) {
    const apiMatch = pathname.match(
        /\/api\/tasks(?:\/(\d+))?$/
    );

    if (apiMatch) {
        return {
            valid: true,
            id: apiMatch[1] ? Number(apiMatch[1]) : null
        };
    }

    const functionMatch = pathname.match(
        /\/\.netlify\/functions\/tasks(?:\/(\d+))?$/
    );

    if (functionMatch) {
        return {
            valid: true,
            id: functionMatch[1] ? Number(functionMatch[1]) : null
        };
    }

    const redirectedMatch = pathname.match(/^\/(\d+)$/);

    if (redirectedMatch) {
        return {
            valid: true,
            id: Number(redirectedMatch[1])
        };
    }

    return {
        valid: false,
        id: null
    };
}

export default async function handler(request, context) {
    try {
        const url = new URL(request.url);
        const pathname = url.pathname.replace(/\/+$/, "") || "/";
        const route = getTaskId(pathname);

        if (!route.valid) {
            return jsonResponse(404, {
                error: "Resource not found."
            });
        }

        const method = request.method;
        const taskId = route.id;

        if (method !== "GET" && method !== "PUT") {
            return jsonResponse(405, {
                error: "Method not allowed."
            });
        }

        if (method === "PUT" && taskId === null) {
            return jsonResponse(405, {
                error: "PUT requires a task ID."
            });
        }

        const store = getStore("techbridge-tasks");
        const tasks = await readTasks(store);

        if (!Array.isArray(tasks)) {
            console.error("Stored task data is not an array.");

            return jsonResponse(500, {
                error: "Task storage contains invalid data."
            });
        }

        if (method === "GET" && taskId === null) {
            return jsonResponse(200, tasks);
        }

        const task = tasks.find(item => item.id === taskId);

        if (!task) {
            return jsonResponse(404, {
                error: "Task not found."
            });
        }

        if (method === "GET") {
            return jsonResponse(200, task);
        }

        let body;

        try {
            body = await request.json();
        } catch {
            return jsonResponse(400, {
                error: "Request body must contain valid JSON."
            });
        }

        if (!body || !ALLOWED_STATUSES.includes(body.status)) {
            return jsonResponse(400, {
                error: "Invalid status. Use completed, in-progress, or not-started."
            });
        }

        task.status = body.status;

        await store.setJSON("tasks", tasks);

        return jsonResponse(200, {
            message: "Task status updated successfully.",
            task
        });
    } catch (error) {
        console.error("Task API error:", error);

        return jsonResponse(500, {
            error: "Unable to process the task request."
        });
    }
}