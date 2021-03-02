import { withRouter } from 'react-router-dom';

import { usePayments } from '../../../hooks/payments.hook';
import { useContactInfo } from '../../../hooks/contact-info.hook';

import AsideLastActions from '../../../components/aside/aside-last-actions/aside-last-actions.component';
import ApartmentContactsList from '../../../components/apartment-contacts-list/apartment-contacts-list.component';
import MonthlyPaymentBox from '../../../components/monthlyPaymentBox/monthlyPaymentBox.component';

const ProfilePage = props => {
    const {paymentLoading, payments} = usePayments();
    const {tenantData, loading} = useContactInfo(props.match.params.profileId);

    return (
        <main className="mainWrapper">
            <section>
                <ApartmentContactsList loading={loading} tenantData={tenantData} />
                <MonthlyPaymentBox />
            </section>
            <AsideLastActions loading={paymentLoading} payments={payments} />
        </main>
    )
};

export default withRouter(ProfilePage);