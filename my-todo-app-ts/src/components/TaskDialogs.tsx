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

export default function TaskDialogs() {
  // store data + actions
  const {
    todo,
    inProgress,
    selectedDraftId,
    selectedInProgressId,
    selectDraft,
    selectInProgress,
    moveDraftToInProgress,
    updateInProgressTask,
  } = useTaskStore();

  // derive selected tasks
  const selectedDraft = selectedDraftId ? todo.find((t) => t.id === selectedDraftId) ?? null : null;
  const selectedInProgress = selectedInProgressId
    ? inProgress.find((t) => t.id === selectedInProgressId) ?? null
    : null;

  // local dialog fields
  const [draftTitle, setDraftTitle] = React.useState("");
  const [draftDescription, setDraftDescription] = React.useState("");

  const [inProgTitle, setInProgTitle] = React.useState("");
  const [inProgDescription, setInProgDescription] = React.useState("");

  // when selection changes, populate local fields
  React.useEffect(() => {
    if (selectedDraft) {
      setDraftTitle(selectedDraft.title);
      setDraftDescription(selectedDraft.description || "");
    } else {
      setDraftTitle("");
      setDraftDescription("");
    }
  }, [selectedDraftId, selectedDraft]);

  React.useEffect(() => {
    if (selectedInProgress) {
      setInProgTitle(selectedInProgress.title);
      setInProgDescription(selectedInProgress.description || "");
    } else {
      setInProgTitle("");
      setInProgDescription("");
    }
  }, [selectedInProgressId, selectedInProgress]);

  // save draft -> move to inProgress
  const handleSaveDraft = () => {
    if (!selectedDraft) return;
    const updated = { ...selectedDraft, title: draftTitle.trim() || selectedDraft.title, description: draftDescription.trim() };
    moveDraftToInProgress(updated);
    // clears selection inside store
    selectDraft(null);
  };

  // save changes to inProgress task (update only)
  const handleSaveInProgress = () => {
    if (!selectedInProgress) return;
    updateInProgressTask(selectedInProgress.id, {
      title: inProgTitle.trim() || selectedInProgress.title,
      description: inProgDescription.trim(),
    });
    selectInProgress(null);
  };

  return (
    <>
      {/* Draft dialog */}
      <Dialog open={!!selectedDraft} onOpenChange={(o) => !o && selectDraft(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Draft — Save to In Progress</DialogTitle>
            <DialogDescription>Add a title/description and save the task to In Progress.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 py-4">
            <div>
              <Label>Title</Label>
              <Input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea value={draftDescription} onChange={(e) => setDraftDescription(e.target.value)} rows={4} />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => selectDraft(null)}>Cancel</Button>
            <Button onClick={handleSaveDraft}>Save & Move</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* InProgress dialog */}
      <Dialog open={!!selectedInProgress} onOpenChange={(o) => !o && selectInProgress(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit In Progress</DialogTitle>
            <DialogDescription>Edit title/description for this In Progress task.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 py-4">
            <div>
              <Label>Title</Label>
              <Input value={inProgTitle} onChange={(e) => setInProgTitle(e.target.value)} />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea value={inProgDescription} onChange={(e) => setInProgDescription(e.target.value)} rows={4} />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => selectInProgress(null)}>Cancel</Button>
            <Button onClick={handleSaveInProgress}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
