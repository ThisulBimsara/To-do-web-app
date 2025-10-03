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

export default function DoneSection() {
  const { done, selectInProgress } = useTaskStore();

  // delete handler (keep as in your previous version)
  const removeDone = (id: string) => {
    useTaskStore.setState((st) => ({
      done: st.done.filter((t) => t.id !== id),
    }));
  };

  return (
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
  );
}
