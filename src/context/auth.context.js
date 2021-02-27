import React, { useContext } from 'react';

export const authContext = React.createContext({
    user: null,
    building: ''
});

export const useSession = () => {
    const { user, building } = useContext(authContext);
    return { user, building };
}

