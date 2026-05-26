import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import type { Contract, Owner, Property, QueryParams } from "../types/database";

export function usePublicProperties(params?: QueryParams) {
  return useQuery({
    queryKey: ["properties", "public", params],
    queryFn: () => apiRequest<Property[]>("/property", undefined, params),
    staleTime: 60 * 1000,
  });
}

export function useAvailableProperties() {
  return useQuery({
    queryKey: ["properties", "available"],
    queryFn: () => apiRequest<Property[]>("/property/available"),
    staleTime: 60 * 1000,
  });
}

export function useFeaturedProperties() {
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn: () => apiRequest<Property[]>("/property/featured"),
    staleTime: 60 * 1000,
  });
}

export function usePropertyById(propertyId?: string) {
  return useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => apiRequest<Property>(`/property/${propertyId}`),
    enabled: Boolean(propertyId),
    staleTime: 60 * 1000,
  });
}

export function usePropertiesByRealtor(realtorId?: string) {
  return useQuery({
    queryKey: ["properties", "realtor", realtorId],
    queryFn: () => apiRequest<Property[]>(`/property/realtor/${realtorId}`),
    enabled: Boolean(realtorId),
    staleTime: 60 * 1000,
  });
}

export function useOwnersList(params?: QueryParams) {
  return useQuery({
    queryKey: ["owners", params],
    queryFn: () => apiRequest<Owner[]>("/owner", undefined, params),
    staleTime: 60 * 1000,
  });
}

export function useOwnerById(ownerId?: string) {
  return useQuery({
    queryKey: ["owner", ownerId],
    queryFn: () => apiRequest<Owner>(`/owner/${ownerId}`),
    enabled: Boolean(ownerId),
    staleTime: 60 * 1000,
  });
}

export function usePublicContracts(params?: QueryParams) {
  return useQuery({
    queryKey: ["contracts", "public", params],
    queryFn: () => apiRequest<Contract[]>("/contract", undefined, params),
    staleTime: 60 * 1000,
  });
}

export function useContractById(contractId?: string) {
  return useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => apiRequest<Contract>(`/contract/${contractId}`),
    enabled: Boolean(contractId),
    staleTime: 60 * 1000,
  });
}
