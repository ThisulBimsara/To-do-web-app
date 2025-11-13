"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // ✅ Fix hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-xl font-bold">MyTodo</div>
        </nav>
      </header>
    );
  }

  const links = [
    { name: "Home", href: "/" },
    { name: "To Do List", href: "/todo" },
    { name: "In Progress", href: "/inprogress" },
    { name: "Done", href: "/completed" },
    { name: "Calendar", href: "/calendar" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-background via-background/90 to-background/60 backdrop-blur-md shadow-sm transition-all duration-500">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform"
          >
            MyTodo
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`relative font-medium group ${
                    isActive ? "text-primary" : "text-foreground/90 hover:text-primary"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            );
          })}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-3 hover:rotate-180 transition-transform"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="relative group">
              <Button variant="ghost" className="rounded-full">👤 Profile</Button>
              <div className="absolute hidden group-hover:block right-0 mt-2 w-44 bg-background shadow-lg rounded-xl border p-2">
                <Link href="/profile" className="block px-3 py-2 rounded-md hover:bg-accent/30">
                  View Profile
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-destructive/20"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-background/90 backdrop-blur-sm shadow-inner p-5 space-y-4"
          >
            {links.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-medium ${
                    isActive ? "text-primary underline underline-offset-4" : "text-foreground/90 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Button
              variant="ghost"
              className="w-full flex justify-center"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
