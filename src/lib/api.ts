// lib/api.ts
import type { QueryParams } from "../types/database";

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
export const ACCESS_TOKEN_KEY = "access_token";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

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

export async function apiRequest<TResponse>(
  path: string,
  init?: RequestInit,
  params?: QueryParams,
) {
  const accessToken = getAccessToken();

  // 👇 Força o envio de cookies em todas as requisições
  const response = await fetch(buildApiUrl(path, params), {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...init?.headers,
    },
    credentials: "include", // 👈 ISSO É CRUCIAL para cookies httpOnly
    ...init,
  });

  if (!response.ok) {
    // Tenta parsear erro como JSON primeiro
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

// 👇 Classe de erro personalizada
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
