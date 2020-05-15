import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import './Navbar.css';

const renderLinkItem = (
    path: string,
    icon: IconName,
    iconType: IconPrefix = 'far',
) => {
    return (
        <NavLink to={path}>
            <FontAwesomeIcon icon={[iconType, icon]}></FontAwesomeIcon>
        </NavLink>
    );
};

export const Navbar = () => {
    return (
        <nav>
            {renderLinkItem('/', 'chart-bar')}
            {renderLinkItem('items', 'credit-card')}
        </nav>
    );
};
