"use client";

import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TaskCard } from "@/components/TaskCard";
import { motion } from "framer-motion";
import { useTasks } from "@/hooks/useTasksQuery";
import { Task } from "@/types/task";

export default function DoneSection() {
  const { tasksQuery, updateTaskMutation, deleteTaskMutation } = useTasks();

  // ✅ Filter only tasks marked as "done"
  const done: Task[] = (tasksQuery.data ?? []).filter(
    (t: Task) => t.status === "done"
  );

  // 🔹 Move task back to In Progress
  const moveBack = async (task: Task) => {
    if (!task._id) return;
    await updateTaskMutation.mutateAsync({
      id: task._id,
      updates: { status: "inProgress" },
    });
  };

  // 🔹 Delete a completed task
  const doDelete = async (task: Task) => {
    if (!task._id) return;
    await deleteTaskMutation.mutateAsync(task._id);
  };

  return (
    <Droppable droppableId="done">
      {(provided, snapshot) => (
        <motion.div
          layout
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`min-h-[220px] transition-all duration-300 ${
            snapshot.isDraggingOver ? "bg-muted/40 scale-[1.01]" : "bg-background"
          }`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Done</CardTitle>
              <CardDescription>Completed tasks</CardDescription>
            </CardHeader>

            <CardContent>
              {done.length === 0 ? (
                <p className="text-sm text-muted-foreground animate-pulse">
                  No completed tasks yet.
                </p>
              ) : (
                <motion.div layout className="space-y-3">
                  {done.map((t: Task, index: number) => (
                    <Draggable
                      key={t._id ?? `temp-${index}`}
                      draggableId={(t._id ?? `temp-${index}`).toString()}
                      index={index}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={dragSnapshot.isDragging ? "opacity-70" : ""}
                        >
                          <TaskCard
                            title={t.title}
                            description={t.description}
                            primaryLabel="Move Back"
                            onPrimary={() => moveBack(t)}
                            secondaryLabel="Delete"
                            onSecondary={() => doDelete(t)}
                            color="bg-green-950/20 dark:bg-green-900/30"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Droppable>
  );
}
