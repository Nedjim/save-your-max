import { ApiFetchType } from '../types';
import { apiFetch } from './supabase';

export const getProfile = async () => {
  const payload: ApiFetchType = {
    endpoint: 'profiles',
  };

  return await apiFetch(payload);
};
