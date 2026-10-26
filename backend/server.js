const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;

const dataFile = path.join(__dirname, "data", "tasks.json");
const frontendDirectory = path.join(__dirname, "..");

app.use(express.json());

async function readTasks() {
    const data = await fs.readFile(dataFile, "utf8");
    return JSON.parse(data);
}

async function saveTasks(tasks) {
    await fs.writeFile(dataFile, JSON.stringify(tasks, null, 2));
}

app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        console.error("Error reading tasks:", error.message);
        res.status(500).json({ error: "Unable to retrieve tasks." });
    }
});

app.get("/api/tasks/:id", async (req, res) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(item => item.id === Number(req.params.id));

        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.json(task);
    } catch (error) {
        console.error("Error retrieving task:", error.message);
        res.status(500).json({ error: "Unable to retrieve task." });
    }
});

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(item => item.id === Number(req.params.id));

        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        const allowedStatuses = ["completed", "in-progress", "not-started"];
        const { status } = req.body;

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                error: "Invalid status. Use completed, in-progress, or not-started."
            });
        }

        task.status = status;

        await saveTasks(tasks);

        res.json({
            message: "Task status updated successfully.",
            task
        });
    } catch (error) {
        console.error("Error updating task:", error.message);
        res.status(500).json({ error: "Unable to update task." });
    }
});

app.use("/backend", (req, res) => {
    res.status(404).json({ error: "Resource not found." });
});

app.use(express.static(frontendDirectory));

app.listen(PORT, () => {
    console.log(`TechBridge API running at http://localhost:${PORT}`);
    console.log(`Dashboard: http://localhost:${PORT}/dashboard.html`);
});

