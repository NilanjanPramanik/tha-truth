import { z } from "zod"

export const User = z.object({
    username: z
        .string()
        .min(4, { message: "Username must be at least 4 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" })
        .regex(/^[a-zA-Z0-9_]*$/, { message: "Username must only contain letters, numbers, and underscores" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 8 characters long" }),
})

export const LoginUser = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 8 characters long" }),
})