// lib/api.ts
import type { QueryParams } from "../types/database";

export const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
let refreshRequest: Promise<boolean> | null = null;

function buildQueryString(params?: QueryParams) {
  if (!params) {
    return "";
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function buildApiUrl(path: string, params?: QueryParams) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}${buildQueryString(params)}`;
}

export function getSocketServerUrl() {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return API_BASE_URL;
  }
}

export async function apiRequest<TResponse>(
  path: string,
  init?: RequestInit,
  params?: QueryParams,
) {
  const response = await fetch(buildApiUrl(path, params), {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    credentials: "include",
    ...init,
  });

  if (response.status === 401 && shouldTryRefresh(path, init?.method)) {
    const refreshed = await refreshSession();

    if (refreshed) {
      return apiRequest<TResponse>(path, init, params);
    }
  }

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new ApiError(response.status, errorData.message || `Erro na requisição para ${path}.`, errorData);
    } catch (error) {
      if (error instanceof ApiError) throw error;

      // Se não for JSON, usa texto puro
      const message = await response.text();
      throw new ApiError(response.status, message || `Erro na requisição para ${path}.`);
    }
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

function shouldTryRefresh(path: string, method?: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedMethod = (method ?? "GET").toUpperCase();

  if (normalizedPath === "/auth/login" || normalizedPath === "/auth/refresh") {
    return false;
  }

  if (normalizedPath === "/auth/logout") {
    return false;
  }

  return normalizedMethod !== "OPTIONS";
}

async function refreshSession() {
  if (!refreshRequest) {
    refreshRequest = fetch(buildApiUrl("/auth/refresh"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({}),
    })
      .then((response) => response.ok)
      .catch(() => false)
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
}

export class ApiError extends Error {
  status: number;
  data?: any;
  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}
