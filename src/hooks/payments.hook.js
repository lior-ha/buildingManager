import { useState, useEffect } from 'react';
import { firestore, convertPaymentsCollectionsSnapshotToMap } from '../firebase/firebase.utils';

import { useSession } from '../context/auth.context';

export const usePayments = () => {
    const { building } = useSession();

    const [error, setError] = useState(false);
    const [paymentLoading, setLoading] = useState(true);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
            const unSubExpenses = firestore
                .collection(`buildings/${building}/expenses`)
                .onSnapshot(async snapshot => {
                        const expensesArr = convertPaymentsCollectionsSnapshotToMap(snapshot, 'expense');
                        setExpenses([...expensesArr])
                        setLoading(false);
                    }, err => { setError(err) }
                );

            const unSubIncomes = firestore
                .collection(`buildings/${building}/incomes`)
                .onSnapshot(async snapshot => { 
                        const incomesArr = convertPaymentsCollectionsSnapshotToMap(snapshot, 'income')
                        setIncomes([...incomesArr]);
                        setLoading(false);
                    }, err => { setError(err) }
                );

            return () => {
                unSubExpenses();
                unSubIncomes();
            }
    }, [building]);
    
    const payments = [...incomes, ...expenses];
    payments.sort((a, b) => b.createdAt - a.createdAt);

    return {
        error,
        paymentLoading,
        incomes,
        expenses,
        payments
    }
}