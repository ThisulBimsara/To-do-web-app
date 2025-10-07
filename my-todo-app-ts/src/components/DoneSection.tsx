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

export default function DoneSection() {
  const { done } = useTaskStore();

  const removeDone = (id: string) => {
    useTaskStore.setState((st) => ({
      done: st.done.filter((t) => t.id !== id),
    }));
  };

  return (
    <Droppable droppableId="done">
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`min-h-[220px] transition-colors ${
            snapshot.isDraggingOver ? "bg-muted/30" : "bg-background"
          }`}
        >
          <CardHeader>
            <CardTitle>Done</CardTitle>
            <CardDescription>Completed tasks</CardDescription>
          </CardHeader>

          <CardContent>
            {done.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No completed tasks yet.
              </p>
            ) : (
              <div className="space-y-3">
                {done.map((t, index) => (
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
                          primaryLabel="Move Back"
                          onPrimary={() =>
                            useTaskStore.setState((st) => ({
                              done: st.done.filter((d) => d.id !== t.id),
                              inProgress: [t, ...st.inProgress],
                            }))
                          }
                          secondaryLabel="Delete"
                          onSecondary={() => removeDone(t.id)}
                          color="bg-green-950/30"
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
