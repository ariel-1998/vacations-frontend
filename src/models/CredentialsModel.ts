import { z } from "zod";


export const credentialsSchema = z.object({
    email: z.string().email('this is an invalid email address'),
    password: z.string().min(4, 'password must contain 4-8 letters')
        .max(8, "password must contain 4-8 letters")
});

export type CredentialsModel= z.infer<typeof credentialsSchema>
