"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TaskCardProps {
  title: string;
  description?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  color?: string;
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
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={cn(
        "border rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300",
        color
      )}
    >
      <div className="font-semibold text-lg">{title}</div>
      <div className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
        {description || <i className="opacity-60">— no description —</i>}
      </div>

      <div className="mt-3 flex gap-2">
        {onPrimary && (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPrimary();
            }}
            className="transition-transform hover:scale-105"
          >
            {primaryLabel}
          </Button>
        )}
        {onSecondary && (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onSecondary();
            }}
            className="transition-transform hover:scale-105"
          >
            {secondaryLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
};
