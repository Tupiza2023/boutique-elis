import * as z from 'zod';

export const addProductSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El campo debe ser obligatorio',
    })
    .max(255, {
      message: 'El texto es muy largo',
    }),
  handle: z.string().min(2, { message: 'El campo es obligatorio' }).max(255),
  price: z.string().min(1, { message: 'El campo es obligatorio' }).max(255),
  currencyCode: z
    .string()
    .min(2, { message: 'El campo es obligatorio' })
    .max(255),
  description: z
    .string()
    .min(2, { message: 'El campo es obligatorio' })
    .max(255),
  tag: z.string().min(2, { message: 'El campo es obligatorio' }).max(255),
  quantity: z.string().min(1, { message: 'El campo es obligatorio' }).max(255),
  image: z.any(),
});
