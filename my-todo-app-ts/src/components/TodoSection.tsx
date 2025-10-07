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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
<<<<<<< Updated upstream
import { TaskCard } from "@/components/TaskCard";

export default function TodoSection() {
  const { todo, addTodo, selectDraft, moveTodoToInProgress } = useTaskStore();
=======

export default function TodoSection() {
  const { todo, addTodo, selectDraft } = useTaskStore();
>>>>>>> Stashed changes
  const [title, setTitle] = React.useState("");

  const handleAdd = () => {
    const t = title.trim();
    if (!t) return;
    addTodo(t);
    setTitle("");
  };

  return (
<<<<<<< Updated upstream
    <Droppable droppableId="todo">
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`min-h-[220px] transition-colors ${
            snapshot.isDraggingOver ? "bg-muted/30" : "bg-background"
          }`}
        >
          <CardHeader>
            <CardTitle>To Do (Drafts)</CardTitle>
            <CardDescription>Type a task name and add to drafts.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              <div>
                <Label htmlFor="todo-input">Task</Label>
                <Input
                  id="todo-input"
                  placeholder="Enter task name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAdd}>Add</Button>
                <Button variant="outline" onClick={() => setTitle("")}>
                  Clear
                </Button>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Draft Tasks</h4>
                {todo.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No drafts yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {todo.map((t, index) => (
                      <Draggable key={t.id} draggableId={t.id} index={index}>
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            onClick={() => selectDraft(t.id)}
                            className={dragSnapshot.isDragging ? "opacity-70" : ""}
                          >
                            <TaskCard
                              title={t.title}
                              description={t.description}
                              primaryLabel="Start"
                              onPrimary={() => moveTodoToInProgress(t.id)}
                              secondaryLabel="Delete"
                              onSecondary={() =>
                                useTaskStore.setState((st) => ({
                                  todo: st.todo.filter((d) => d.id !== t.id),
                                }))
                              }
                              color="bg-blue-950/30"
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Droppable>
=======
    <Card className="min-h-[220px]">
      <CardHeader>
        <CardTitle>To Do (Drafts)</CardTitle>
        <CardDescription>Type a task name and add to drafts.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div>
            <Label htmlFor="todo-input">Task</Label>
            <Input
              id="todo-input"
              placeholder="Enter task name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAdd}>Add</Button>
            <Button variant="outline" onClick={() => setTitle("")}>
              Clear
            </Button>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Draft Tasks</h4>
            {todo.length === 0 ? (
              <p className="text-sm text-muted-foreground">No drafts yet.</p>
            ) : (
              <div className="space-y-2">
                {todo.map((t) => (
                  <div
                    key={t.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => selectDraft(t.id)}
                    onKeyDown={(e) => e.key === "Enter" && selectDraft(t.id)}
                    className="border rounded-md p-3 hover:shadow cursor-pointer flex justify-between items-start"
                  >
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      {t.description ? (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {t.description}
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground mt-1">
                          Click to add description & save
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">Draft</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
>>>>>>> Stashed changes
  );
}
