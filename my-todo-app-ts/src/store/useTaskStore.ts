import { create } from "zustand";
import { Task } from "@/types/task";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "";

export interface TaskStore {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, "_id">) => Promise<void>;
  moveTodoToInProgress: (task: Task) => Promise<void>;
  moveInProgressToDone: (task: Task) => Promise<void>;
  moveInProgressToTodo: (task: Task) => Promise<void>;
  moveDoneToInProgress: (task: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
  clearAllTasks: () => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  todo: [],
  inProgress: [],
  done: [],

  // 🔹 Fetch all tasks
  fetchTasks: async () => {
    try {
      const res = await fetch(`${API_URL}/all`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data: Task[] = await res.json();

      set({
        todo: data.filter((t) => t.status === "todo"),
        inProgress: data.filter((t) => t.status === "inProgress"),
        done: data.filter((t) => t.status === "done"),
      });
    } catch (err) {
      console.error("Fetch tasks error:", err);
    }
  },

  // 🔹 Add new task
  addTask: async (task) => {
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const newTask: Task = await res.json();
      set((state) => ({ todo: [...state.todo, newTask] }));
    } catch (err) {
      console.error("Add task error:", err);
    }
  },

  // 🔹 Move Todo → In Progress
  moveTodoToInProgress: async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "inProgress" }),
      });
      if (!res.ok) throw new Error("Failed to move task");
      const updated: Task = await res.json();

      set((state) => ({
        todo: state.todo.filter((t) => t._id !== task._id),
        inProgress: [...state.inProgress, updated],
      }));
    } catch (err) {
      console.error("Move to InProgress error:", err);
    }
  },

  // 🔹 Move In Progress → Done
  moveInProgressToDone: async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "done" }),
      });
      if (!res.ok) throw new Error("Failed to move task");
      const updated: Task = await res.json();

      set((state) => ({
        inProgress: state.inProgress.filter((t) => t._id !== task._id),
        done: [...state.done, updated],
      }));
    } catch (err) {
      console.error("Move to Done error:", err);
    }
  },

  // 🔹 Move In Progress → Todo
  moveInProgressToTodo: async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "todo" }),
      });
      if (!res.ok) throw new Error("Failed to move task");
      const updated: Task = await res.json();

      set((state) => ({
        inProgress: state.inProgress.filter((t) => t._id !== task._id),
        todo: [...state.todo, updated],
      }));
    } catch (err) {
      console.error("Move to Todo error:", err);
    }
  },

  // 🔹 Move Done → In Progress
  moveDoneToInProgress: async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "inProgress" }),
      });
      if (!res.ok) throw new Error("Failed to move task");
      const updated: Task = await res.json();

      set((state) => ({
        done: state.done.filter((t) => t._id !== task._id),
        inProgress: [...state.inProgress, updated],
      }));
    } catch (err) {
      console.error("Move Done → InProgress error:", err);
    }
  },

  // 🔹 Update a task (title/description)
  updateTask: async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated: Task = await res.json();

      set((state) => {
        const updateList = (list: Task[]) =>
          list.map((t) => (t._id === id ? updated : t));
        return {
          todo: updateList(state.todo),
          inProgress: updateList(state.inProgress),
          done: updateList(state.done),
        };
      });
    } catch (err) {
      console.error("Update task error:", err);
    }
  },

  // 🔹 Delete task
  deleteTask: async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");

      set((state) => ({
        todo: state.todo.filter((t) => t._id !== task._id),
        inProgress: state.inProgress.filter((t) => t._id !== task._id),
        done: state.done.filter((t) => t._id !== task._id),
      }));
    } catch (err) {
      console.error("Delete task error:", err);
    }
  },

  // 🔹 Clear all tasks
  clearAllTasks: async () => {
    try {
      await fetch(`${API_URL}/clear`, { method: "DELETE" });
      set({ todo: [], inProgress: [], done: [] });
    } catch (err) {
      console.error("Clear all tasks error:", err);
    }
  },
}));
