"use client";

import React from "react";
import { useTaskStore } from "@/store/useTaskStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InProgressSection() {
  const {
    inProgress,
    moveInProgressToTodo,
    moveInProgressToDone,
    selectInProgress,
  } = useTaskStore();

  return (
    <Card className="min-h-[220px]">
      <CardHeader>
        <CardTitle>In Progress</CardTitle>
        <CardDescription>Tasks being worked on</CardDescription>
      </CardHeader>

      <CardContent>
        {inProgress.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks in progress.</p>
        ) : (
          <div className="space-y-3">
            {inProgress.map((t) => (
              <div
                key={t.id}
                className="border rounded-md p-3 bg-background/50 hover:shadow cursor-pointer"
                onClick={() => selectInProgress(t.id)}
              >
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                  {t.description || <i className="text-muted">— no description —</i>}
                </div>

                <div className="mt-3 flex gap-2">
                  <Button variant="outline" onClick={(e) => {
                    e.stopPropagation();
                    moveInProgressToTodo(t.id);
                  }}>
                    Move Back
                  </Button>

                  <Button onClick={(e) => {
                    e.stopPropagation();
                    moveInProgressToDone(t.id);
                  }}>
                    Mark Done
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
