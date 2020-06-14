import React, { FunctionComponent, ReactElement } from 'react';
import './Authenticate.css';
import useAuth from '../context/auth';

import { ReactComponent as ReactLogo } from '../assets/undraw_data_reports_706v.svg';
import { StyledLoginButton } from '../shared/components/Button/Styles';

export const Authenticate: FunctionComponent<{}> = (): ReactElement => {
    let { handleLogin } = useAuth();
    return (
        <div className="auth-container">
            <div className="auth-left">
                <h1>Track your expenses</h1>
                <StyledLoginButton onClick={handleLogin}>
                    Sign up with Google
                </StyledLoginButton>
            </div>
            <div className="svg-container">
                <ReactLogo />
            </div>
        </div>
    );
};
