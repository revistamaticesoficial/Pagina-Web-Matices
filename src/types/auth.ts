import { Profile, BusinessWithDetails } from './business';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'user' | 'admin' | 'owner';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
  business?: BusinessWithDetails;
  subscription?: {
    plan: 'basic' | 'premium' | 'premium-yearly';
    status: 'active' | 'inactive' | 'cancelled';
    expiresAt?: string;
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  newsletter?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthError {
  message: string;
  field?: string;
  code?: string;
}

export interface PasswordReset {
  email: string;
}

export interface PasswordUpdate {
  token: string;
  password: string;
  confirmPassword: string;
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormTouched {
  [key: string]: boolean | undefined;
}

