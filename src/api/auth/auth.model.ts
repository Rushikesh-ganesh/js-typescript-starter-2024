import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const User = z.object({
    username: z.string().min(4).max(20),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['admin', 'user']),
})

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');