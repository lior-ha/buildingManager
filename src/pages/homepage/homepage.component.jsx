import { useState } from 'react';
import { useTransactions } from '../../hooks/transactions.hook';
import { useApartments } from '../../hooks/apartments.hook';
import { useSession } from '../../context/auth.context';

import StatusBox from '../../components/status-box/status-box.components';
import AptsPaymentStatus from '../../components/apartments-payment-status/apartments-payment-status.component';
import MonthlyTransactionsBox from '../../components/monthlyTransactionsBox/monthlyTransactionsBox.component';

import Tabs from '../../components/UI/Tabs/tabs.components';
import Loader from '../../components/UI/loader/loader.component';

const Homepage = () => {
    const { user, building, apartmentsData } = useSession();
    const { transactionLoading, transactions } = useTransactions(undefined, 'createdAt', 'desc', building);
    const { apartmentData } = useApartments(building, user.apt);
    const [ activeTab, setActiveTab ] = useState('details');

    const tabs = [
        {
            type: 'details',
            text: 'סטטוס'
        },
        {
            type: 'paymentsInfo',
            text: 'מצב תשלומים - בניין'
        },
    ];
    
    return (
        <>
            <section>
                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab==='details' &&
                    <>
                        <StatusBox loading={transactionLoading} transactions={transactions} />
                        {apartmentData ? <MonthlyTransactionsBox apartmentData={apartmentData} transactions={transactions} /> : <Loader /> }
                    </>
                }
                {activeTab==='paymentsInfo' &&
                    <AptsPaymentStatus apartments={apartmentsData} />
                }
            </section>
            
        </>
    )
};

export default Homepage;