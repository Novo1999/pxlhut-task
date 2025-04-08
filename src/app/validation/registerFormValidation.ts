import { z } from 'zod';

const step1Schema = z.object({
  fullName: z.string().nonempty('Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
})

const step2Schema = z.object({
  street: z.string().nonempty('Street address is required'),
  city: z.string().nonempty('City is required'),
  zip: z.string().min(5, 'Zip must be at least 5 digits').regex(/^\d+$/, 'Zip must be numeric'),
})

const step3Schema = z
  .object({
    username: z.string().min(4, 'Username must be at least 4 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export { step1Schema, step2Schema, step3Schema };

