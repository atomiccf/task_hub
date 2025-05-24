import * as fs from "node:fs";
import * as path from "node:path";

type TaskStatus = 'todo' | 'in_progress' | 'done';

type ReportResult = {
    todo: number;
    in_progress:number;
    done: number;
}
type Report = {
    title: string;
    status: TaskStatus;
}

export const generateReport = (filePath: string): ReportResult| null => {
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const result : ReportResult = {
        todo: 0,
        in_progress: 0,
        done: 0
    }

    try {
        const files:string[] = fs.readdirSync(filePath);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        for (const file of jsonFiles) {
            const report:string = fs.readFileSync(path.join(filePath, file), "utf-8");
            const tasks: Report[] = JSON.parse(report);

            for (const task of tasks) {
                if (task.status === 'todo') {
                    result.todo += 1;
                } else if (task.status === 'in_progress') {
                    result.in_progress += 1;
                } else if (task.status === 'done') {
                    result.done += 1;
                }
            }
        }

        return result;

    } catch (error) {
      throw new Error(`${error}`);
    }
}


