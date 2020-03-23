import React, { useEffect } from 'react';
import { getToken, verifyToken, setToken } from '../shared/utils/auth';
import { useHistory } from 'react-router';
import { parse } from 'query-string';
import { Button } from '../shared/components/Button/Button';
import { Input } from '../shared/components/Input/Input';
import './Authenticate.css';
export const Authenticate = () => {
    const history = useHistory();
    let handleLogin = () => {
        window.location.href = `http://localhost:5000/auth/google`;
    };

    useEffect(() => {
        let currentToken = getToken();
        if (currentToken && verifyToken(getToken() as string))
            history.push('/home');
        let { token } = parse(history.location.search);
        if (token) {
            setToken(token as string);
            history.push('/home');
        }
        // history.push('/authenticate')
    }, [history]);
    return (
        <div className="auth-container">
            <h2>welcome.</h2>
            <Input placeholder="email" type="email"></Input>
            <Input placeholder="password" type="password"></Input>
            <Button onClick={handleLogin}>Sign in with Google</Button>
        </div>
    );
};
