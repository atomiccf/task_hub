import { Express } from "express";
import {getTask, getTasks} from "./tasks";

export default function routes(app: Express): void {
    app.get('/api/tasks', getTasks);
    app.get('/api/tasks/:id', getTask);

}
