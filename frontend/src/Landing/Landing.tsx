import React, { ReactElement } from 'react';
import useAuth from '../context/auth';
export const Landing = (): ReactElement => {
    const { handleLogin } = useAuth();
    return (
        <div className="max-w-6xl mx-auto mt-48">
            <h1 className="text-5xl font-black">Start tracking your expenses</h1>
            <button
                onClick={handleLogin}
                className="mt-8 bg-indigo-600 text-white p-4 rounded-md font-semibold shadow-indigo hover:bg-indigo-400 focus:outline-none focus:outline-shadow transition duration-200"
            >
                Sign in with google
            </button>
        </div>
    );
};
