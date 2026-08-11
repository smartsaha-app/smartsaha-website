'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAccessToken, setOnUnauthenticated, api } from '@/lib/api';

interface User {
  id: string;
  username?: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // A. Définir l'action à exécuter quand api.ts intercepte un 401
    setOnUnauthenticated(() => {
      setUser(null);
      setAccessToken(null);
      router.push('/');
    });

    // B. Vérification initiale de la session au démarrage / F5
    const checkAuthStatus = async () => {
      try {
        const res = await api.get('/users/profile');
        setUser(res.data.user);
        if (res.data.accessToken) {
          setAccessToken(res.data.accessToken);
        }
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  // Connexion via API backend (payload: username, password)
  const login = async (username: string, password: string) => {
    const res = await api.post('/users/login', { username, password });

    if (res.data.accessToken) {
      setAccessToken(res.data.accessToken);
    }

    if (res.data.user) {
      setUser(res.data.user);
    }
  };

  const logout = async () => {
    try {
      await api.post('/users/logout');
    } catch {
      // Ignorer l'erreur réseau lors du logout
    } finally {
      setUser(null);
      setAccessToken(null);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};