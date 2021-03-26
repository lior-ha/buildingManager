import { useState } from 'react';

import { useSession } from '../../context/auth.context';
import { useTransactions } from '../../hooks/transactions.hook';

import AddTransaction from '../building/add-transaction/add-transaction.component';

import Tabs from '../../components/UI/Tabs/tabs.components';
import StatusBox from '../../components/status-box/status-box.components';
import AsideLastActions from '../../components/aside/aside-last-actions/aside-last-actions.component';
import TransactionsTable from '../../components/transactions/transactions-table/transactions-table.components';

import './transactions.styles.scss';

const TransactionsPage = () => {
    const { user } = useSession();
    const { transactionLoading, transactions } = useTransactions(undefined, 'createdAt', 'desc');
    const [ activeTab, setActiveTab ] = useState('details');

    const tabs = [
        {
            type: 'details',
            text: 'פירוט'
        },
        {
            type: 'add',
            text: 'הוספה'
        },
    ]

    return (
        <main className="mainWrapper">
            <section>
                {user.type==='admin' &&
                    <>
                        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                        
                        {user.type==='admin' && activeTab==='add' && 
                            <AddTransaction />
                        }
                    </>
                }
                {activeTab==='details' &&
                    <>
                        <StatusBox loading={transactionLoading} transactions={transactions} />
                        <TransactionsTable loading={transactionLoading} transactions={transactions} />
                    </>
                }
            </section>
            <AsideLastActions loading={transactionLoading} transactions={transactions} />
        </main>
    )
}

export default TransactionsPage;