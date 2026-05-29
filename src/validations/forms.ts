// validations/forms.ts
import { z } from "zod";

// ============ HELPERS ============
const requiredText = (field: string) => z.string().trim().min(1, `${field} é obrigatório.`);
const optionalText = z.string().optional();
const email = z.string().trim().email("Informe um e-mail válido.");
const strongPassword = z
  .string()
  .min(8, "A senha deve ter pelo menos 8 caracteres.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
    "Use letra maiúscula, minúscula, número e caractere especial.",
  );
const positiveNumber = (field: string) =>
  z.string().trim().min(1, `${field} é obrigatório.`).refine((value) => Number(value) >= 0, `${field} deve ser maior ou igual a zero.`);

// ============ AUTH ============
export const loginSchema = z.object({
  email: email,
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const registerSchema = z
  .object({
    name: requiredText("Nome"),
    email: email,
    phone: requiredText("Telefone"),
    password: strongPassword,
    confirmPassword: strongPassword,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export const requestEmailVerificationSchema = z.object({
  email,
});

export const confirmEmailVerificationSchema = z.object({
  token: requiredText("Token"),
});

export const forgotPasswordSchema = z.object({
  email,
});

export const resetPasswordSchema = z
  .object({
    token: requiredText("Token"),
    newPassword: strongPassword,
    confirmPassword: strongPassword,
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

// ============ ADMIN - CLIENTS ============
export const createClientSchema = z.object({
  name: requiredText("Nome"),
  email: email,
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  phone: optionalText,
  birthDate: optionalText,
  budget: optionalText,
  city: optionalText,
  notes: optionalText,
  avatar: optionalText,
  role: requiredText("Função"),
  emailVerified: z.boolean().optional(),
});

export const editClientSchema = z.object({
  name: requiredText("Nome"),
  cpf: optionalText,
  birthDate: optionalText,
  email: email,
  phone: optionalText,
  budget: optionalText,
  city: optionalText,
  notes: optionalText,
});

// ============ ADMIN - OWNERS ============
export const createOwnerSchema = z.object({
  name: requiredText("Nome"),
  cpfCnpj: requiredText("CPF/CNPJ"),
  email: email,
  phone: requiredText("Telefone"),
  address: optionalText,
});

export const editOwnerSchema = z.object({
  name: requiredText("Nome"),
  cpfCnpj: requiredText("CPF/CNPJ"),
  email: email,
  phone: requiredText("Telefone"),
  rg: optionalText,
  street: optionalText,
  number: optionalText,
  neighborhood: optionalText,
  city: optionalText,
  state: optionalText,
  notes: optionalText,
});

// ============ ADMIN - REALTORS ============
export const createRealtorSchema = z.object({
  name: requiredText("Nome"),
  email: email,
  phone: optionalText,
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  avatar: optionalText,
  role: requiredText("Função"),
  emailVerified: z.boolean().optional(),
});

export const editRealtorSchema = z.object({
  name: requiredText("Nome"),
  email: email,
  phone: optionalText,
  cpf: optionalText,
  creci: optionalText,
  specialty: optionalText,
  bio: optionalText,
});

// ============ ADMIN - PROPERTIES ============
export const createPropertySchema = z.object({
  ownerId: requiredText("Proprietário"),
  realtorId: optionalText,
  title: requiredText("Título"),
  transactionType: requiredText("Tipo de transação"),
  category: requiredText("Categoria"),
  status: requiredText("Status"),
  rentPrice: optionalText,
  salePrice: optionalText,
  description: requiredText("Descrição"),
  bedrooms: z.number().min(0, "Quartos deve ser maior ou igual a zero"),
  bathrooms: z.number().min(0, "Banheiros deve ser maior ou igual a zero"),
  garages: z.number().min(0, "Garagens deve ser maior ou igual a zero"),
  area: z.number().min(0, "Área deve ser maior ou igual a zero"),
  street: requiredText("Rua"),
  number: requiredText("Número"),
  complement: optionalText,
  neighborhood: requiredText("Bairro"),
  city: requiredText("Cidade"),
  state: requiredText("Estado"),
  zipCode: requiredText("CEP"),
  country: requiredText("País"),
  condominiumFee: optionalText,
  iptu: optionalText,
  latitude: optionalText,
  longitude: optionalText,
  featured: optionalText,
  images: optionalText,
  videos: optionalText,
  tour: optionalText,
});

export const editPropertySchema = z.object({
  title: requiredText("Título"),
  transactionType: requiredText("Tipo de transação"),
  category: requiredText("Categoria"),
  status: requiredText("Status"),
  rentPrice: optionalText,
  salePrice: optionalText,
  description: requiredText("Descrição"),
  bedrooms: positiveNumber("Quartos"),
  bathrooms: positiveNumber("Banheiros"),
  garages: positiveNumber("Garagens"),
  area: positiveNumber("Área"),
  street: requiredText("Rua"),
  number: requiredText("Número"),
  complement: optionalText,
  neighborhood: requiredText("Bairro"),
  city: requiredText("Cidade"),
  state: requiredText("Estado"),
  zipCode: requiredText("CEP"),
  country: requiredText("País"),
  condominiumFee: optionalText,
  iptu: optionalText,
  latitude: optionalText,
  longitude: optionalText,
  featured: optionalText,
  owner: optionalText,
  realtor: optionalText,
  tour: optionalText,
  video: optionalText,
  images: optionalText,
});

// ============ ADMIN - VISITS ============
export const createVisitSchema = z.object({
  propertyId: requiredText("Imóvel"),
  clientId: requiredText("Cliente"),
  realtorId: requiredText("Corretor"),
  scheduledAt: requiredText("Data e hora"),
  status: requiredText("Status"),
  duration: z.number().min(0, "Duração deve ser maior ou igual a zero").optional(),
  notes: optionalText,
  feedback: optionalText,
});

export const editVisitSchema = z.object({
  property: requiredText("Imóvel"),
  client: requiredText("Cliente"),
  realtor: requiredText("Corretor"),
  status: requiredText("Status"),
  date: requiredText("Data"),
  time: requiredText("Hora"),
  notes: optionalText,
});

// ============ ADMIN - CONTRACTS ============
export const createContractSchema = z.object({
  propertyId: requiredText("Imóvel"),
  clientId: requiredText("Cliente"),
  transactionType: requiredText("Tipo de transação"),
  status: requiredText("Status"),
  startDate: requiredText("Data de início"),
  endDate: optionalText,
  rentValue: optionalText,
  saleValue: optionalText,
  documentUrl: optionalText,
  notes: requiredText("Termos"),
});

export const editContractSchema = z.object({
  client: requiredText("Cliente"),
  property: requiredText("Imóvel"),
  realtor: optionalText,
  status: requiredText("Status"),
  startDate: requiredText("Data de início"),
  endDate: optionalText,
  value: optionalText,
  documentUrl: optionalText,
  notes: requiredText("Cláusulas"),
});

// ============ ADMIN - PAYMENTS ============
export const createPaymentSchema = z.object({
  contractId: requiredText("Contrato"),
  userId: requiredText("Usuário"),
  amount: requiredText("Valor"),
  dueDate: requiredText("Data de vencimento"),
  status: requiredText("Status"),
  paidDate: optionalText,
  stripeIntent: optionalText,
  stripeInvoice: optionalText,
});

export const editPaymentSchema = z.object({
  client: requiredText("Cliente"),
  contract: requiredText("Contrato"),
  amount: requiredText("Valor"),
  paymentMethod: requiredText("Método de pagamento"),
  dueDate: requiredText("Data de vencimento"),
  paidDate: optionalText,
  status: requiredText("Status"),
  reference: optionalText,
  notes: optionalText,
});

// ============ CLIENT PAGES ============
export const ownerLandingSchema = z.object({
  name: requiredText("Nome"),
  email: email,
  phone: requiredText("Telefone"),
  cpfCnpj: requiredText("CPF/CNPJ"),
  address: requiredText("Endereço"),
});

export const previewPropertySchema = z.object({
  title: requiredText("Título"),
  description: requiredText("Descrição"),
  city: requiredText("Cidade"),
  neighborhood: requiredText("Bairro"),
  bedrooms: requiredText("Quartos"),
  bathrooms: requiredText("Banheiros"),
  garages: requiredText("Garagens"),
  price: requiredText("Preço"),
  image: z.string().trim().url("Informe uma URL de imagem válida."),
});

// ============ TYPES ============
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RequestEmailVerificationFormData = z.infer<typeof requestEmailVerificationSchema>;
export type ConfirmEmailVerificationFormData = z.infer<typeof confirmEmailVerificationSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type CreateClientFormData = z.infer<typeof createClientSchema>;
export type EditClientFormData = z.infer<typeof editClientSchema>;
export type CreateOwnerFormData = z.infer<typeof createOwnerSchema>;
export type EditOwnerFormData = z.infer<typeof editOwnerSchema>;
export type CreateRealtorFormData = z.infer<typeof createRealtorSchema>;
export type EditRealtorFormData = z.infer<typeof editRealtorSchema>;
export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;
export type EditPropertyFormData = z.infer<typeof editPropertySchema>;
export type CreateVisitFormData = z.infer<typeof createVisitSchema>;
export type EditVisitFormData = z.infer<typeof editVisitSchema>;
export type CreateContractFormData = z.infer<typeof createContractSchema>;
export type EditContractFormData = z.infer<typeof editContractSchema>;
export type CreatePaymentFormData = z.infer<typeof createPaymentSchema>;
export type EditPaymentFormData = z.infer<typeof editPaymentSchema>;
export type OwnerLandingFormData = z.infer<typeof ownerLandingSchema>;
export type PreviewPropertyFormData = z.infer<typeof previewPropertySchema>;
