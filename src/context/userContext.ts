import { createContext } from 'react';
import type { User } from '../types/users';

export const UserContext = createContext<{
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>; //Typscript <User | null> 
} | null>(null);