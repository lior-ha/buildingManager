import { useState, useEffect } from 'react';
import { useSession } from '../context/auth.context';
import { firestore, convertTransactionsCollectionsSnapshotToMap } from '../firebase/firebase.utils';

export const useAside = (type) => {
    const { building } = useSession();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
            const unSubExpenses = firestore
                .collection(`buildings/${building}/expenses`)

                .onSnapshot(async snapshot => {
                        const expensesArr = convertTransactionsCollectionsSnapshotToMap(snapshot, 'expense')
                        setExpenses([...expensesArr])
                        setLoading(false);
                    }, err => { setError(err) }
                );

            const unSubIncomes = firestore
                .collection(`buildings/${building}/incomes`)
                .onSnapshot(async snapshot => { 
                    const incomesArr = convertTransactionsCollectionsSnapshotToMap(snapshot, 'income')
                    setIncomes([...incomesArr]);
                    setLoading(false);
                    }, err => { setError(err) }
                );

            return () => {
                unSubExpenses();
                unSubIncomes();
            }
    }, [building]);
    
    const transactions = [...incomes, ...expenses];
    transactions.sort((a, b) => b.createdAt - a.createdAt);

    return {
        error,
        loading,
        transactions
    }
}