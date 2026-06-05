import { z } from "zod";

/**
 * Contact Form Validation Schema
 * Using Zod for form validation
 */
export const contactSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "O nome não pode ter mais de 100 caracteres" }),

  email: z
    .string()
    .email({ message: "Por favor, insira um email válido" })
    .toLowerCase(),

  mensagem: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" })
    .max(1000, { message: "A mensagem não pode ter mais de 1000 caracteres" })
    .optional()
    .or(z.literal("")),

  consentimento: z.boolean().refine((val) => val === true, {
    message: "Deve aceitar os termos e condições para continuar",
  }),
});

export default contactSchema;
