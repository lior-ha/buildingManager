import { withRouter } from 'react-router-dom';

import { usePayments } from '../../hooks/payments.hook';

import AsideLastActions from '../../components/aside/aside-last-actions/aside-last-actions.component';
import ApartmentContactsList from '../../components/apartment-contacts-list/apartment-contacts-list.component';
import MonthlyPaymentBox from '../../components/monthlyPaymentBox/monthlyPaymentBox.component';

const ProfilePage = props => {
    const {paymentLoading, payments} = usePayments();
    return (
        <main className="mainWrapper">
            <section>
                <ApartmentContactsList apartmentId={props.match.params.profileId} />
                <MonthlyPaymentBox />
            </section>
            <AsideLastActions loading={paymentLoading} payments={payments} />
        </main>
    )
};

export default withRouter(ProfilePage);