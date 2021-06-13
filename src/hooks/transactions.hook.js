import { useState, useEffect } from 'react';
import { firestore, convertTransactionsCollectionsSnapshotToMap } from '../firebase/firebase.utils';

export const useTransactions = (limit, orderBy='createdAt', direction='asc', building) => {

    const [ error, setError ] = useState(false);
    const [ transactionLoading, setLoading ] = useState(true);
    const [ transactions, setTransactions ] = useState([]);

    useEffect(() => {
        if (building) {
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
        }
    }, [building, limit, orderBy, direction]);
    
    return {
        error,
        transactionLoading,
        transactions
    }
}