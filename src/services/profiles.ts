import { Session } from '@supabase/supabase-js';

export const getProfile = async (session: Session) => {
  const { access_token: token } = session;

  return await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/profiles`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
