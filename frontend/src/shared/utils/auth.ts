import { verify } from 'jsonwebtoken';
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET_KEY as string;

export const getToken = () => window.localStorage.getItem('token') as string;

export const setToken = (token: string) =>
    window.localStorage.setItem('token', token);

export const verifyToken = (token: string) => {
    try {
        console.log(verify(token, JWT_SECRET));
        return verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
};
