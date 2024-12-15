export interface User {
  id: number;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'NGO_USER' | 'PUBLIC_USER';
  twoFactorAuth: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterNGOData {
  organizationName: string;
  email: string;
  password: string;
  physicalAddress: string;
  operationalAddress: string;
  domains: string[];
  description: string;
  resources: Record<string, any>;
  geographicAreas: string[];
  contactEmail: string;
  contactPhone: string;
  contactPerson: string;
  documents: File[];
}