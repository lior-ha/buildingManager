import { useState, useEffect } from 'react';
import { firestore, getUserData } from '../firebase/firebase.utils';

export const useUser = (userId) => {
    const [ userData, setUser ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    useEffect(() => {
        if (userId) {
            const userRef = firestore.collection(`users`);
            const unSubUsers = userRef
                .onSnapshot(snapShot => {
                        const userSnapshot = getUserData(snapShot, userId);
                        setUser(userSnapshot);
                        setIsLoading(false)
                    }
                );
            return unSubUsers;
        }
    }, [userId]);

    return {
        userData,
        isLoading
    }
}

