"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // optional: helps merge classNames

interface TaskCardProps {
  title: string;
  description?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  color?: string; // e.g. "bg-blue-950/30"
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  onPrimary,
  onSecondary,
  primaryLabel = "Primary",
  secondaryLabel = "Secondary",
  color = "bg-background/50",
}) => {
  return (
    <div
      className={cn(
        "border rounded-md p-3 hover:shadow transition cursor-pointer",
        color
      )}
    >
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
        {description || <i className="text-muted">— no description —</i>}
      </div>

      <div className="mt-3 flex gap-2">
        {onPrimary && (
          <Button size="sm" onClick={(e) => { e.stopPropagation(); onPrimary(); }}>
            {primaryLabel}
          </Button>
        )}
        {onSecondary && (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => { e.stopPropagation(); onSecondary(); }}
          >
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
