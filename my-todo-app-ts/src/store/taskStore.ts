import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "draft" | "todo" | "progress" | "done";
};

type TaskStore = {
  tasks: Task[];

  // Actions
  addDraftTask: (title: string) => void;
  updateTask: (id: string, updated: Partial<Task>) => void;
  moveTask: (id: string, status: Task["status"]) => void;
  removeTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addDraftTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          description: "",
          status: "draft",
        },
      ],
    })),

  updateTask: (id, updated) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updated } : task
      ),
    })),

  moveTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
