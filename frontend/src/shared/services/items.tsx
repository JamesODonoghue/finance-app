import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
    useRef,
    useMemo,
} from 'react';
import { getItemsByUser as apiGetItemsByUser } from './api';
import { keyBy, omit, omitBy, groupBy } from 'lodash';

interface IContextProps {
    itemsById: any;
    itemsByUser: any;
    getItemsByUser: any;
}

/**
 * @desc Enumerated action types
 */
enum TYPES {
    SUCCESSFUL_GET,
    SUCCESSFUL_REQUEST,
    DELETE_BY_USER,
    SUCCESSFUL_DELETE,
}
export const ItemsContext = createContext<Partial<IContextProps>>({});

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
    const [itemsById, dispatch] = useReducer(reducer, {});

    const hasRequested = useRef<{
        byId: { [key: string]: boolean };
        byUser: { [key: string]: boolean };
    }>({
        byId: {},
        byUser: {},
    });

    const getItemsByUser = useCallback(async (userId) => {
        hasRequested.current.byUser[userId] = true;
        const result = await apiGetItemsByUser(userId);
        const payload = await result.json();
        dispatch([TYPES.SUCCESSFUL_REQUEST, payload]);
    }, []);

    const value = useMemo(() => {
        const allItems = Object.values(itemsById);
        return {
            allItems,
            itemsById,
            itemsByUser: groupBy(allItems, 'userId'),
            getItemsByUser,
        };
    }, [itemsById, getItemsByUser]);

    return (
        <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
    );
};

/**
 * @desc Handles updates to the Items state as dictated by dispatched actions.
 */
function reducer(state: any, [type, payload]: any[]) {
    switch (type) {
        case TYPES.SUCCESSFUL_REQUEST:
            if (!payload.length) {
                return state;
            }
            return { ...state, ...keyBy(payload, 'itemId') };
        case TYPES.SUCCESSFUL_DELETE:
            return omit(state, [payload]);
        case TYPES.DELETE_BY_USER:
            return omitBy(state, (items) => items.user_id === payload);
        default:
            console.warn('unknown action: ', { type, payload });
            return state;
    }
}

export default function useItems() {
    const context = useContext(ItemsContext);

    return context;
}
