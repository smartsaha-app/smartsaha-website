// lib/api.ts
import axios from 'axios';

let accessToken: string | null = null;

// Type pour la fonction de notification
type OnUnauthenticatedCallback = () => void;
let onUnauthenticated: OnUnauthenticatedCallback | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

/**
 * Enregistre une fonction de rappel déclenchée lors d'une erreur 401.
 * Permet au AuthContext/React de gérer la redirection via useRouter().
 */
export const setOnUnauthenticated = (callback: OnUnauthenticatedCallback) => {
  onUnauthenticated = callback;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Intercepteur de requête
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Intercepteur de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized) {
      // 1. On vide le token local immédiatement
      setAccessToken(null);

      // 2. On notifie le contexte d'authentification s'il est enregistré
      if (onUnauthenticated) {
        onUnauthenticated();
      }
    }

    return Promise.reject(error);
  }
);