import { useState, useEffect } from 'react';
import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebase.utils';

export const useApartments = (building, id) => {
    const [error, setError] = useState(false);
    const [apartmentsData, setApartments] = useState([]);
    
    useEffect(() => {
        if (building) {
            const apartmentsRef = firestore.collection(`buildings/${building}/apartments`);
            
            const unSubApts = apartmentsRef
                    .onSnapshot(async snapshot => {
                            const apartmentsArr = await convertCollectionsSnapshotToMap(snapshot, building);
                            setApartments([...apartmentsArr]);
                        }, err => { setError(err) }
                    );
                return unSubApts;
        }
    }, [building]);

    
    let apartmentData;
    if (id) {
        apartmentData = apartmentsData.find(apartment => apartment.id === id)
    }

    return {
        error,
        apartmentData,
        apartmentsData
    }
}

