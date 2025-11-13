// src/types/task.ts
export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: "todo" | "inProgress" | "done";
}
