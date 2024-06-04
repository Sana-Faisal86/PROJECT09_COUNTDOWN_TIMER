#! /usr/bin/env node 
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
console.log(chalk.black.bgCyanBright("\n\t\t", "+".repeat(60)));
console.log(chalk.black.bgGray("\t\t>>>>>>>>>>>>>>>>", chalk.black.bgRedBright("WELLCOME TO COUNTDOWN TIMER"), "<<<<<<<<<<<<<<<"));
console.log(chalk.black.bgCyanBright("\t\t", "+".repeat(60)));
console.log(chalk.black.bgBlueBright("\n\t>>> Seconds must be into 60 =>"));
const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.red.bgWhite("\n\t>>> Please enter the amount of Second ==>"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.black.bgGreen("\n\t>>> Please enter valid number =>");
            }
            else if (input > 60) {
                return chalk.black.bgGreen("\n\t>>> Seconds must be in 60 ");
            }
            else {
                return true;
            }
        },
    },
]);
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.black.bgRedBright("\n\t\t>>> Time is Out <<<"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
