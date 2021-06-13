import React, { useContext } from 'react';

export const authContext = React.createContext({
    user: null,
    building: '',
    apartmentsData: []
});

export const useSession = () => {
    const { user, building, apartmentsData } = useContext(authContext);
    return { user, building, apartmentsData };
}

