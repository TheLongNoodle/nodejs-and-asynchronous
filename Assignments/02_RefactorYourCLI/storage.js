import fs from "fs/promises";
import { printSuccess, printError, printInfo } from "./utils.js";

const saveTasks = async (tasks) => {
    try {
        const tasksJson = JSON.stringify(tasks);
        await fs.writeFile("./tasks.json", tasksJson, "utf8");
    } catch (err) {
        printError(err);
    }
};

const loadTasks = async () => {
    try {
        const data = await fs.readFile("./tasks.json", "utf8");
        return JSON.parse(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            printInfo("tasks.json not found, creating file...");
        } else {
            printError(err);
        }
        return [];
    }
};

export { loadTasks, saveTasks };