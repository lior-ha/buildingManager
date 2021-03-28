import { useState } from 'react';
import { useTransactions } from '../../hooks/transactions.hook';
import { useApartments } from '../../hooks/apartments.hook';
import { useSession } from '../../context/auth.context';

import AsideLastActions from '../../components/aside/aside-last-actions/aside-last-actions.component';
import StatusBox from '../../components/status-box/status-box.components';
import AptsPaymentStatus from '../../components/apartments-payment-status/apartments-payment-status.component';
import MonthlyTransactionsBox from '../../components/monthlyTransactionsBox/monthlyTransactionsBox.component';

import Tabs from '../../components/UI/Tabs/tabs.components';
import Loader from '../../components/UI/loader/loader.component';

const Homepage = () => {
    const { user } = useSession();
    const { transactionLoading, transactions } = useTransactions(undefined, 'createdAt', 'desc');
    const { apartmentsLoading, apartmentsData } = useApartments();
    const { apartmentData } = useApartments(user.apt);
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
        <main className="mainWrapper">
            <section>
                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab==='details' &&
                    <>
                        <StatusBox loading={transactionLoading} transactions={transactions} />
                        {apartmentData ? <MonthlyTransactionsBox apartmentData={apartmentData} /> : <Loader /> }
                    </>
                }
                {activeTab==='paymentsInfo' &&
                    <AptsPaymentStatus loading={apartmentsLoading} apartments={apartmentsData} />
                }
            </section>
            <AsideLastActions loading={transactionLoading} transactions={transactions} />
        </main>
    )
};

export default Homepage;