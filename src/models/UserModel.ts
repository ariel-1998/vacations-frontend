import { z } from "zod";

export enum Role {
    Admin = "Admin", User = "User"
}

export const UserSchema = z.object({
    userId: z.number().optional(),
    firstName: z.string().min(2, 'first name must contain at least 2 letters!'),
    lastName: z.string().min(2, 'last name must contain at least 2 letters!'),
    email: z.string().email('this is an invalid email address'),
    password: z.string().min(4, 'password must contain 4-8 letters').max(8, "password must contain 4-8 letters"),
    role: z.nativeEnum(Role).optional()
    
})

export type UserModel = z.infer<typeof UserSchema>
