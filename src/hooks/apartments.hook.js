import { useState, useEffect } from 'react';
import { useSession } from '../context/auth.context';
import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebase.utils';

export const useApartments = () => {
    const { building }  = useSession();
    const [error, setError] = useState(false);
    const [apartmentsLoading, setLoading] = useState(true);
    const [apartmentsData, setApartments] = useState([]);
    
    useEffect(() => {
        const apartmentsRef = firestore.collection(`buildings/${building}/apartments`);
        
        const unSubApts = apartmentsRef
                .onSnapshot(async snapshot => {
                        const apartmentsArr = await convertCollectionsSnapshotToMap(snapshot, building);
                        setApartments([...apartmentsArr]);
                        setLoading(false);
                    }, err => { setError(err) }
                );
            return unSubApts;
    }, [building]);

    return {
        error,
        apartmentsLoading,
        apartmentsData
    }
}

