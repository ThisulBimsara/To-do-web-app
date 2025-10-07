"use client";

import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useTaskStore } from "@/store/useTaskStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TaskCard } from "@/components/TaskCard";

export default function InProgressSection() {
  const { inProgress, moveInProgressToTodo, moveInProgressToDone } = useTaskStore();

  return (
    <Droppable droppableId="inProgress">
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`min-h-[220px] transition-colors ${
            snapshot.isDraggingOver ? "bg-muted/30" : "bg-background"
          }`}
        >
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
            <CardDescription>Tasks being worked on</CardDescription>
          </CardHeader>

          <CardContent>
            {inProgress.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tasks in progress.</p>
            ) : (
              <div className="space-y-3">
                {inProgress.map((t, index) => (
                  <Draggable key={t.id} draggableId={t.id} index={index}>
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
                          primaryLabel="Mark Done"
                          onPrimary={() => moveInProgressToDone(t.id)}
                          secondaryLabel="Move Back"
                          onSecondary={() => moveInProgressToTodo(t.id)}
                          color="bg-yellow-950/30"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </Droppable>
  );
}
