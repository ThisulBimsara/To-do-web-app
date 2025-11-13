"use client";

import { useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/useTaskStore";
import InProgressSection from "@/components/InProgressSection";

export default function InProgressPage() {
  const { inProgress, moveInProgressToDone, moveInProgressToTodo, clearAllTasks, fetchTasks } =
    useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const task = inProgress[source.index];
    if (!task) return;

    if (source.droppableId === "inProgress" && destination.droppableId === "done")
      await moveInProgressToDone(task);
    if (source.droppableId === "inProgress" && destination.droppableId === "todo")
      await moveInProgressToTodo(task);
  };

  return (
    <div className="p-6 space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">In Progress Tasks</h1>
        <Button variant="destructive" onClick={clearAllTasks} className="hover-scale">
          Clear All Tasks
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <InProgressSection />
      </DragDropContext>
    </div>
  );
}
