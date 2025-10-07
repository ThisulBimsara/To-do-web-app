"use client";

import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TodoSection from "@/components/TodoSection";
import InProgressSection from "@/components/InProgressSection";
import DoneSection from "@/components/DoneSection";
import { useTaskStore } from "@/store/useTaskStore";

export default function DndBoard() {
  const { todo, inProgress, done } = useTaskStore();

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
    const store = useTaskStore.getState();

    const lists: Record<string, any[]> = { todo, inProgress, done };
    const sourceList = [...lists[from]];
    const destList = [...lists[to]];
    const [movedTask] = sourceList.splice(source.index, 1);
    if (!movedTask) return;
    destList.splice(destination.index, 0, movedTask);

    useTaskStore.setState((state) => ({
      todo:
        from === "todo" || to === "todo"
          ? from === "todo"
            ? sourceList
            : to === "todo"
            ? destList
            : state.todo
          : state.todo,
      inProgress:
        from === "inProgress" || to === "inProgress"
          ? from === "inProgress"
            ? sourceList
            : to === "inProgress"
            ? destList
            : state.inProgress
          : state.inProgress,
      done:
        from === "done" || to === "done"
          ? from === "done"
            ? sourceList
            : to === "done"
            ? destList
            : state.done
          : state.done,
    }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TodoSection />
        <InProgressSection />
        <DoneSection />
      </div>
    </DragDropContext>
  );
}
