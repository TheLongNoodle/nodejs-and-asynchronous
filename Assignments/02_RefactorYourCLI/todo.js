import { v4 as uuidv4 } from "uuid";
import { loadTasks, saveTasks } from "./storage.js";
import { printSuccess, printError, printInfo } from "./utils.js";

const createTask = async (title, description) => {
    const tasks = await loadTasks();
    const newTask = {
        id: uuidv4(),
        title,
        description,
        status: "not done",
    };
    tasks.push(newTask);
    saveTasks(tasks);
    printSuccess("Task created!");
};

const getTasks = async () => {
    return await loadTasks();
};

const getTask = async (id) => {
    const tasks = await loadTasks();
    return tasks.find((task) => task.id === id);
};

const updateTask = async (id, title, description) => {
    const tasks = await loadTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) printError("ERROR: task not updated");
    else {
        tasks[index].title = title;
        tasks[index].description = description;
        saveTasks(tasks);
        printSuccess("Task updated!");
    }
};

const deleteTask = async (id) => {
    const tasks = await loadTasks();
    saveTasks(tasks.filter((task) => task.id !== id));
    printSuccess("Task deleted!");
};

const markTaskAsDone = async (id) => {
    const tasks = await loadTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) printError("ERROR: task not updated");
    else if (tasks[index].status === "done") printInfo("Task already marked done");
    else {
        tasks[index].status = "done";
        saveTasks(tasks);
        printSuccess("Task status changed!");
    }
};

const markTaskAsNotDone = async (id) => {
    const tasks = await loadTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) printError("ERROR: task not updated");
    else if (tasks[index].status === "not done") printInfo("Task already marked not done");
    else {
        tasks[index].status = "not done";
        saveTasks(tasks);
        printSuccess("Task status changed!");
    }
};

export { createTask, deleteTask, getTask, getTasks, markTaskAsDone, markTaskAsNotDone, updateTask };
