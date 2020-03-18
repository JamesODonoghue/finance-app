import React from 'react';
import { NavLink, useRouteMatch, match } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import './Navbar.css';

const renderLinkItem = (
    match: match,
    path: string,
    icon: IconName,
    iconType: IconPrefix = 'far',
) => {
    return (
        <NavLink to={`${match.path}/${path}`}>
            <FontAwesomeIcon icon={[iconType, icon]}></FontAwesomeIcon>
        </NavLink>
    );
};

export const Navbar = () => {
    const match = useRouteMatch();
    return (
        <nav>
            {renderLinkItem(match, 'dashboard', 'chart-bar')}
            {renderLinkItem(match, 'activity', 'dollar-sign', 'fas')}
            {renderLinkItem(match, 'accounts', 'credit-card')}
            {renderLinkItem(match, 'profile', 'user-circle')}
        </nav>
    );
};
