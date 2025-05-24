import { Express } from "express";
import { getTasks } from "./tasks";

export default function routes(app: Express): void {
    app.get('/tasks', getTasks);

}
