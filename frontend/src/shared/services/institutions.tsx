import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
    useRef,
    useMemo,
} from 'react';
import { getInstitutionById as apiGetInstitutionById } from './api';
interface IContextProps {
    institutionsById: any;
    getInstitutionById: any;
}

enum TYPES {
    SUCCESSFUL_GET,
}
export const InstitutionsContext = createContext<Partial<IContextProps>>({});

export const InstitutionsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [institutionsById, dispatch] = useReducer(reducer, {});

    const hasRequested = useRef<{ [key: string]: boolean }>({});

    /**
     * @desc Requests details for a single Institution.
     * The api request will be bypassed if the data has already been fetched.
     * A 'refresh' parameter can force a request for new data even if local state exists.
     */
    const getInstitutionById = useCallback(async (id) => {
        if (!hasRequested.current[id]) {
            hasRequested.current[id] = true;
            const result = await apiGetInstitutionById(id);
            const { institution } = await result.json();
            dispatch([TYPES.SUCCESSFUL_GET, institution]);
        }
    }, []);

    /**
     * @desc Builds a more accessible state shape from the Institution data. useMemo will prevent
     * these from being rebuilt on every render unless institutionsById is updated in the reducer.
     */
    const value = useMemo(() => {
        const allInstitutions = Object.values(institutionsById);
        return {
            allInstitutions,
            institutionsById,
            getInstitutionById,
            getInstitutionsById: getInstitutionById,
        };
    }, [institutionsById, getInstitutionById]);

    return (
        <InstitutionsContext.Provider value={value}>
            {children}
        </InstitutionsContext.Provider>
    );
};

/**
 * @desc Handles updates to the Institutions state as dictated by dispatched actions.
 */
function reducer(state: any, [type, payload]: any) {
    switch (type) {
        case TYPES.SUCCESSFUL_GET:
            if (!payload) {
                return state;
            }

            return {
                ...state,
                [payload.institution_id]: payload,
            };
        default:
            console.warn('unknown action: ', { type, payload });
            return state;
    }
}

export default function useInstitutions() {
    const context = useContext(InstitutionsContext);

    return context;
}
