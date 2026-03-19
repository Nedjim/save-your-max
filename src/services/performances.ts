import {
  ApiFetchType,
  CreatePerformanceParams,
  Performance,
  UpdatePerformanceParams,
} from '../types';
import { apiFetch } from './supabase';

export async function getPerformances(
  exerciseId: string,
): Promise<Performance[]> {
  const payload: ApiFetchType = {
    endpoint: `exercises/${exerciseId}/performances`,
  };

  return await apiFetch(payload);
}

export async function createPerformance(
  exerciseId: string,
  params: CreatePerformanceParams,
): Promise<Performance> {
  const payload: ApiFetchType = {
    endpoint: `exercises/${exerciseId}/performances`,
    method: 'POST',
    body: { ...params },
  };

  return await apiFetch(payload);
}

export async function updatePerformance(params: UpdatePerformanceParams) {
  const { id, ...rest } = params;

  const payload: ApiFetchType = {
    endpoint: `performances/${id}`,
    method: 'PATCH',
    body: {
      ...rest,
    },
  };

  return await apiFetch(payload);
}

export async function deletePerformance(id: string) {
  const payload: ApiFetchType = {
    endpoint: `performances/${id}`,
    method: 'DELETE',
  };

  return await apiFetch(payload);
}
