"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Message sent:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen p-6 space-y-10 fade-in bg-gradient-to-b from-background via-background/90 to-background flex flex-col items-center justify-center">
      {/* ✅ About Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
          Contact Us
        </h1>
        <p className="text-foreground/80 text-base leading-relaxed">
          <strong>MyTodo</strong> is your smart daily organizer — built to help you stay productive, 
          organized, and motivated. From managing tasks to tracking progress, MyTodo keeps your goals 
          simple, visual, and easy to achieve.
        </p>
      </motion.div>

      {/* ✅ Social Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-8 mb-8"
      >
        <a
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-110 shadow-md"
        >
          <Facebook className="w-6 h-6 text-black dark:text-white" />
        </a>

        <a
          href="https://instagram.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-transform hover:scale-110 shadow-md"
        >
          <Instagram className="w-6 h-6 text-black dark:text-white" />
        </a>

        <a
          href="mailto:support@mytodoapp.com"
          className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-transform hover:scale-110 shadow-md"
        >
          <Mail className="w-6 h-6 text-black dark:text-white" />
        </a>
      </motion.div>

      {/* ✅ Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-background/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                name="message"
                placeholder="Write your message..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md hover:shadow-lg transition-all"
            >
              Send Message
            </Button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-medium">
            ✅ Thank you! Your message has been sent successfully.
            <div className="mt-6">
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
