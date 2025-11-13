"use client";

import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskCard } from "@/components/TaskCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTasks } from "@/hooks/useTasksQuery";
import { Task } from "@/types/task";

export default function InProgressSection() {
  const { tasksQuery, updateTaskMutation } = useTasks();
  const inProgress: Task[] = (tasksQuery.data ?? []).filter(
    (t: Task) => t.status === "inProgress"
  );

  const moveToTodo = async (task: Task) => {
    if (!task._id) return;
    await updateTaskMutation.mutateAsync({
      id: task._id,
      updates: { status: "todo" },
    });
  };

  const moveToDone = async (task: Task) => {
    if (!task._id) return;
    await updateTaskMutation.mutateAsync({
      id: task._id,
      updates: { status: "done" },
    });
  };

  return (
    <Droppable droppableId="inProgress">
      {(provided, snapshot) => (
        <motion.div
          layout
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`transition-all duration-300 ${
            snapshot.isDraggingOver ? "scale-[1.01]" : ""
          }`}
        >
          <Card className="min-h-[220px]">
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
              <CardDescription>Tasks in progress</CardDescription>
            </CardHeader>

            <CardContent>
              {inProgress.length === 0 ? (
                <p className="text-sm text-muted-foreground animate-pulse">
                  No tasks in progress yet.
                </p>
              ) : (
                <motion.div layout className="space-y-3">
                  {inProgress.map((t: Task, index: number) => (
                    <Draggable
                      key={t._id ?? `inprogress-${index}`}
                      draggableId={(t._id ?? `inprogress-${index}`).toString()}
                      index={index}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={
                            dragSnapshot.isDragging ? "opacity-70" : ""
                          }
                        >
                          <TaskCard
                            title={t.title}
                            description={t.description}
                            primaryLabel="Done"
                            secondaryLabel="Back to Todo"
                            onPrimary={() => moveToDone(t)}
                            onSecondary={() => moveToTodo(t)}
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
