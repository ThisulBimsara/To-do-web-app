"use client";

import React from "react";
<<<<<<< Updated upstream
import { Droppable, Draggable } from "@hello-pangea/dnd";
=======
>>>>>>> Stashed changes
import { useTaskStore } from "@/store/useTaskStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
<<<<<<< Updated upstream
import { TaskCard } from "@/components/TaskCard";

export default function DoneSection() {
  const { done } = useTaskStore();

=======
import { Button } from "@/components/ui/button";

export default function DoneSection() {
  const { done, selectInProgress } = useTaskStore();

  // delete handler (keep as in your previous version)
>>>>>>> Stashed changes
  const removeDone = (id: string) => {
    useTaskStore.setState((st) => ({
      done: st.done.filter((t) => t.id !== id),
    }));
  };

  return (
<<<<<<< Updated upstream
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
=======
    <Card className="min-h-[220px]">
      <CardHeader>
        <CardTitle>Done</CardTitle>
        <CardDescription>Completed tasks</CardDescription>
      </CardHeader>

      <CardContent>
        {done.length === 0 ? (
          <p className="text-sm text-muted-foreground">No completed tasks yet.</p>
        ) : (
          <div className="space-y-3">
            {done.map((t) => (
              <div
                key={t.id}
                className="border rounded-md p-3 bg-background/50 hover:shadow cursor-pointer"
                onClick={() => selectInProgress(t.id)} // opens the same dialog
              >
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                  {t.description || <i className="text-muted">— no description —</i>}
                </div>

                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      useTaskStore.setState((st) => ({
                        done: st.done.filter((d) => d.id !== t.id),
                        inProgress: [t, ...st.inProgress],
                      }));
                    }}
                  >
                    Move Back
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDone(t.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
>>>>>>> Stashed changes
  );
}
