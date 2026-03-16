const { z } = require('zod');

const registerSchema = z.object({
    body: z.object({
        fullName: z.string({
            required_error: "Full name is required."
        })
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(60, "Full name must not exceed 60 characters."),

        email: z
        .string({ required_error: "Email is required."})
        .trim()
        .toLowerCase()
        .email('Invalid email format'),

        password: z
        .string({ required_error: "Password is required."})
        .min(8, "Password must be at least 8 characters."),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z
        .string({ required_error: "Email is required."})
        .trim()
        .toLowerCase()
        .email("Invalid email format"),
        password: z
        .string({ required_error: "Password is required."})
        .min(1, "Password is required"),
    }),
});

module.exports = { registerSchema, loginSchema };