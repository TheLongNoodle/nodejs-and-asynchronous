import * as todo from "./todo.js";
import chalk from "chalk";
import inquirer from "inquirer";

export function printSuccess(message) {
    console.log(chalk.green(`✔ ${message}`));
}

export function printError(message) {
    console.log(chalk.red(`✖ ${message}`));
}

export function printInfo(message) {
    console.log(chalk.blue(`ℹ ${message}`));
}

export async function selectTask() {
    const tasks = await todo.getTasks();
    if (tasks.length === 0) {
        printError("No tasks found.");
        return null;
    }
    return (await inquirer.prompt([
        {
            type: "rawlist",
            name: "taskID",
            message: "Select a task to update:",
            choices: tasks.map((t) => ({ name: `${t.title} (${t.status})`, value: t.id })),
        },
    ]));
}

export async function printTasks() {
    const tasks = await todo.getTasks();
    if (tasks.length === 0) {
        printInfo("There are no tasks in the sysstem");
    }

    tasks.forEach((t, index) => {
        const statusBadge = t.status === "done" ? chalk.green("[DONE]") : chalk.yellow("[NOT DONE]");
        console.log("-----------------------------------");
        console.log(`${index + 1}. Title: ${chalk.bold(t.title)}`);
        console.log(`Description: ${t.description}`);
        console.log(`${statusBadge}`);
        console.log("-----------------------------------\n");
    });
}
