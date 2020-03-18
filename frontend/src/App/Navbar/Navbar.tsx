import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
export const Navbar = () => {
    return (
        <nav>
            <NavLink to="/dashboard">
                <FontAwesomeIcon icon={['far', 'chart-bar']}></FontAwesomeIcon>
            </NavLink>
            <NavLink to="/accounts">
                <FontAwesomeIcon
                    icon={['fas', 'dollar-sign']}
                ></FontAwesomeIcon>
            </NavLink>
            <NavLink to="/activity">
                <FontAwesomeIcon
                    icon={['far', 'credit-card']}
                ></FontAwesomeIcon>
            </NavLink>
            <NavLink to="/profile">
                <FontAwesomeIcon
                    icon={['far', 'user-circle']}
                ></FontAwesomeIcon>
            </NavLink>
        </nav>
    );
};
