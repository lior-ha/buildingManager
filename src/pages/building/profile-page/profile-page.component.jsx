import { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { usePayments } from '../../../hooks/payments.hook';
import { useApartments } from '../../../hooks/apartments.hook';
import { useTenants } from '../../../hooks/tenants.hook';

import AsideLastActions from '../../../components/aside/aside-last-actions/aside-last-actions.component';
import ApartmentContactsList from '../../../components/apartment-contacts-list/apartment-contacts-list.component';
import MonthlyPaymentBox from '../../../components/monthlyPaymentBox/monthlyPaymentBox.component';
import Loader from '../../../components/UI/loader/loader.component';

const ProfilePage = props => {
    const apartmentId = props.match.params.profileId;
    const {paymentLoading, payments} = usePayments();
    const { apartmentData } = useApartments(apartmentId);
    const { tenantsData, loading } = useTenants(apartmentId);

    return (
        <main className="mainWrapper">
            <section>
                {(!apartmentData || !tenantsData) ? <Loader /> :
                    <Fragment>
                        <ApartmentContactsList loading={loading} apartmentData={apartmentData} tenantsData={tenantsData} />
                        <MonthlyPaymentBox />
                    </Fragment>
                }
            </section>
            <AsideLastActions loading={paymentLoading} payments={payments} />
        </main>
    )
};

export default withRouter(ProfilePage);