import fs from "fs";
import {printSuccess, printError, printInfo} from "./utils.js"

const saveTasks = (tasks) => {
    const tasksJson = JSON.stringify(tasks);
    fs.writeFileSync("./tasks.json", tasksJson, "utf8");
};

const loadTasks = () => {
    try {
        return JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
    } catch (err) {
        if (err.code === "ENOENT") printInfo("tasks.js not found, creting file...");
        else printError(err);
        return [];
    }
};

export { loadTasks, saveTasks };
