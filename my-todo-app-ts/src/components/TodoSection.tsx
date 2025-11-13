"use client";

import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskCard } from "@/components/TaskCard";
import { motion } from "framer-motion";
import { useTasks } from "@/hooks/useTasksQuery";
import { Task } from "@/types/task";

export default function TodoSection() {
  const { tasksQuery, addTaskMutation, updateTaskMutation, deleteTaskMutation } =
    useTasks();
  const [title, setTitle] = useState("");

  const todo: Task[] = (tasksQuery.data ?? []).filter(
    (t: Task) => t.status === "todo"
  );

  const handleAdd = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    await addTaskMutation.mutateAsync({
      title: trimmed,
      description: "",
      status: "todo",
    });
    setTitle("");
  };

  const moveToInProgress = async (task: Task) => {
    if (!task._id) return;
    await updateTaskMutation.mutateAsync({
      id: task._id,
      updates: { status: "inProgress" },
    });
  };

  const doDelete = async (task: Task) => {
    if (!task._id) return;
    await deleteTaskMutation.mutateAsync(task._id);
  };

  return (
    <Droppable droppableId="todo">
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
              <CardTitle>To Do</CardTitle>
              <CardDescription>Tasks to be done</CardDescription>
            </CardHeader>

            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <Button onClick={handleAdd} className="rounded-lg shadow-sm hover:shadow-md">
                    Add
                  </Button>
                </div>
              </motion.div>

              {todo.length === 0 ? (
                <p className="text-sm text-muted-foreground animate-pulse">
                  No tasks yet.
                </p>
              ) : (
                <motion.div layout className="space-y-3">
                  {todo.map((t: Task, index: number) => (
                    <Draggable
                      key={t._id ?? `todo-${index}`}
                      draggableId={(t._id ?? `todo-${index}`).toString()}
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
                            primaryLabel="Start"
                            secondaryLabel="Delete"
                            onPrimary={() => moveToInProgress(t)}
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
