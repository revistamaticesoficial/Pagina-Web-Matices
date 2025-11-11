'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, AuthState, LoginCredentials, RegisterCredentials, Logout } from '@/types/auth';
import { supabase, getUserProfile, getUserBusiness } from '@/lib/supabase';
import { ProfileWithBusiness } from '@/types/business';
import { Home, Users, Zap, Calendar, FileText, User, Settings, ChevronLeft, ChevronRight, BookOpen, Megaphone, LogOut } from "lucide-react"

// Timeout suave: si tarda, devolvemos null en lugar de lanzar error y no bloqueamos la UI
async function softTimeout<T>(promise: Promise<T>, ms = 3500): Promise<T | null> {
  let timer: any;
  try {
    return await Promise.race([
      promise,
      new Promise<null>((resolve) => {
        timer = setTimeout(() => resolve(null), ms);
      })
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// Supabase auth service
const supabaseAuthService = {
  async login(credentials: LoginCredentials): Promise<User> {
    console.log('[Auth] Starting login process...');

    // Login directo: no usar timeout duro que bloquee el flujo
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error('[Auth] Supabase auth error:', error);
      throw new Error(error.message);
    }
    if (!data.user) {
      console.error('[Auth] No user returned from Supabase');
      throw new Error('No se pudo obtener el usuario');
    }

    // Estado mínimo inmediato: no bloquear por datos extendidos
    const baseUser: User = {
      id: data.user.id,
      email: data.user.email!,
      firstName: (data.user.user_metadata?.full_name || '').split(' ')[0] || '',
      lastName: (data.user.user_metadata?.full_name || '').split(' ').slice(1).join(' ') || '',
      role: 'owner',
      isEmailVerified: data.user.email_confirmed_at !== null,
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at || data.user.created_at,
      profile: {
        id: data.user.id,
        full_name: data.user.user_metadata?.full_name || '',
        avatar_url: null,
        role: 'owner',
        created_at: data.user.created_at,
      } as any,
      business: undefined,
    };

    console.log('[Auth] Login successful (base)');
    return baseUser;
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

    // Crear/obtener perfil de forma robusta (con o sin trigger)
    let profile;
    try {
      // Esperar brevemente por si existe trigger
      await new Promise(resolve => setTimeout(resolve, 600));
      profile = await getUserProfile(data.user.id);
    } catch (profileError: any) {
      // Si no existe, lo creamos manualmente
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: `${credentials.firstName || ''} ${credentials.lastName || ''}`.trim(),
          role: 'owner',
        });
      if (createError) {
        throw new Error(createError.message || 'No se pudo crear el perfil');
      }
      profile = await getUserProfile(data.user.id);
    }

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
        const { data: { user } } = await supabase.auth.getUser();
        setAuthState(prev => ({
          ...prev,
          user: user ? ({
            id: user.id,
            email: user.email!,
            firstName: (user.user_metadata?.full_name || '').split(' ')[0] || '',
            lastName: (user.user_metadata?.full_name || '').split(' ').slice(1).join(' ') || '',
            role: 'owner',
            isEmailVerified: user.email_confirmed_at !== null,
            createdAt: user.created_at,
            updatedAt: user.updated_at || user.created_at,
            profile: {
              id: user.id,
              full_name: user.user_metadata?.full_name || '',
              avatar_url: user.user_metadata?.avatar_url || null,
              role: 'owner',
              created_at: user.created_at,
            } as any,
            business: undefined,
          } as User) : null,
          isAuthenticated: !!user,
          isLoading: false,
        }));

        // Carga extendida en background
        if (user) {
          (async () => {
            const prof = await softTimeout(getUserProfile(user.id), 3500);
            const bizRaw = await softTimeout(getUserBusiness(user.id), 3500);
            const business = bizRaw
              ? ({
                  ...bizRaw,
                  comercio_schedules: Array.isArray((bizRaw as any).comercio_schedules)
                    ? (bizRaw as any).comercio_schedules
                    : [],
                } as unknown as ProfileWithBusiness['business'])
              : undefined;
            setAuthState(prev => ({
              ...prev,
              user: prof
                ? ({
                    ...(prev.user as User),
                    firstName: prof.full_name?.split(' ')[0] || (prev.user as User).firstName,
                    lastName: prof.full_name?.split(' ').slice(1).join(' ') || (prev.user as User).lastName,
                    role: (prof.role as any) || (prev.user as User).role,
                    profile: prof as any,
                    business,
                  })
                : ({ ...(prev.user as User), business }),
            }));
          })().catch(() => void 0);
        }
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
          const u = session.user;
          setAuthState(prev => ({
            ...prev,
            user: {
              id: u.id,
              email: u.email!,
              firstName: (u.user_metadata?.full_name || '').split(' ')[0] || '',
              lastName: (u.user_metadata?.full_name || '').split(' ').slice(1).join(' ') || '',
              role: 'owner',
              isEmailVerified: u.email_confirmed_at !== null,
              createdAt: u.created_at,
              updatedAt: u.updated_at || u.created_at,
              profile: {
                id: u.id,
                full_name: u.user_metadata?.full_name || '',
                avatar_url: u.user_metadata?.avatar_url || null,
                role: 'owner',
                created_at: u.created_at,
              } as any,
              business: undefined,
            } as User,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          }));
          // Carga extendida en background
          (async () => {
            const prof = await softTimeout(getUserProfile(u.id), 3500);
            const bizRaw = await softTimeout(getUserBusiness(u.id), 3500);
            const business = bizRaw
              ? ({
                  ...bizRaw,
                  comercio_schedules: Array.isArray((bizRaw as any).comercio_schedules)
                    ? (bizRaw as any).comercio_schedules
                    : [],
                } as unknown as ProfileWithBusiness['business'])
              : undefined;
            setAuthState(prev => ({
              ...prev,
              user: prof
                ? ({
                    ...(prev.user as User),
                    firstName: prof.full_name?.split(' ')[0] || (prev.user as User).firstName,
                    lastName: prof.full_name?.split(' ').slice(1).join(' ') || (prev.user as User).lastName,
                    role: (prof.role as any) || (prev.user as User).role,
                    profile: prof as any,
                    business,
                  })
                : ({ ...(prev.user as User), business }),
            }));
          })().catch(() => void 0);
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
    if (authState.isLoading) return;
    // No forzar redirecciones automáticas; delegamos en /validation
    // Solo aseguramos que si el usuario no está autenticado y está en rutas privadas
    // (gestion/admin), lo enviemos a login.
    const isPrivate = pathname.startsWith('/gestion') || pathname.startsWith('/admin');
    if (isPrivate && !authState.isAuthenticated) {
      router.push('/auth/login');
    }
  }, [authState.isLoading, authState.isAuthenticated, pathname, router]);

  const login = async (credentials: LoginCredentials) => {
    console.log('[Auth] Login function called');
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('[Auth] Calling supabaseAuthService.login...');
      const user = await supabaseAuthService.login(credentials);
      console.log('[Auth] Login service completed, setting auth state...');

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      console.log('[Auth] Login completed successfully');

      // Carga extendida en background (no bloquea navegación)
      (async () => {
        const prof = await softTimeout(getUserProfile(user.id), 3500);
        const bizRaw = await softTimeout(getUserBusiness(user.id), 3500);
        const business = bizRaw
          ? ({
              ...bizRaw,
              comercio_schedules: Array.isArray((bizRaw as any).comercio_schedules)
                ? (bizRaw as any).comercio_schedules
                : [],
            } as unknown as ProfileWithBusiness['business'])
          : undefined;
        setAuthState(prev => ({
          ...prev,
          user: prof
            ? ({
                ...(prev.user as User),
                firstName: prof.full_name?.split(' ')[0] || (prev.user as User).firstName,
                lastName: prof.full_name?.split(' ').slice(1).join(' ') || (prev.user as User).lastName,
                role: (prof.role as any) || (prev.user as User).role,
                profile: prof as any,
                business,
              })
            : ({ ...(prev.user as User), business }),
        }));
      })().catch(() => void 0);
    } catch (error) {
      console.error('[Auth] Login error:', error);
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
      // No relanzamos el error para permitir que la UI continúe (ej: redirigir a /validation)
      return;
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

