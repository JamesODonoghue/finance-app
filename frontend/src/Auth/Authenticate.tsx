import React from 'react';
import './Authenticate.css';
import useAuth from '../context/auth';
import { Button } from '../shared/components/Button/Button';
export const Authenticate = () => {
    let { handleLogin } = useAuth();
    return (
        <div className="auth-container">
            <h1>Welcome to Minted</h1>
            <Button onClick={handleLogin}>Sign in with Google</Button>
        </div>
    );
};
