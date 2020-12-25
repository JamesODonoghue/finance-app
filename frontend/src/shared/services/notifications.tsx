import React, { createContext, useContext, useReducer, useMemo, Dispatch } from 'react';

/** Notifications Provider*/
const initialState: Notification[] = [];

export interface Notification {
    id?: any;
    content: any;
}
type State = Notification[];

interface ContextProps {
    toasts: State;
    toastDispatch: Dispatch<[TOAST_ACTIONS, Notification]>;
    removeAll: () => void;
    removeOne: (id: string) => void;
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
                    id: +new Date(),
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

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, toastDispatch] = useReducer(reducer, initialState);

    const removeAll = () => {
        toastDispatch([TOAST_ACTIONS.REMOVE_ALL, {}]);
    };

    const removeOne = (id: string) => {
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

export default function useNotifications() {
    const context = useContext(NotificationsContext);
    return context as ContextProps;
}
