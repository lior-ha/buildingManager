import { useState, useEffect } from 'react';
import { firestore, getAddress } from '../firebase/firebase.utils';

export const useBuilding = (building) => {
    const [ buildingData, setBuilding ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    useEffect(() => {
        if (building) {
            const apartmentsRef = firestore.collection(`buildings`);
            const unSubApts = apartmentsRef
                .onSnapshot(snapShot => {
                        const buildingSnapshot = getAddress(snapShot, building);
                        setBuilding(buildingSnapshot);
                        setIsLoading(false)
                    }
                );
            return unSubApts;
        }
    }, [building]);

    return {
        buildingData,
        isLoading
    }
    
}

