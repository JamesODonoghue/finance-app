import React from 'react';
import { Button } from '../shared/components/Button/Button';
import { Input } from '../shared/components/Input/Input';
import './Authenticate.css';
import useAuth from '../context/auth';
export const Authenticate = () => {
    let { handleLogin } = useAuth();
    return (
        <div className="auth-container">
            <h2>welcome.</h2>
            <Input placeholder="email" type="email"></Input>
            <Input placeholder="password" type="password"></Input>
            <Button onClick={handleLogin}>Sign in with Google</Button>
        </div>
    );
};
