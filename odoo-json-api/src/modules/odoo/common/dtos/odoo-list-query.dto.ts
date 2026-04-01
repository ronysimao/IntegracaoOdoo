import { z } from 'zod';

export const odooIntegerSchema = z.union([
  z.number().int(),
  z
    .string()
    .trim()
    .refine((value) => /^\d+$/.test(value), {
      message: 'Informe um número inteiro válido.',
    })
    .transform((value) => Number(value)),
]);

export const odooDateSchema = z
  .string()
  .trim()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Informe uma data válida no formato AAAA-MM-DD.',
  );

export const odooListQuerySchema = z.object({
  limit: odooIntegerSchema
    .refine((value) => value > 0, {
      message: 'O limite deve ser maior que zero.',
    })
    .refine((value) => value <= 100, {
      message: 'O limite máximo permitido é 100.',
    })
    .default(20),
  offset: odooIntegerSchema
    .refine((value) => value >= 0, {
      message: 'O deslocamento deve ser zero ou positivo.',
    })
    .default(0),
  order: z.string().trim().min(1).optional(),
});

export type OdooListQueryDto = z.infer<typeof odooListQuerySchema>;
