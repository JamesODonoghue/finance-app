import React, { useEffect } from 'react';
import auth from '../helpers/auth';
import { useHistory } from 'react-router';
import { parse } from 'query-string';
import io from 'socket.io-client';

export const Authenticate = () => {
    const history = useHistory();
    // const socket = io('http://localhost:5000');

    let handleLogin = () => {
        window.location.href = `http://localhost:5000/auth/google`;
    };

    useEffect(() => {
        if (auth.getToken()) history.push('/home');
        let { token } = parse(history.location.search);
        if (token) {
            auth.setToken(token as string);
            history.push('/home');
        }
        // history.push('/authenticate')
    }, []);
    return (
        <div className="login-page">
            <div className="login-header">
                <h1>Finance</h1>
            </div>
            <button className="login-btn" onClick={handleLogin}>
                Sign in with google
            </button>
        </div>
    );
};
