import { Profile, UpdateProfileFormValues } from '../types';
import { apiFetch } from './supabase';

export async function getProfile() {
  return await apiFetch<Profile>({
    endpoint: 'profiles',
    method: 'GET',
  });
}

export async function createProfile() {
  return await apiFetch<Profile>({
    endpoint: 'profiles',
    method: 'POST',
  });
}

export async function deleteProfile() {
  return await apiFetch<{ success: boolean }>({
    endpoint: 'profiles',
    method: 'DELETE',
  });
}

export async function updateProfile(payload: UpdateProfileFormValues) {
  return await apiFetch<Profile>({
    endpoint: 'profiles',
    method: 'PATCH',
    body: { ...payload },
  });
}
