import { inject, Injectable, signal } from "@angular/core";

import { TaskStatus, type Task } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasks = signal<Task[]>([])
    private loggingService = inject(LoggingService)

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
        this.loggingService.log(`Added new task: ${newTask.title}`)
    }

    updateTasksStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update(
            (oldTasks) => oldTasks.map(
                (task) => task.id === taskId 
                    ? { 
                        ...task, 
                        status: newStatus 
                    } 
                    : task
            )
        )
        this.loggingService.log(`Updated task ${taskId} to ${newStatus}`)
    }
}