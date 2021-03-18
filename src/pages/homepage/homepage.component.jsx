import { useTransactions } from '../../hooks/transactions.hook';
import { useApartments } from '../../hooks/apartments.hook';

import AsideLastActions from '../../components/aside/aside-last-actions/aside-last-actions.component';
import StatusBox from '../../components/status-box/status-box.components';
import AptsPaymentStatus from '../../components/apartments-payment-status/apartments-payment-status.component';

const Homepage = () => {
    const { transactionLoading, transactions } = useTransactions(undefined, 'createdAt', 'desc');
    const { apartmentsLoading, apartmentsData } = useApartments();
    return (
        <main className="mainWrapper">
            <section>
                <StatusBox loading={transactionLoading} transactions={transactions} />
                <AptsPaymentStatus loading={apartmentsLoading} apartments={apartmentsData} />
            </section>
            <AsideLastActions loading={transactionLoading} transactions={transactions} />
        </main>
    )
};

export default Homepage;