import {
  CreatePerformancePayload,
  Performance,
  UpdatePerformancePayload,
} from '@/src/types';
import { apiFetch } from './supabase';

export async function getPerformances(exerciseId: string) {
  return await apiFetch<Performance[]>({
    endpoint: `exercises/${exerciseId}/performances`,
    method: 'GET',
  });
}

export async function createPerformance(
  exerciseId: string,
  payload: CreatePerformancePayload,
) {
  return await apiFetch<Performance, CreatePerformancePayload>({
    endpoint: `exercises/${exerciseId}/performances`,
    method: 'POST',
    body: { ...payload },
  });
}

export async function updatePerformance(payload: UpdatePerformancePayload) {
  const { id, ...rest } = payload;

  return await apiFetch<Performance>({
    endpoint: `performances/${id}`,
    method: 'PATCH',
    body: {
      ...rest,
    },
  });
}

export async function deletePerformance(id: string) {
  return await apiFetch<Performance>({
    endpoint: `performances/${id}`,
    method: 'DELETE',
  });
}
