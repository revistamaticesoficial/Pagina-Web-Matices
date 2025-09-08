'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { supabase, getUserProfile, getUserBusiness } from '@/lib/supabase';
import { ProfileWithBusiness } from '@/types/business';

// Supabase auth service
const supabaseAuthService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('No se pudo obtener el usuario');

    // Get profile data
    const profile = await getUserProfile(data.user.id);
    const rawBusiness = await getUserBusiness(data.user.id);
    const business = rawBusiness
      ? ({
        ...rawBusiness,
        comercio_schedules: Array.isArray((rawBusiness as any).comercio_schedules)
          ? (rawBusiness as any).comercio_schedules
          : [],
      } as unknown as ProfileWithBusiness['business'])
      : undefined;

    return {
      id: data.user.id,
      email: data.user.email!,
      firstName: profile.full_name?.split(' ')[0] || '',
      lastName: profile.full_name?.split(' ').slice(1).join(' ') || '',
      role: profile.role as 'user' | 'admin' | 'owner',
      isEmailVerified: data.user.email_confirmed_at !== null,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at || data.user.created_at,
      profile: profile,
      business,
    };
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          full_name: `${credentials.firstName} ${credentials.lastName}`,
        }
      }
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('No se pudo crear el usuario');

    // The profile is created automatically by the trigger
    // Wait a bit for the trigger to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    const profile = await getUserProfile(data.user.id);

    return {
      id: data.user.id,
      email: data.user.email!,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      role: 'owner', // Default role for new users
      isEmailVerified: data.user.email_confirmed_at !== null,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at || data.user.created_at,
      profile: profile,
    };
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return null;

    try {
      let profile;
      try {
        profile = await getUserProfile(user.id);
      } catch (profileError: any) {
        if (profileError.code === 'PGRST116') {
          console.log('Profile not found, creating default profile...');
          const { error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              full_name: user.user_metadata?.full_name || '',
              role: 'owner',
            });

          if (createError) {
            console.error('Error creating profile:', createError);
            return null;
          }

          profile = await getUserProfile(user.id);
        } else {
          throw profileError;
        }
      }

      const rawBusiness = await getUserBusiness(user.id);
      const business = rawBusiness
        ? ({
          ...rawBusiness,
          comercio_schedules: Array.isArray((rawBusiness as any).comercio_schedules)
            ? (rawBusiness as any).comercio_schedules
            : [],
        } as unknown as ProfileWithBusiness['business'])
        : undefined;

      return {
        id: user.id,
        email: user.email!,
        firstName: profile.full_name?.split(' ')[0] || '',
        lastName: profile.full_name?.split(' ').slice(1).join(' ') || '',
        role: profile.role as 'user' | 'admin' | 'owner',
        isEmailVerified: user.email_confirmed_at !== null,
        createdAt: user.created_at,
        updatedAt: user.updated_at || user.created_at,
        profile: profile,
        business,
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }
};

const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await supabaseAuthService.getCurrentUser();
        setAuthState(prev => ({
          ...prev,
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }));
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Error al inicializar sesión',
        }));
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const user = await supabaseAuthService.getCurrentUser();
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: !!user,
            error: null,
          });
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      }
    );

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authState.isLoading && authState.isAuthenticated && authState.user) {
      if (pathname.startsWith('/auth/')) {
        if (authState.user.business) {
          router.push('/gestion/inicio');
        } else {
          if (pathname !== '/auth/register') {
            router.push('/auth/register');
          }
        }
        return;
      }

      if (!authState.user.business && pathname !== '/auth/register') {
        router.push('/auth/register');
        return;
      }
    }
  }, [authState.isLoading, authState.isAuthenticated, authState.user, pathname, router]);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await supabaseAuthService.login(credentials);

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await supabaseAuthService.register(credentials);

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al registrarse',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      await supabaseAuthService.logout();

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
      router.push('/');
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Error al cerrar sesión',
      }));
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        register,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

