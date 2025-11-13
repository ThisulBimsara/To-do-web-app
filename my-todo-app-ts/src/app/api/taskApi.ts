// src/api/taskApi.ts
import { Task } from "@/types/task";

const API_URL = "http://localhost:4000/tasks";

async function handleRes<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const message = text || `${res.status} ${res.statusText}`;
    throw new Error(message);
  }
  // Some endpoints return no content on DELETE (204). Handle that.
  if (res.status === 204) return (undefined as unknown) as T;
  return res.json();
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);
  return handleRes<Task[]>(res);
};

export const createTask = async (task: Omit<Task, "_id" | "id">): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return handleRes<Task>(res);
};

export const updateTaskApi = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return handleRes<Task>(res);
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return handleRes<void>(res);
};

export const clearAllTasksApi = async (): Promise<void> => {
  const res = await fetch(API_URL, { method: "DELETE" });
  return handleRes<void>(res);
};
