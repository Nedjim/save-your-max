import { ApiFetchType, Profile } from '../types';
import { apiFetch } from './supabase';

export async function getProfile(): Promise<Profile> {
  const payload: ApiFetchType = {
    endpoint: 'profiles',
  };

  return await apiFetch(payload);
}

export async function deleteProfile(): Promise<{ sucess: boolean }> {
  const payload: ApiFetchType = {
    endpoint: 'profiles',
    method: 'DELETE',
  };

  return await apiFetch(payload);
}
