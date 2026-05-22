import { z } from "zod";

const requiredText = (field: string) => z.string().trim().min(1, `${field} é obrigatório.`);
const optionalText = z.string().optional();
const email = z.string().trim().email("Informe um e-mail válido.");
const positiveNumber = (field: string) =>
  z.string().trim().min(1, `${field} é obrigatório.`).refine((value) => Number(value) >= 0, `${field} deve ser maior ou igual a zero.`);

export const createClientSchema = z.object({
  "client-name": requiredText("Nome"),
  "client-email": email,
  "client-password": z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  "client-phone": optionalText,
  "client-avatar": optionalText,
});

export const editClientSchema = z.object({
  "client-name": requiredText("Nome"),
  "client-cpf": optionalText,
  "client-birth": optionalText,
  "client-email": email,
  "client-phone": optionalText,
  "client-budget": optionalText,
  "client-city": optionalText,
  "client-notes": optionalText,
});

export const createOwnerSchema = z.object({
  "owner-name": requiredText("Nome"),
  "owner-cpf": requiredText("CPF/CNPJ"),
  "owner-email": email,
  "owner-phone": requiredText("Telefone"),
  "owner-address": optionalText,
});

export const editOwnerSchema = z.object({
  "owner-name": requiredText("Nome"),
  "owner-cpf": requiredText("CPF/CNPJ"),
  "owner-email": email,
  "owner-phone": requiredText("Telefone"),
  "owner-rg": optionalText,
  "owner-street": optionalText,
  "owner-number": optionalText,
  "owner-neighborhood": optionalText,
  "owner-city": optionalText,
  "owner-state": optionalText,
  "owner-notes": optionalText,
});

export const createRealtorSchema = z.object({
  "realtor-name": requiredText("Nome"),
  "realtor-email": email,
  "realtor-phone": optionalText,
  "realtor-password": z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  "realtor-avatar": optionalText,
});

export const editRealtorSchema = z.object({
  "realtor-name": requiredText("Nome"),
  "realtor-email": email,
  "realtor-phone": optionalText,
  "realtor-cpf": optionalText,
  "realtor-creci": optionalText,
  "realtor-bio": optionalText,
});

export const createPropertySchema = z.object({
  "property-owner-id": requiredText("Proprietário"),
  "property-realtor-id": optionalText,
  "property-title": requiredText("Título"),
  "property-rent-price": optionalText,
  "property-sale-price": optionalText,
  "property-description": requiredText("Descrição"),
  "property-bedrooms": positiveNumber("Quartos"),
  "property-bathrooms": positiveNumber("Banheiros"),
  "property-garages": positiveNumber("Garagens"),
  "property-area": positiveNumber("Área"),
  "property-street": requiredText("Rua"),
  "property-number": requiredText("Número"),
  "property-complement": optionalText,
  "property-neighborhood": requiredText("Bairro"),
  "property-city": requiredText("Cidade"),
  "property-state": requiredText("Estado"),
  "property-zip-code": requiredText("CEP"),
  "property-country": requiredText("País"),
  "property-condominium-fee": optionalText,
  "property-iptu": optionalText,
  "property-latitude": optionalText,
  "property-longitude": optionalText,
  "property-tour": optionalText,
  "property-images": optionalText,
  "property-videos": optionalText,
});

export const editPropertySchema = z.object({
  "property-title": requiredText("Título"),
  "property-rent-price": optionalText,
  "property-sale-price": optionalText,
  "property-description": requiredText("Descrição"),
  "property-bedrooms": positiveNumber("Quartos"),
  "property-bathrooms": positiveNumber("Banheiros"),
  "property-garages": positiveNumber("Garagens"),
  "property-area": positiveNumber("Área"),
  "property-street": requiredText("Rua"),
  "property-number": requiredText("Número"),
  "property-complement": optionalText,
  "property-neighborhood": requiredText("Bairro"),
  "property-city": requiredText("Cidade"),
  "property-state": requiredText("Estado"),
  "property-zip-code": requiredText("CEP"),
  "property-owner": optionalText,
  "property-realtor": optionalText,
  "property-tour": optionalText,
  "property-video": optionalText,
  "property-images": optionalText,
});

export const createVisitSchema = z.object({
  "visit-property-id": requiredText("Imóvel"),
  "visit-client-id": requiredText("Cliente"),
  "visit-realtor-id": requiredText("Corretor"),
  "visit-scheduled-at": requiredText("Data e hora"),
  "visit-duration": optionalText,
  "visit-notes": optionalText,
  "visit-feedback": optionalText,
});

export const editVisitSchema = z.object({
  "visit-property": requiredText("Imóvel"),
  "visit-client": requiredText("Cliente"),
  "visit-realtor": requiredText("Corretor"),
  "visit-date": requiredText("Data"),
  "visit-time": requiredText("Hora"),
  "visit-notes": optionalText,
});

export const createContractSchema = z.object({
  "contract-property-id": requiredText("Imóvel"),
  "contract-client-id": requiredText("Cliente"),
  "contract-start-date": requiredText("Data de início"),
  "contract-end-date": optionalText,
  "contract-rent-value": optionalText,
  "contract-sale-value": optionalText,
  "contract-doc-url": optionalText,
  "contract-notes": requiredText("Termos"),
});

export const editContractSchema = z.object({
  "contract-client": requiredText("Cliente"),
  "contract-property": requiredText("Imóvel"),
  "contract-realtor": optionalText,
  "contract-start-date": requiredText("Data de início"),
  "contract-end-date": optionalText,
  "contract-value": optionalText,
  "contract-doc-url": optionalText,
  "contract-notes": requiredText("Cláusulas"),
});

export const createPaymentSchema = z.object({
  "payment-contract-id": requiredText("Contrato"),
  "payment-user-id": requiredText("Usuário"),
  "payment-amount": requiredText("Valor"),
  "payment-due-date": requiredText("Data de vencimento"),
  "payment-paid-date": optionalText,
  "payment-stripe-intent": optionalText,
  "payment-stripe-invoice": optionalText,
});

export const editPaymentSchema = z.object({
  "payment-client": requiredText("Cliente"),
  "payment-contract": requiredText("Contrato"),
  "payment-amount": requiredText("Valor"),
  "payment-due-date": requiredText("Data de vencimento"),
  "payment-paid-date": optionalText,
  "payment-reference": optionalText,
  "payment-notes": optionalText,
});
