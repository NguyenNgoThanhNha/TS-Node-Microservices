export class CareTasks {
    careTaskId: number;
    taskName: string;
    description?: string;
    unit?: string;
    priority?: string;
    createdAt: Date;
    updateAt: Date;
    dueDate?: Date;
    assignedTo?: string;
    completedAt?: Date;
    isRecurring: boolean;
    notes?: string;

    constructor(
        careTaskId: number,
        taskName: string,
        description?: string,
        unit?: string,
        priority?: string,
        createdAt: Date = new Date(),
        updateAt: Date = new Date(),
        dueDate?: Date,
        assignedTo?: string,
        completedAt?: Date,
        isRecurring: boolean = false,
        notes?: string
    ) {
        this.careTaskId = careTaskId;
        this.taskName = taskName;
        this.description = description;
        this.unit = unit;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.dueDate = dueDate;
        this.assignedTo = assignedTo;
        this.completedAt = completedAt;
        this.isRecurring = isRecurring;
        this.notes = notes;
    }
}
