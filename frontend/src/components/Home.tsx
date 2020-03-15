import React, { useEffect, useState } from 'react';
import auth from '../helpers/auth';

export const Home = () => {
    let user = auth.decodeToken(auth.getToken() || '');

    return (
        <div>
            <h1>Welcome {user.payload.displayName}</h1>
        </div>
    );
};
