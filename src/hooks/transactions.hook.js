import { useState, useEffect } from 'react';
import { firestore, convertTransactionsCollectionsSnapshotToMap } from '../firebase/firebase.utils';

import { useSession } from '../context/auth.context';

export const useTransactions = (limit, orderBy='createdAt', direction='asc') => {
    const { building } = useSession();

    const [ error, setError ] = useState(false);
    const [ transactionLoading, setLoading ] = useState(true);
    const [ transactions, setTransactions ] = useState([]);

    useEffect(() => {
            const unSubTransactions = firestore.collection(`buildings/${building}/transactions`)
                .limit(limit)
                .orderBy(orderBy, direction)
                .onSnapshot(async snapshot => { 
                        const transactionsArr = convertTransactionsCollectionsSnapshotToMap(snapshot)
                        setTransactions([...transactionsArr]);
                        setLoading(false);
                    }, err => { setError(err) }
                );

            return () => {
                unSubTransactions();
            }
    }, [building, limit, orderBy, direction]);
    
    return {
        error,
        transactionLoading,
        transactions
    }
}