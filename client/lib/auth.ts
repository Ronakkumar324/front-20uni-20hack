/**
 * Authentication and role management utilities
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  role: 'student' | 'staff' | 'issuer';
  organization?: string; // For staff
  institution?: string; // For issuer
  createdAt: string;
}

export interface StudentRegistration {
  name: string;
  email: string;
  walletAddress: string;
}

export interface StaffRegistration {
  name: string;
  email: string;
  walletAddress: string;
  organization: string;
}

export interface IssuerRegistration {
  name: string;
  email: string;
  walletAddress: string;
  institution: string;
}

export interface StudentSignIn {
  email: string;
  walletAddress: string;
}

export interface StaffSignIn {
  email: string;
}

export interface IssuerSignIn {
  email: string;
}

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  role: 'student' | 'staff' | 'issuer';
  organization?: string;
  institution?: string;
  createdAt: string;
}

const USER_PROFILE_KEY = 'credvault_user_profile';
const ISSUED_CREDENTIALS_KEY = 'credvault_issued_credentials';
const REGISTERED_USERS_KEY = 'credvault_registered_users';

/**
 * Save user profile to localStorage
 */
export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

/**
 * Get current user profile from localStorage
 */
export function getCurrentUser(): UserProfile | null {
  try {
    const stored = localStorage.getItem(USER_PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading user profile:', error);
    return null;
  }
}

/**
 * Clear user session
 */
export function logout(): void {
  localStorage.removeItem(USER_PROFILE_KEY);
}

/**
 * Register a new student
 */
export function registerStudent(data: StudentRegistration): UserProfile {
  const profile: UserProfile = {
    id: generateUserId(),
    name: data.name,
    email: data.email,
    walletAddress: data.walletAddress,
    role: 'student',
    createdAt: new Date().toISOString(),
  };

  saveUserProfile(profile);
  return profile;
}

/**
 * Register a new staff member
 */
export function registerStaff(data: StaffRegistration): UserProfile {
  const profile: UserProfile = {
    id: generateUserId(),
    name: data.name,
    email: data.email,
    walletAddress: data.walletAddress,
    role: 'staff',
    organization: data.organization,
    createdAt: new Date().toISOString(),
  };

  saveUserProfile(profile);
  return profile;
}

/**
 * Register a new issuer
 */
export function registerIssuer(data: IssuerRegistration): UserProfile {
  const profile: UserProfile = {
    id: generateUserId(),
    name: data.name,
    email: data.email,
    walletAddress: data.walletAddress,
    role: 'issuer',
    institution: data.institution,
    createdAt: new Date().toISOString(),
  };

  saveUserProfile(profile);
  return profile;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Get role-specific dashboard path
 */
export function getRoleDashboardPath(role: string): string {
  switch (role) {
    case 'student':
      return '/student';
    case 'staff':
      return '/staff';
    case 'issuer':
      return '/issuer';
    default:
      return '/';
  }
}

/**
 * Generate a unique user ID
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate wallet address format
 */
export function isValidWallet(address: string): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Hex address validation
  if (trimmed.startsWith('0x')) {
    return /^0x[a-fA-F0-9]{1,64}$/.test(trimmed);
  }

  // Named address validation (like username.apt)
  if (trimmed.includes('.apt')) {
    return /^[a-zA-Z0-9_-]+\.apt$/.test(trimmed);
  }

  // For demo purposes, accept any reasonable format
  return trimmed.length >= 6 && trimmed.length <= 100;
}

/**
 * Mock issued credentials storage
 */
export interface IssuedCredential {
  id: string;
  title: string;
  description: string;
  studentWalletAddress: string;
  issuerWalletAddress: string;
  issuerName: string;
  issuerInstitution: string;
  issuedDate: string;
  status: 'issued' | 'pending' | 'revoked';
}

/**
 * Save issued credential
 */
export function saveIssuedCredential(credential: Omit<IssuedCredential, 'id' | 'issuedDate' | 'status'>): IssuedCredential {
  const issuedCredential: IssuedCredential = {
    ...credential,
    id: `cred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    issuedDate: new Date().toISOString(),
    status: 'issued',
  };

  const existing = getIssuedCredentials();
  existing.push(issuedCredential);
  localStorage.setItem(ISSUED_CREDENTIALS_KEY, JSON.stringify(existing));

  return issuedCredential;
}

/**
 * Get all issued credentials
 */
export function getIssuedCredentials(): IssuedCredential[] {
  try {
    const stored = localStorage.getItem(ISSUED_CREDENTIALS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading issued credentials:', error);
    return [];
  }
}

/**
 * Get credentials issued by a specific issuer
 */
export function getCredentialsByIssuer(issuerWalletAddress: string): IssuedCredential[] {
  return getIssuedCredentials().filter(cred => cred.issuerWalletAddress === issuerWalletAddress);
}

/**
 * Get credentials for a specific student
 */
export function getCredentialsForStudent(studentWalletAddress: string): IssuedCredential[] {
  return getIssuedCredentials().filter(cred => cred.studentWalletAddress === studentWalletAddress);
}
