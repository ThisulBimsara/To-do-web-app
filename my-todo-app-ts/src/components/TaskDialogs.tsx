"use client";

import React from "react";
import { useTaskStore } from "@/store/useTaskStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types/task";

export default function TaskDialogs() {
  const {
    todo,
    inProgress,
    moveTodoToInProgress,
    moveInProgressToDone,
    moveInProgressToTodo,
    moveDoneToInProgress,
    updateTask,
  } = useTaskStore();

  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleOpen = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
  };

  const handleSave = async () => {
    if (!selectedTask) return;
    await updateTask(selectedTask._id!, {
      title: title.trim() || selectedTask.title,
      description: description.trim(),
    });
    setSelectedTask(null);
  };

  return (
    <Dialog open={!!selectedTask} onOpenChange={(o) => !o && setSelectedTask(null)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update this task’s details.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setSelectedTask(null)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
