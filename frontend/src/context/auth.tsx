import React, { createContext, useState, useContext, useEffect } from 'react';
import { getToken, verifyToken, setToken } from '../shared/utils/auth';
import { parse } from 'query-string';
interface IContextProps {
    user: any;
    setUser: any;
    handleLogin: () => void;
}
export const AuthContext = createContext<Partial<IContextProps>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>();

    const handleLogin = () =>
        (window.location.href = 'http://localhost:5000/auth/google');

    useEffect(() => {
        let token = getToken();
        let user = verifyToken(token as string);
        if (token && user) {
            setUser(user);
        } else {
            let { token: newToken } = parse(window.location.search);
            if (newToken) {
                setToken(newToken as string);
                setUser(verifyToken(newToken as string));
            }
        }
    }, []);

    const value = {
        user,
        setUser,
        handleLogin,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
