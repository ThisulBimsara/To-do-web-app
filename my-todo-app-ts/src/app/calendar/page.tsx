"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CalendarPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await fetch("http://localhost:4000/calendar");
    const data = await res.json();
    setEvents(data);
  };

  const addEvent = async () => {
    if (!title || !date) return;

    const newEvent = { title, date, description };

    await fetch("http://localhost:4000/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    loadEvents();

    setTitle("");
    setDate("");
    setDescription("");
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        Calendar Reminders
      </motion.h1>

      {/* Add Event Card */}
      <motion.div
        className="p-6 rounded-2xl shadow-xl border bg-white/60 dark:bg-black/40 backdrop-blur-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="space-y-4">
          <Input
            placeholder="Event title (Birthday, Meeting...)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="focus:ring-2 ring-primary"
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="focus:ring-2 ring-primary"
          />

          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="focus:ring-2 ring-primary"
          />

          <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
            <Button className="w-full text-lg py-2" onClick={addEvent}>
              Add Reminder
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Events List */}
      <AnimatePresence>
        <div className="space-y-4">
          {events.map((ev) => (
            <motion.div
              key={ev._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 border rounded-xl shadow-md bg-white/60 dark:bg-black/40 backdrop-blur-lg cursor-pointer"
            >
              <h2 className="text-xl font-semibold">📌 {ev.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">📅 {ev.date}</p>

              {ev.description && (
                <p className="mt-2 text-muted-foreground">{ev.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}
