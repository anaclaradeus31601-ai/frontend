export type EntityId = string;

// ============ ENUMS ============
export const UserRole = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  REALTOR: "REALTOR",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const PropertyType = {
  RESIDENTIAL: "RESIDENTIAL",
  COMMERCIAL: "COMMERCIAL",
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export const TransactionType = {
  RENT: "RENT",
  SALE: "SALE",
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export const PropertyStatus = {
  AVAILABLE: "AVAILABLE",
  RENTED: "RENTED",
  SOLD: "SOLD",
  PENDING: "PENDING",
  MAINTENANCE: "MAINTENANCE",
} as const;

export type PropertyStatus = (typeof PropertyStatus)[keyof typeof PropertyStatus];

export const ContractStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  TERMINATED: "TERMINATED",
  CANCELLED: "CANCELLED",
} as const;

export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus];

export const VisitStatus = {
  SCHEDULED: "SCHEDULED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  NO_SHOW: "NO_SHOW",
} as const;

export type VisitStatus = (typeof VisitStatus)[keyof typeof VisitStatus];

export const PaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

// ============ AUTENTICAÇÃO ============
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'CLIENT'; // Registro público sempre cria cliente
}

export interface AuthResponse {
  user: UserPublicData;
  // token não precisa vir na resposta, vai em cookie httpOnly
}

// types/database.ts

// ✅ Dados públicos (sem password, sem datas)
export interface UserPublicData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  avatar?: string | null;
}

// ✅ Dados completos (admin)
export interface User extends UserPublicData {
  password?: string; // 👈 Opcional - NUNCA expor na API
  emailVerified: boolean;
  createdAt: string; // DateTime vira string no JSON
  updatedAt: string;
}

// ✅ Session
export interface Session {
  id: string;
  userId: string;
  refreshToken: string;
  ip?: string | null;
  userAgent?: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface Owner {
  id: EntityId;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  address: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string | null;
  category?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyAmenity {
  id: string;
  propertyId: string;
  amenityId: string;
  value?: string | null;
  property?: Property;
  amenity?: Amenity;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  transactionType: TransactionType;
  status: PropertyStatus;
  
  // Endereço
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Detalhes
  area: number;
  bedrooms: number;
  bathrooms: number;
  garages?: number | null;
  
  // Valores
  rentPrice?: number | null;
  salePrice?: number | null;
  condominiumFee?: number | null;
  iptu?: number | null;
  
  // Mídia
  images: string[];
  videos: string[];
  virtualTourUrl?: string | null; // 👈 Faltava no seu tipo
  
  // Localização
  latitude?: number | null;
  longitude?: number | null;
  
  // Metadados
  featured: boolean;
  views: number;
  
  // Relacionamentos
  ownerId: string;
  realtorId?: string | null;
  owner?: Owner;
  realtor?: User | null;
  amenities?: PropertyAmenity[];
  
  createdAt: string;
  updatedAt: string;
}

export interface Visit {
  id: EntityId;
  propertyId: EntityId;
  clientId: EntityId;
  realtorId: EntityId;
  scheduledAt: string;
  duration: number | null;
  status: VisitStatus;
  notes: string | null;
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
  // Relacionamentos
  property?: Property;
  client?: User;
  realtor?: User | null;
}

export interface Contract {
  id: EntityId;
  propertyId: EntityId;
  clientId: EntityId;
  transactionType: TransactionType;
  status: ContractStatus;
  startDate: string;
  endDate: string | null;
  rentValue: number | null;
  saleValue: number | null;
  terms: string;
  documentUrl: string | null;
  createdAt: string;
  updatedAt: string;
  // Relacionamentos
  property?: Property;
  client?: User;
}

export interface Payment {
  id: EntityId;
  contractId: EntityId;
  userId: EntityId;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: PaymentStatus;
  stripePaymentIntentId: string | null;
  stripeInvoiceId: string | null;
  createdAt: string;
  updatedAt: string;
  // Relacionamentos
  contract?: Contract;
  user?: User;
}

// ============ INPUT TYPES ============
export type CreateSessionInput = Omit<Session, "id" | "createdAt" | "updatedAt">;
export type UpdateSessionInput = Partial<CreateSessionInput>;

export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserInput = Partial<CreateUserInput>;

export type CreateOwnerInput = Omit<Owner, "id" | "createdAt" | "updatedAt">;
export type UpdateOwnerInput = Partial<CreateOwnerInput>;

export type CreateAmenityInput = Omit<Amenity, "id">;
export type UpdateAmenityInput = Partial<CreateAmenityInput>;

export type CreatePropertyAmenityInput = Omit<PropertyAmenity, "id" | "property" | "amenity">;
export type UpdatePropertyAmenityInput = Partial<CreatePropertyAmenityInput>;

export type CreatePropertyInput = Omit<Property, "id" | "createdAt" | "updatedAt" | "owner" | "realtor" | "amenities">;
export type UpdatePropertyInput = Partial<CreatePropertyInput>;

export type CreateVisitInput = Omit<Visit, "id" | "createdAt" | "updatedAt" | "property" | "client" | "realtor">;
export type UpdateVisitInput = Partial<CreateVisitInput>;

export type CreateContractInput = Omit<Contract, "id" | "createdAt" | "updatedAt" | "property" | "client">;
export type UpdateContractInput = Partial<CreateContractInput>;

export type CreatePaymentInput = Omit<Payment, "id" | "createdAt" | "updatedAt" | "contract" | "user">;
export type UpdatePaymentInput = Partial<CreatePaymentInput>;

// ============ UTILITÁRIOS ============
export interface QueryParams {
  page?: number;
  limit?: number;
  role?: UserRole;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: string | number | boolean | null | undefined;
}
