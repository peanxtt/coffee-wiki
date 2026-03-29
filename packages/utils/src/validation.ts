import { z } from 'zod'

// Common Zod schemas for validation

export const emailSchema = z.string().email('Invalid email address')

export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
})

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')

export const urlSchema = z.string().url('Invalid URL')
