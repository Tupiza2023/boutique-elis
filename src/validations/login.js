import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      message: 'El email es requerido',
    })
    .email({
      message: 'El email no es valido',
    }),
  password: z
    .string({
      message: 'La contraseña es requerida',
    })
    .min(4, {
      message: 'La contraseña debe tener al menos 4 caracteres',
    })
    .max(100, {
      message: 'La contraseña debe tener como máximo 100 caracteres',
    }),
});
