import React, { useState, useEffect } from 'react';
import './App.css';
import queryString from 'query-string';

export const App = (props: any) => {
    let [token, setToken] = useState(null);

    useEffect(() => {
        let query = queryString.parse(props.location.search);
        if (query.token) {
            setToken(query.token as any);
            console.log(token);
            window.localStorage.setItem('jwt', query.token as string);
        }
    });

    return (
        <div className="app">
            {!token ? (
                <a href="http://localhost:5000/auth/google">Login</a>
            ) : (
                <div>You're logged in!</div>
            )}
        </div>
    );
};
