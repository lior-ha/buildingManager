import { useState, useEffect } from 'react';
import { firestore, convertPaymentsCollectionsSnapshotToMap } from '../firebase/firebase.utils';

import { useSession } from '../context/auth.context';

export const usePayments = () => {
    const orderBy = 'createdAt' ;
    const limit = 10;
    const { building } = useSession();

    const [error, setError] = useState(false);
    const [paymentLoading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
            const unSubPayments = firestore
                .collection(`buildings/${building}/payments`).orderBy(orderBy, "desc").limit(limit)
                .onSnapshot(async snapshot => { 
                        const paymentsArr = convertPaymentsCollectionsSnapshotToMap(snapshot)
                        setPayments([...paymentsArr]);
                        setLoading(false);
                    }, err => { setError(err) }
                );

            return () => {
                unSubPayments();
            }
    }, [building]);
    
console.log(payments)
    return {
        error,
        paymentLoading,
        payments
    }
}