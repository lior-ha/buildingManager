import React, { useContext } from 'react';

export const apartmentsContext = React.createContext({
    apartments: []
});

export const useSession = () => {
    const { apartments } = useContext(apartmentsContext);
    
    return apartments;
}