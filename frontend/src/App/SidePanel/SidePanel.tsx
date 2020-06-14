import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { StyledSidePanel, StyledNavLink } from './Styles';

const renderLinkItem = (
    path: string,
    icon: IconName,
    title: string,
    iconType: IconPrefix = 'far',
) => {
    return (
        <StyledNavLink>
            <NavLink to={path}>
                {title}
                <FontAwesomeIcon
                    style={{ marginLeft: '1rem' }}
                    icon={[iconType, icon]}
                ></FontAwesomeIcon>
            </NavLink>
        </StyledNavLink>
    );
};

export const SidePanel = () => (
    <StyledSidePanel>
        {renderLinkItem('profile', 'user-circle', 'Profile')}
        {renderLinkItem('/', 'chart-bar', 'Dashboard')}
        {renderLinkItem('items', 'credit-card', 'Accounts')}
    </StyledSidePanel>
);
