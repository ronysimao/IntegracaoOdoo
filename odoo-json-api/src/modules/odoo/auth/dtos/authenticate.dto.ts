import { z } from 'zod';

export const authenticateSchema = z.object({
  database: z
    .string({ message: 'Informe a base de dados do Odoo.' })
    .trim()
    .min(1, 'Informe a base de dados do Odoo.'),
  login: z
    .string({ message: 'Informe o login do usuário.' })
    .trim()
    .min(1, 'Informe o login do usuário.'),
  password: z
    .string({ message: 'Informe a senha do usuário.' })
    .min(1, 'Informe a senha do usuário.'),
});

export type AuthenticateDto = z.infer<typeof authenticateSchema>;
