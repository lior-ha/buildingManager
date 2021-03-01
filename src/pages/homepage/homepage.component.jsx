import { usePayments } from '../../hooks/payments.hook';
import { useApartments } from '../../hooks/apartments.hook';

import AsideLastActions from '../../components/aside/aside-last-actions/aside-last-actions.component';
import StatusBox from '../../components/status-box/status-box.components';
import IncomePayments from '../../components/income-payments/income-payments.components';

const Homepage = props => {
    const {paymentLoading, payments} = usePayments();
    const {apartmentsLoading, apartmentsData} = useApartments();
    return (
        <main className="mainWrapper">        
            <section>
                <StatusBox loading={paymentLoading} payments={payments} />
                <IncomePayments loading={apartmentsLoading} apartments={apartmentsData} />
            </section>
            <AsideLastActions loading={paymentLoading} payments={payments} />
        </main>
    )
};

export default Homepage;