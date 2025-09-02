import { LoginCredentials, RegisterCredentials, FormErrors } from '@/types/auth';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password strength regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Name validation regex (only letters, spaces, hyphens, apostrophes)
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/;

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return 'El email es requerido';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Ingresa un email válido';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'La contraseña es requerida';
  }
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  if (!PASSWORD_REGEX.test(password)) {
    return 'La contraseña debe contener al menos: 1 mayúscula, 1 minúscula y 1 número';
  }
  return undefined;
};

export const validateName = (name: string, fieldName: string): string | undefined => {
  if (!name.trim()) {
    return `${fieldName} es requerido`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} debe tener al menos 2 caracteres`;
  }
  if (name.trim().length > 50) {
    return `${fieldName} no puede tener más de 50 caracteres`;
  }
  if (!NAME_REGEX.test(name.trim())) {
    return `${fieldName} solo puede contener letras, espacios, guiones y apostrofes`;
  }
  return undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword) {
    return 'Confirma tu contraseña';
  }
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }
  return undefined;
};

export const validateLoginForm = (credentials: LoginCredentials): FormErrors => {
  const errors: FormErrors = {};

  const emailError = validateEmail(credentials.email);
  if (emailError) errors.email = emailError;

  if (!credentials.password) {
    errors.password = 'La contraseña es requerida';
  }

  return errors;
};

export const validateRegisterForm = (credentials: RegisterCredentials): FormErrors => {
  const errors: FormErrors = {};

  const firstNameError = validateName(credentials.firstName, 'El nombre');
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateName(credentials.lastName, 'El apellido');
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(credentials.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(credentials.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(
    credentials.password,
    credentials.confirmPassword
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  if (!credentials.acceptTerms) {
    errors.acceptTerms = 'Debes aceptar los términos y condiciones';
  }

  return errors;
};

export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};

