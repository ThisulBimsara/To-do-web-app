"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import TodoSection from "@/components/TodoSection";
import InProgressSection from "@/components/InProgressSection";
import DoneSection from "@/components/DoneSection";
import { useTasks } from "@/hooks/useTasksQuery";
import { Task } from "@/types/task";

export default function Page() {
  const { tasksQuery, updateTaskMutation, clearAllMutation } = useTasks();

  const tasks = tasksQuery.data ?? [];
  const todo: Task[] = tasks.filter((t: Task) => t.status === "todo");
  const inProgress: Task[] = tasks.filter((t: Task) => t.status === "inProgress");
  const done: Task[] = tasks.filter((t: Task) => t.status === "done");

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const from = source.droppableId;
    const to = destination.droppableId;

    const allLists: Record<string, Task[]> = { todo, inProgress, done };
    const task = allLists[from][source.index];
    if (!task?._id) return;

    const id = task._id;
    if (from === "todo" && to === "inProgress")
      await updateTaskMutation.mutateAsync({ id, updates: { status: "inProgress" } });
    if (from === "inProgress" && to === "done")
      await updateTaskMutation.mutateAsync({ id, updates: { status: "done" } });
    if (from === "inProgress" && to === "todo")
      await updateTaskMutation.mutateAsync({ id, updates: { status: "todo" } });
  };

  return (
    <div className="p-6 space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Todo List</h1>
        <Button
          variant="destructive"
          onClick={() => clearAllMutation.mutate()}
          className="hover-scale"
        >
          Clear All Tasks
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid md:grid-cols-3 gap-4">
          <div id="todo">
            <TodoSection />
          </div>
          <div id="inprogress">
            <InProgressSection />
          </div>
          <div id="done">
            <DoneSection />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
