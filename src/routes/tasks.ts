import fs from "node:fs";
import { Request,Response } from 'express';
import path from "node:path";

interface Task {
    id: number;
    title: string;
    description: string;
}

const FILE_PATH = "./data/tasks/";

export const getTasks = async (req:Request,res:Response):Promise<void> => {
    const files:string[] = fs.readdirSync(FILE_PATH);
    let tasks:Task[] = [];
    const jsonFiles:string[] = files.filter(file => file.endsWith('.json'));
    for (const file of jsonFiles) {
        const report: string = fs.readFileSync(path.join(FILE_PATH, file), "utf-8");
        const parsedTasks: Task[] = JSON.parse(report);

        for (const task of parsedTasks) {
            tasks.push(task);
        }
    }
        tasks ? res.status(200).send(tasks) : res.status(404).send({message: 'Tasks not found'});
}

export const getTask = async (req:Request,res:Response):Promise<void> => {
    const id:string = req.params.id;
    const files:string[] = fs.readdirSync(FILE_PATH);
    let tasks:Task[] = [];
    const jsonFiles:string[] = files.filter(file => file.endsWith('.json'));
    for (const file of jsonFiles) {
        const report: string = fs.readFileSync(path.join(FILE_PATH, file), "utf-8");
        const parsedTasks: Task[] = JSON.parse(report);

        for (const task of parsedTasks) {
            tasks.push(task);
        }
    }

    const task = tasks.find(task => task.id.toString() === id);
    task ? res.status(200).send(task) : res.status(404).send({message: 'Task not found'});

}
