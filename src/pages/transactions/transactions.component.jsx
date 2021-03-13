import { Fragment, useState } from 'react';

import { useSession } from '../../context/auth.context';
import { useTransactions } from '../../hooks/transactions.hook';

import AddTransaction from '../building/add-transaction/add-transaction.component';
import StatusBox from '../../components/status-box/status-box.components';
import AsideLastActions from '../../components/aside/aside-last-actions/aside-last-actions.component';
import TransactionsTable from '../../components/transactions/transactions-table/transactions-table.components';

import './transactions.styles.scss';

const TransactionsPage = () => {
    const { user } = useSession();
    const { transactionLoading, transactions } = useTransactions(undefined, 'createdAt', 'desc');
    const [ tab, setTab ] = useState('details')

    return (
        <main className="mainWrapper">
            <section>
                {user.type==='admin' &&
                    <Fragment>
                        <div className="tabs">
                            <div className={`tab ${tab==='details' && 'active'}`} onClick={() => setTab('details')}>פירוט</div>
                            <div className={`tab ${tab==='add' && 'active'}`} onClick={() => setTab('add')}>הוספה</div>
                        </div>
                        {user.type==='admin' && tab==='add' &&
                            <AddTransaction />
                        }
                    </Fragment>
                }
                {tab==='details' &&
                    <Fragment>
                        <StatusBox loading={transactionLoading} transactions={transactions} />
                        <TransactionsTable loading={transactionLoading} transactions={transactions} />
                    </Fragment>
                }
            </section>
            <AsideLastActions loading={transactionLoading} transactions={transactions} />
        </main>
    )
}

export default TransactionsPage;