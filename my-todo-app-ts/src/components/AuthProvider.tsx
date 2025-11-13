"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = { _id: string; name: string; email: string } | null;

type AuthContextProps = {
  user: User;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  });
  const [user, setUser] = useState<User>(null);

  const API = process.env.NEXT_PUBLIC_API_BASE;

  const fetchProfile = async (tkn?: string) => {
    const t = tkn ?? token;
    if (!t) {
      setUser(null);
      return;
    }
    try {
      const res = await fetch(`${API}/auth/profile`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const json = await res.json();
      setUser(json);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const login = async (tkn: string) => {
    localStorage.setItem("auth_token", tkn);
    setToken(tkn);
    await fetchProfile(tkn);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
