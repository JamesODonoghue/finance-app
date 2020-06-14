import React, { FunctionComponent, ReactElement } from 'react';
import useAuth from '../context/auth';
import { StyledLoginButton } from '../shared/components/Button/Styles';
import {
    StyledLandingNav,
    StyledMain,
    StyledMainTitle,
    StyledLanding,
    StyledLandingNavLink,
} from './Styles';
import { StyledBarRect } from '../shared/components/BarChart/Styles';
import { colors } from '@atlaskit/theme';

export const About = () => {};

export const Landing: FunctionComponent<{}> = (): ReactElement => {
    let { handleLogin } = useAuth();
    return (
        <StyledLanding>
            <StyledLandingNav>
                <StyledLandingNavLink href="#home">Home</StyledLandingNavLink>
                <StyledLandingNavLink href="#about">About</StyledLandingNavLink>
            </StyledLandingNav>

            <StyledMain>
                <div style={{ width: '500px', marginBottom: '5rem' }}>
                    <StyledMainTitle>Track your expenses</StyledMainTitle>
                    <StyledLoginButton onClick={handleLogin}>
                        Sign in with Google
                    </StyledLoginButton>
                </div>
                {/* <ReactLogo
                    style={{
                        width: '800px',
                    }}
                /> */}
                <svg height="400px">
                    <g>
                        <StyledBarRect
                            style={{
                                fill: colors.N50,
                                height: '100px',
                                width: '50px',
                            }}
                            rx="10px"
                            y="100px"
                        ></StyledBarRect>
                        <StyledBarRect
                            style={{
                                fill: colors.B500,
                                height: '150px',
                                width: '50px',
                            }}
                            rx="10px"
                            y="50px"
                            x="100px"
                        ></StyledBarRect>
                        <StyledBarRect
                            style={{
                                fill: colors.N50,
                                height: '200px',
                                width: '50px',
                            }}
                            rx="10px"
                            y="0"
                            x="200px"
                        ></StyledBarRect>
                    </g>
                </svg>
            </StyledMain>
        </StyledLanding>
    );
};
