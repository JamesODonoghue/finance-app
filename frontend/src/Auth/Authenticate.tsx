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
            <div
                className="left"
                style={{
                    backgroundColor: color.blueDark,
                    flexBasis: '50%',
                    padding: '5rem',
                    boxSizing: 'border-box',
                }}
            >
                <div>
                    <h1>Track your expenses with Budger</h1>
                    <StyledLoginButton onClick={handleLogin}>
                        Sign in with Google
                    </StyledLoginButton>
                </div>
            </div>
            <div
                style={{
                    minWidth: '400px',
                    width: '50%',
                    boxSizing: 'border-box',
                    padding: '4rem',
                }}
            >
                <div
                    className="svg-container"
                    style={{ color: color.blueDark }}
                >
                    <ReactLogo />
                </div>
            </div>
        </div>
    );
};
