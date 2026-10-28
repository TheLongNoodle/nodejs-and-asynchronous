import inquirer from "inquirer";
import { input } from "@inquirer/prompts";
import * as todo from "./todo.js";
import * as utils from "./utils.js";

export const main = async () => {
    let isRunning = true;
    let taskID, title, description;

    while (isRunning) {
        const { action } = await inquirer.prompt([
            {
                type: "rawlist",
                name: "action",
                message: "Select an option:",
                choices: [
                    { name: "Create a New Task", value: "create" },
                    { name: "View All Tasks", value: "view_all" },
                    { name: "Update a Task", value: "update" },
                    { name: "Delete a Task", value: "delete" },
                    { name: "Mark Task as Done", value: "mark_done" },
                    { name: "Mark Task as Not Done", value: "mark_not_done" },
                    { name: "Exit", value: "exit" },
                ],
            },
        ]);

        switch (action) {
            case "create":
                title = await input({
                    message: "Enter your task:",
                    validate: (value) => (value.trim() !== "" ? true : "task cannot be empty."),
                });
                description = await input({
                    message: "Enter your task description:",
                });
                todo.createTask(title, description);
                break;
            case "view_all":
                utils.printTasks();
                break;
            case "update":
                taskID = await utils.selectTask();
                if (taskID != null) {
                title = await input({
                    message: "Enter your task:",
                    validate: (value) => (value.trim() !== "" ? true : "task cannot be empty."),
                });
                description = await input({
                    message: "Enter your task description:",
                });
                todo.updateTask(taskID.taskID, title, description);
                }
                break;
            case "delete":
                taskID = await utils.selectTask();
                if (taskID != null) todo.deleteTask(taskID.taskID);
                break;
            case "mark_done":
                taskID = await utils.selectTask();
                if (taskID != null) todo.markTaskAsDone(taskID.taskID);
                break;
            case "mark_not_done":
                taskID = await utils.selectTask();
                if (taskID != null) todo.markTaskAsNotDone(taskID.taskID);
                break;
            case "exit":
                console.log("Goodbye!");
                isRunning = false;
                break;
        }
    }
};

main();
