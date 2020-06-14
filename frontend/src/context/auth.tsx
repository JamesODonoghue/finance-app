import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactElement,
    SetStateAction,
    Dispatch,
} from 'react';
import { getToken, verifyToken, setToken } from '../shared/utils/auth';
import { parse } from 'query-string';
import { User } from '../types/user';
interface ContextProps {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
    handleLogin: () => void;
}
export const AuthContext = createContext<ContextProps | undefined>(undefined);

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}): ReactElement => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const handleLogin = (): void => {
        window.location.href = 'http://localhost:5000/auth/google';
    };

    useEffect((): void => {
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

    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}
