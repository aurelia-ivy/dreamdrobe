import { supabase } from './supabase';

export const ensureAuthenticatedUser = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error('Error fetching session:', sessionError.message);
  }

  if (session?.user) {
    return session.user;
  }

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error || !data.user) {
    console.error('Anonymous sign-in failed:', error?.message);
    throw new Error(error?.message || 'Failed to authenticate user');
  }

  return data.user;
};