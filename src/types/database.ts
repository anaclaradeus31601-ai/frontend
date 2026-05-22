export type EntityId = string;

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

export interface Session {
  id: EntityId;
  userId: EntityId;
  refreshToken: string;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export type CreateSessionInput = Omit<Session, "id" | "createdAt" | "updatedAt">;
export type UpdateSessionInput = Partial<CreateSessionInput>;

export interface User {
  id: EntityId;
  email: string;
  password: string;
  name: string;
  phone: string | null;
  role: UserRole;
  avatar: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Owner {
  id: EntityId;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Amenity {
  id: EntityId;
  name: string;
  icon: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyAmenity {
  id: EntityId;
  propertyId: EntityId;
  amenityId: EntityId;
  value: string | null;
  property?: Property;
  amenity?: Amenity;
}

export interface Property {
  id: EntityId;
  title: string;
  description: string;
  type: PropertyType;
  transactionType: TransactionType;
  status: PropertyStatus;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  garages: number | null;
  rentPrice: number | null;
  salePrice: number | null;
  condominiumFee: number | null;
  iptu: number | null;
  images: string[];
  videos: string[];
  virtualTourUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  featured: boolean;
  views: number;
  ownerId: EntityId;
  realtorId: EntityId | null;
  createdAt: string;
  updatedAt: string;
  owner?: Owner;
  realtor?: User | null;
  amenities?: PropertyAmenity[];
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
  contract?: Contract;
  user?: User;
}

export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserInput = Partial<CreateUserInput>;

export type CreateOwnerInput = Omit<Owner, "id" | "createdAt" | "updatedAt">;
export type UpdateOwnerInput = Partial<CreateOwnerInput>;

export type CreateAmenityInput = Omit<Amenity, "id" | "createdAt" | "updatedAt">;
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

export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}
