export interface Task {
  _id?: string; // from MongoDB (optional when creating a new task)
  id?: string;  // alias for DnD / Zustand references
  title: string;
  description?: string;
  status: "todo" | "inProgress" | "done";
}
