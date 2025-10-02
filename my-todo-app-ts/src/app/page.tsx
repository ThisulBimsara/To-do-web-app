

"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Task = {
  id: string;
  title: string;
  description: string;
};

export default function Page() {
  // Lists for each column
  const [drafts, setDrafts] = useState<Task[]>([]);
  const [todos, setTodos] = useState<Task[]>([]);
  const [progress, setProgress] = useState<Task[]>([]);

  // Input for adding new draft (section 1)
  const [newTitle, setNewTitle] = useState("");

  // Dialog state for editing a draft (title + description)
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingDescription, setEditingDescription] = useState("");

  // Helpers
  const uid = () => crypto.randomUUID();

  // Add a draft task (Section 1)
  const addDraft = () => {
    const title = newTitle.trim();
    if (!title) return;
    setDrafts((s) => [{ id: uid(), title, description: "" }, ...s]);
    setNewTitle("");
  };

  // Open dialog when user clicks a draft card
  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setEditingDescription(task.description || "");
    setOpenDialog(true);
  };

  // Save from dialog:
  // - If editingTask exists in drafts, remove from drafts and add to todos with description (Section 2)
  const saveDialog = () => {
    if (!editingTask) return;

    const updated: Task = {
      ...editingTask,
      description: editingDescription.trim(),
    };

    // remove from drafts if present
    setDrafts((list) => list.filter((t) => t.id !== editingTask.id));

    // add to todos
    setTodos((list) => [updated, ...list]);

    // close dialog
    setEditingTask(null);
    setEditingDescription("");
    setOpenDialog(false);
  };

  // Cancel dialog
  const cancelDialog = () => {
    setEditingTask(null);
    setEditingDescription("");
    setOpenDialog(false);
  };

  // Move handlers between columns
  const moveDraftFromTodo = (taskId: string) => {
    // move from todos -> drafts
    const t = todos.find((x) => x.id === taskId);
    if (!t) return;
    setTodos((s) => s.filter((x) => x.id !== taskId));
    setDrafts((s) => [t, ...s]);
  };

  const moveTodoToProgress = (taskId: string) => {
    const t = todos.find((x) => x.id === taskId);
    if (!t) return;
    setTodos((s) => s.filter((x) => x.id !== taskId));
    setProgress((s) => [t, ...s]);
  };

  const moveProgressToTodo = (taskId: string) => {
    const t = progress.find((x) => x.id === taskId);
    if (!t) return;
    setProgress((s) => s.filter((x) => x.id !== taskId));
    setTodos((s) => [t, ...s]);
  };

  const removeFromProgress = (taskId: string) => {
    setProgress((s) => s.filter((x) => x.id !== taskId));
  };

  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Task Workflow</h1>
        <p className="text-sm text-muted-foreground">
          
        </p>
      </div>

      {/* 3 columns: stacked on small screens, side-by-side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SECTION 1: Drafts */}
        <Card className="min-h-[200px]">
          <CardHeader>
            <CardTitle>To Do</CardTitle>
            <CardDescription>Type task name and click Add.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              <div>
                <Label htmlFor="newTask">Task</Label>
                <Input
                  id="newTask"
                  placeholder="Enter task name"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addDraft();
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={addDraft}>Add</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewTitle("");
                  }}
                >
                  Clear
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Draft Tasks</h3>
                {drafts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No draft tasks yet. Add one above.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {drafts.map((t) => (
                      <div
                        key={t.id}
                        className="border rounded-md p-3 hover:shadow cursor-pointer"
                        onClick={() => openEditDialog(t)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") openEditDialog(t);
                        }}
                      >
                        <div className="flex items-center justify-between">
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 2: To Do */}
        <Card className="min-h-[200px]">
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
            <CardDescription>Saved tasks ready to work on.</CardDescription>
          </CardHeader>

          <CardContent>
            {todos.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tasks in To Do. Save a draft to move here.
              </p>
            ) : (
              <div className="space-y-3">
                {todos.map((t) => (
                  <div
                    key={t.id}
                    className="border rounded-md p-3 bg-background/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold">{t.title}</div>
                        <div className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                          {t.description || <span className="italic">— no description —</span>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => moveDraftFromTodo(t.id)}
                      >
                        Back
                      </Button>
                      <Button onClick={() => moveTodoToProgress(t.id)}>
                        Move to In Progress
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* SECTION 3: In Progress */}
        <Card className="min-h-[200px]">
          <CardHeader>
            <CardTitle>Done</CardTitle>
            <CardDescription>Tasks currently in progress (final stage).</CardDescription>
          </CardHeader>

          <CardContent>
            {progress.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tasks in progress yet.
              </p>
            ) : (
              <div className="space-y-3">
                {progress.map((t) => (
                  <div
                    key={t.id}
                    className="border rounded-md p-3 bg-background/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold">{t.title}</div>
                        <div className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                          {t.description || <span className="italic">— no description —</span>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" onClick={() => moveProgressToTodo(t.id)}>
                        Move Back
                      </Button>
                      <Button variant="destructive" onClick={() => removeFromProgress(t.id)}>
                        Mark Done
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog used to edit a draft and save to To Do */}
      <Dialog open={openDialog} onOpenChange={(o) => !o && cancelDialog()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit & Save Task</DialogTitle>
            <DialogDescription>
              Add a description and save the task to the To Do list.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 py-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editingTask?.title ?? ""}
                onChange={(e) =>
                  setEditingTask((prev) => (prev ? { ...prev, title: e.target.value } : prev))
                }
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={editingDescription}
                onChange={(e) => setEditingDescription(e.target.value)}
                placeholder="Write details about the task..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={cancelDialog}>
              Cancel
            </Button>
            <Button onClick={saveDialog}>Save & Move to To Do</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
