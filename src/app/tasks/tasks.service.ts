import { Injectable, signal } from "@angular/core";

import { type Task } from "./task.model";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasks = signal<Task[]>([])

    allTasks = this.tasks.asReadonly()
    
    addTask(taskData: { title: string; description: string }) {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title: taskData.title,
            description: taskData.description,
            status: 'OPEN'
        }
        this.tasks.update((prevValue) => ([
            ...prevValue,
            newTask
        ]))
    }
}