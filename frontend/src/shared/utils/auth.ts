import { verify } from 'jsonwebtoken';
import { User } from '../../types/user';
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET_KEY as string;

export const getToken = (): string | null =>
    window.localStorage.getItem('token');

export const setToken = (token: string): void => {
    window.localStorage.setItem('token', token);
};

export const verifyToken = (token: string): User | undefined => {
    try {
        return verify(token, JWT_SECRET) as User;
    } catch (e) {
        return undefined;
    }
};
