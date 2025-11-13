import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types/task";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface UpdateTaskInput {
  id: string;
  updates: Partial<Task>;
}

export function useTasks() {
  const queryClient = useQueryClient();

  // ✅ GET all tasks
  const tasksQuery = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/tasks`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
  });

  // ✅ ADD new task
  const addTaskMutation = useMutation<Task, Error, Task>({
    mutationFn: async (task) => {
      const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to add task");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // ✅ UPDATE task
  const updateTaskMutation = useMutation<Task, Error, UpdateTaskInput>({
    mutationFn: async ({ id, updates }) => {
      const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // ✅ DELETE task
  const deleteTaskMutation = useMutation<Task, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // ✅ CLEAR ALL tasks (optional — if backend supports it)
  const clearAllMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/tasks`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to clear tasks");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasksQuery,
    addTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    clearAllMutation,
  };
}
