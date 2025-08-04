import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  rememberMe: z.boolean().optional(),
})

export const passwordRequirements = [
  { id: "length", label: "At least 8 characters", regex: /.{8,}/ },
  { id: "uppercase", label: "One uppercase letter", regex: /[A-Z]/ },
  { id: "lowercase", label: "One lowercase letter", regex: /[a-z]/ },
  { id: "number", label: "One number", regex: /[0-9]/ },
  { id: "special", label: "One special character", regex: /[^A-Za-z0-9]/ },
]

export function validatePassword(password: string) {
  return passwordRequirements.map(req => ({
    ...req,
    isValid: req.regex.test(password),
  }))
} 