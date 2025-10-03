// src/app/page.tsx
import React from "react";
import TodoSection from "@/components/TodoSection";
import InProgressSection from "@/components/InProgressSection";
import DoneSection from "@/components/DoneSection";
import TaskDialogs from "@/components/TaskDialogs";

export default function Page() {
  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Task Workflow</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TodoSection />
        <InProgressSection />
        <DoneSection />
      </div>

      {/* Dialogs mount once and read store selection */}
      <TaskDialogs />
    </main>
  );
}
