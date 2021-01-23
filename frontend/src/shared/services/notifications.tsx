/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer, useMemo, Dispatch, FC } from 'react';

/** Notifications Provider*/
const initialState: Notification[] = [];

export interface Notification {
    id?: number;
    content: string | undefined;
}
type State = Notification[];

interface ContextProps {
    toasts: State;
    toastDispatch: Dispatch<[TOAST_ACTIONS, Notification]>;
    removeAll: () => void;
    removeOne: (id: number) => void;
    add: (content: string) => void;
}

/**
 * @desc Enumerated action types
 */
export enum TOAST_ACTIONS {
    ADD,
    REMOVE,
    REMOVE_ALL,
}

const reducer = (state: State, [type, payload]: [TOAST_ACTIONS, Partial<Notification>]): State => {
    switch (type) {
        case TOAST_ACTIONS.ADD:
            return [
                ...state,
                {
                    id: Date.now(),
                    content: payload.content,
                },
            ];
        case TOAST_ACTIONS.REMOVE:
            return state.filter((t) => t.id !== payload.id);
        case TOAST_ACTIONS.REMOVE_ALL:
            return initialState;
        default:
            console.warn('unknown action: ', { type, payload });
            return state;
    }
};
export const NotificationsContext = createContext<Partial<ContextProps>>({});

export const NotificationsProvider: FC = ({ children }) => {
    const [toasts, toastDispatch] = useReducer(reducer, initialState);

    const removeAll = () => {
        toastDispatch([TOAST_ACTIONS.REMOVE_ALL, {}]);
    };

    const removeOne = (id: number) => {
        toastDispatch([TOAST_ACTIONS.REMOVE, { id }]);
    };

    const add = (content: string) => toastDispatch([TOAST_ACTIONS.ADD, { content }]);

    const value = useMemo(() => {
        return {
            toasts,
            removeAll,
            removeOne,
            add,
        };
    }, [toasts]);

    return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export default function useNotifications(): ContextProps {
    const context = useContext(NotificationsContext);
    return context as ContextProps;
}
