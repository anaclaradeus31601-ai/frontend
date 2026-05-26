import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { apiRequest } from "../lib/api";
import type { EntityId, QueryParams } from "../types/database";

export interface UseCrudResourceOptions {
  autoFetch?: boolean;
  initialParams?: QueryParams;
  readEndpoint?: string;
  writeEndpoint?: string;
}

export interface UseCrudResourceResult<TEntity, TCreateInput, TUpdateInput> {
  data: TEntity[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
  fetchAll: (params?: QueryParams) => Promise<TEntity[]>;
  fetchById: (id: EntityId) => Promise<TEntity>;
  create: (payload: TCreateInput) => Promise<TEntity>;
  update: (id: EntityId, payload: TUpdateInput) => Promise<TEntity>;
  remove: (id: EntityId) => Promise<void>;
  setData: Dispatch<SetStateAction<TEntity[]>>;
}

export function useCrudResource<TEntity extends { id: EntityId }, TCreateInput, TUpdateInput>(
  endpoint: string,
  options?: UseCrudResourceOptions,
): UseCrudResourceResult<TEntity, TCreateInput, TUpdateInput> {
  const autoFetch = options?.autoFetch;
  const initialParams = options?.initialParams;
  const readEndpoint = options?.readEndpoint ?? endpoint;
  const writeEndpoint = options?.writeEndpoint ?? endpoint;
  const [data, setData] = useState<TEntity[]>([]);
  const [loading, setLoading] = useState(Boolean(autoFetch));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async (params?: QueryParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest<TEntity[]>(readEndpoint, undefined, params ?? initialParams);
      setData(response);
      return response;
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Não foi possível carregar os dados.";
      setError(message);
      throw caughtError;
    } finally {
      setLoading(false);
    }
  }, [initialParams, readEndpoint]);

  async function fetchById(id: EntityId) {
    setLoading(true);
    setError(null);

    try {
      return await apiRequest<TEntity>(`${readEndpoint}/${id}`);
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Não foi possível carregar o registro.";
      setError(message);
      throw caughtError;
    } finally {
      setLoading(false);
    }
  }

  async function create(payload: TCreateInput) {
    setSubmitting(true);
    setError(null);

    try {
      const created = await apiRequest<TEntity>(writeEndpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setData((currentData) => [...currentData, created]);
      return created;
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Não foi possível criar o registro.";
      setError(message);
      throw caughtError;
    } finally {
      setSubmitting(false);
    }
  }

  async function update(id: EntityId, payload: TUpdateInput) {
    setSubmitting(true);
    setError(null);

    try {
      const updated = await apiRequest<TEntity>(`${writeEndpoint}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      setData((currentData) =>
        currentData.map((item) => (item.id === id ? updated : item)),
      );

      return updated;
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Não foi possível atualizar o registro.";
      setError(message);
      throw caughtError;
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(id: EntityId) {
    setSubmitting(true);
    setError(null);

    try {
      await apiRequest<void>(`${writeEndpoint}/${id}`, {
        method: "DELETE",
      });

      setData((currentData) =>
        currentData.filter((item) => item.id !== id),
      );
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Não foi possível remover o registro.";
      setError(message);
      throw caughtError;
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (autoFetch === false) {
      return;
    }

    void fetchAll().catch(() => undefined);
  }, [autoFetch, fetchAll]);

  return {
    data,
    loading,
    submitting,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    setData,
  };
}
