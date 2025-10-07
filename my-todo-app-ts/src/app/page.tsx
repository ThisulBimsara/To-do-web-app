"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/useTaskStore";
import TodoSection from "@/components/TodoSection";
import InProgressSection from "@/components/InProgressSection";
import DoneSection from "@/components/DoneSection";
import TaskDialogs from "@/components/TaskDialogs";

export default function Page() {
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
  );
}
