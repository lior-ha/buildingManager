import { useTransactions } from '../../hooks/transactions.hook';
import { useApartments } from '../../hooks/apartments.hook';

import AsideLastActions from '../../components/aside/aside-last-actions/aside-last-actions.component';
import StatusBox from '../../components/status-box/status-box.components';
import IncomeTransactions from '../../components/income-transactions/income-transactions.component';

const Homepage = () => {
    const { transactionLoading, transactions } = useTransactions(undefined, 'createdAt', 'desc');
    const { apartmentsLoading, apartmentsData } = useApartments();
    return (
        <main className="mainWrapper">
            <section>
                <StatusBox loading={transactionLoading} transactions={transactions} />
                <IncomeTransactions loading={apartmentsLoading} apartments={apartmentsData} />
            </section>
            <AsideLastActions loading={transactionLoading} transactions={transactions} />
        </main>
    )
};

export default Homepage;