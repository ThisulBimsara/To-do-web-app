"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
  id: string;
  title: string;
  description: string;
};

type Store = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];

  selectedDraftId: string | null;
  selectedInProgressId: string | null;

  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  selectDraft: (id: string | null) => void;
  selectInProgress: (id: string | null) => void;

  moveDraftToInProgress: (task: Task) => void;
  moveInProgressToDone: (id: string) => void;
  moveInProgressToTodo: (id: string) => void;

  updateInProgressTask: (id: string, data: Partial<Task>) => void;

  clearAllTasks: () => void; 
};

export const useTaskStore = create<Store>()(
  persist(
    (set, get) => ({
      todo: [],
      inProgress: [],
      done: [],

      selectedDraftId: null,
      selectedInProgressId: null,

      addTodo: (title) =>
        set((s) => ({
          todo: [{ id: crypto.randomUUID(), title, description: "" }, ...s.todo],
        })),

      removeTodo: (id) =>
        set((s) => ({ todo: s.todo.filter((t) => t.id !== id) })),

      selectDraft: (id) => set(() => ({ selectedDraftId: id })),
      selectInProgress: (id) => set(() => ({ selectedInProgressId: id })),

      moveDraftToInProgress: (task) =>
        set((s) => ({
          todo: s.todo.filter((t) => t.id !== task.id),
          inProgress: [task, ...s.inProgress],
          selectedDraftId: null,
        })),

      moveInProgressToDone: (id) =>
        set((s) => {
          const task = s.inProgress.find((t) => t.id === id);
          if (!task) return s;
          return {
            inProgress: s.inProgress.filter((t) => t.id !== id),
            done: [task, ...s.done],
            selectedInProgressId: null,
          };
        }),

      moveInProgressToTodo: (id) =>
        set((s) => {
          const task = s.inProgress.find((t) => t.id === id);
          if (!task) return s;
          return {
            inProgress: s.inProgress.filter((t) => t.id !== id),
            todo: [task, ...s.todo],
            selectedInProgressId: null,
          };
        }),

      updateInProgressTask: (id, data) =>
        set((s) => ({
          inProgress: s.inProgress.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),

      //  Clear all tasks manually
      clearAllTasks: () =>
        set({
          todo: [],
          inProgress: [],
          done: [],
          selectedDraftId: null,
          selectedInProgressId: null,
        }),
    }),
    {
      name: "task-storage", 
    }
  )
);
