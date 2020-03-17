import React from 'react';
import './Input.css';

export const Input = ({
    placeholder = 'email',
    type = 'email',
    onChange = () => {},
    children = undefined,
}) => {
    return (
        <input placeholder={placeholder} type={type} onChange={onChange}>
            {children}
        </input>
    );
};
