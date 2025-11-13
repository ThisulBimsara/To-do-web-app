"use client";

import { useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/useTaskStore";
import TodoSection from "@/components/TodoSection";

export default function TodoPage() {
  const { todo, moveTodoToInProgress, clearAllTasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const task = todo[source.index];
    if (!task) return;

    // Only allow moving from TODO → In Progress
    if (source.droppableId === "todo" && destination.droppableId === "inProgress") {
      await moveTodoToInProgress(task);
    }
  };

  return (
    <div className="p-6 space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">To Do Tasks</h1>
        <Button variant="destructive" onClick={clearAllTasks} className="hover-scale">
          Clear All Tasks
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoSection />
      </DragDropContext>
    </div>
  );
}
