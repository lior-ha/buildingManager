import { useState, useEffect } from 'react';
import { firestore, getBuildingData } from '../firebase/firebase.utils';

export const useBuilding = (building) => {
    const [ buildingData, setBuildingData ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(() => {
        if (building) {
            const apartmentsRef = firestore.collection(`buildings`);
            const unSubApts = apartmentsRef
                .onSnapshot(snapShot => {
                        const buildingSnapshot = getBuildingData(snapShot, building);
                        setBuildingData(buildingSnapshot);                        
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

