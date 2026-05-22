import { z } from "zod";

const requiredText = (field: string) => z.string().trim().min(1, `${field} é obrigatório.`);

export const loginSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const registerSchema = z
  .object({
    name: requiredText("Nome"),
    email: z.string().trim().email("Informe um e-mail válido."),
    phone: requiredText("Telefone"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(6, "Confirme sua senha."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export const ownerLandingSchema = z.object({
  name: requiredText("Nome"),
  email: z.string().trim().email("Informe um e-mail válido."),
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
