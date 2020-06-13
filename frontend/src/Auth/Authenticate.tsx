import React from 'react';
import './Authenticate.css';
import useAuth from '../context/auth';

import { ReactComponent as ReactLogo } from '../assets/undraw_data_reports_706v.svg';
import { color } from '../shared/utils/styles';
import { StyledLoginButton } from '../shared/components/Button/Styles';

export const Authenticate = () => {
    let { handleLogin } = useAuth();
    return (
        <div className="auth-container">
            <div style={{ maxWidth: '600px' }}>
                <div style={{ fontSize: '2.5rem' }}>
                    <h1>Track your expenses with Sixpence</h1>
                    <StyledLoginButton onClick={handleLogin}>
                        Sign in with Google
                    </StyledLoginButton>
                </div>
            </div>
            <div
                className="svg-container"
                style={{
                    color: color.blueDark,
                    width: '800px',
                    right: '3rem',
                }}
            >
                <ReactLogo />
            </div>
        </div>
    );
};
