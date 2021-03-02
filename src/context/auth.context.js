import React, { useContext } from 'react';

export const authContext = React.createContext({
    user: null,
    building: '',
    id: ''
});

export const useSession = () => {
    const { user, building, id } = useContext(authContext);
    return { user, building, id };
}

