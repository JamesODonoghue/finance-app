import React from 'react';
import useNotifications, { Notification } from '../../services/notifications';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // ES6

export const ToastList = () => {
    const { toasts, removeOne } = useNotifications();

    return (
        <TransitionGroup className="mr-6">
            {toasts.map(({ id, content }) => (
                <CSSTransition key={id} timeout={500} classNames="toast">
                    <div className="flex p-6 rounded-md bg-indigo-600 shadow-xl items-center text-white mb-4 relative">
                        <div className="h-6 w-6 mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div className="mr-8">{content}</div>
                        <button className="h-6 w-6 mr-4 cursor-pointer absolute right-0" onClick={() => removeOne(id)}>
                            <svg viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 18L18 6M6 6L18 18"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

export const Toast = ({ toast }: { toast: Notification }) => (
    <div className="flex p-6 rounded-md bg-white shadow-xl items-center">
        <div className="text-indigo-600 h-6 w-6 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
        <div>{toast.content}</div>
    </div>
);
