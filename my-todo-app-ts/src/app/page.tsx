<<<<<<< Updated upstream
"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/useTaskStore";
=======
// src/app/page.tsx
import React from "react";
>>>>>>> Stashed changes
import TodoSection from "@/components/TodoSection";
import InProgressSection from "@/components/InProgressSection";
import DoneSection from "@/components/DoneSection";
import TaskDialogs from "@/components/TaskDialogs";

export default function Page() {
<<<<<<< Updated upstream
  const { moveInProgressToDone, moveInProgressToTodo, moveDraftToInProgress, todo, inProgress, done, clearAllTasks } =
    useTaskStore();

  
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

 
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

 
    const from = source.droppableId;
    const to = destination.droppableId;

    if (from === to) return; 

     const allLists: Record<string, any[]> = { todo, inProgress, done };
    const sourceList = allLists[from];
    const task = sourceList[source.index];
    if (!task) return;

    if (from === "todo" && to === "inProgress") {
      useTaskStore.getState().moveDraftToInProgress(task);
    } else if (from === "inProgress" && to === "done") {
      useTaskStore.getState().moveInProgressToDone(task.id);
    } else if (from === "inProgress" && to === "todo") {
      useTaskStore.getState().moveInProgressToTodo(task.id);
    } else if (from === "done" && to === "inProgress") {
      useTaskStore.setState((s) => ({
        done: s.done.filter((t) => t.id !== task.id),
        inProgress: [task, ...s.inProgress],
      }));
    } else if (from === "done" && to === "todo") {
      useTaskStore.setState((s) => ({
        done: s.done.filter((t) => t.id !== task.id),
        todo: [task, ...s.todo],
      }));
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">TO do LisT</h1>
        <Button variant="destructive" onClick={clearAllTasks}>
          Delete All Tasks
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid md:grid-cols-3 gap-4">
          <TodoSection />
          <InProgressSection />
          <DoneSection />
        </div>
      </DragDropContext>

      <TaskDialogs />
    </div>
=======
  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Task Workflow</h1>
        <p className="text-sm text-muted-foreground">Drafts → In Progress → Done</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TodoSection />
        <InProgressSection />
        <DoneSection />
      </div>

      {/* Dialogs mount once and read store selection */}
      <TaskDialogs />
    </main>
>>>>>>> Stashed changes
  );
}
