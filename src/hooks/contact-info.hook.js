import { useState, useEffect } from 'react';
import { firestore, convertBuildingSnapshotToMap } from '../firebase/firebase.utils';
import { useSession } from '../context/auth.context';

export const useContactInfo = (apartmentId) => {
    const { building } = useSession();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(true);
    const [ tenantData, setContactInfo ] = useState([]);

    useEffect(() => {
        const apartmentsRef = firestore.collection(`buildings/${building}/apartments`);
        const unSubApts = apartmentsRef
                .onSnapshot(async snapshot => {
                        const apartmentsArr = await convertBuildingSnapshotToMap(snapshot, apartmentId);
                        // const contactInfoArr = apartmentsArr.filter( apartment => {
                        //     return apartment.id === apartmentId
                        // });
                        setContactInfo({...apartmentsArr});
                        setLoading(false);
                    }, err => { setError(err) }
                );
            return unSubApts;
    }, [building, apartmentId]);

    return {
        tenantData,
        loading,
        error
    }
}

export const useSetContactInfo = (objectsToAdd) => {
    const { building } = useSession();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(true);

    useEffect(() => {
        const unSubSetContactInfo = async () => {
            const collectionRef = firestore.collection(`buildings/${building}`);

            const batch = firestore.batch();
            objectsToAdd.forEach(obj => {
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj);
            });

            return await batch.commit();
        }
        return unSubSetContactInfo;
    }, [objectsToAdd, building]);

    return {
        objectsToAdd,
        loading,
        error
    }
}