import fs from "node:fs";
import { Request,Response } from 'express';

export const getTasks = async (req:Request,res:Response) => {
    const filePath = "./data/tasks/tasks.json";
    const report = fs.readFileSync(filePath, "utf-8");
    const tasks: Report[] = JSON.parse(report);

    tasks ? res.status(200).send(tasks) : res.status(404).send('Tasks not found');
}
