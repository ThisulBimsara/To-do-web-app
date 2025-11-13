"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

interface Props {
  type: "login" | "signup";
}

export default function AuthForm({ type }: Props) {
  const { login } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // later replace with backend API call
    const fakeUser = { _id: "123", name: form.name || "User", email: form.email };
    login(fakeUser);
    router.push("/profile");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-card p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>

      {type === "signup" && (
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      )}
      <Input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <Button type="submit" className="w-full">
        {type === "login" ? "Login" : "Create Account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {type === "login" ? (
          <>
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-primary hover:underline"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-primary hover:underline"
            >
              Login
            </button>
          </>
        )}
      </p>
    </form>
  );
}
