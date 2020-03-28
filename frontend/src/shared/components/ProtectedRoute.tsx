import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { verifyToken, getToken } from '../utils/auth';

export const ProtectedRoute = ({
    component: Component,
    ...rest
}: RouteProps) => {
    if (!Component) return null;
    return (
        <Route
            {...rest}
            render={props => {
                if (verifyToken(getToken())) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};
