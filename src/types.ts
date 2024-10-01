export interface Actor {
    id: number;
    name: string;
    status: Task;
    location: {
        lat: number;
        lng: number;
    }
}

export const tasks = ["Idle", "Working", "Charging", "Unpacking"] as const;
export type Task = typeof tasks[number];