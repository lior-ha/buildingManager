import { Fragment } from 'react';

import { useApartments } from '../../../hooks/apartments.hook';
import { useTenants } from '../../../hooks/tenants.hook';

import AsideTenantsList from '../../../components/aside/aside-tenants-list/aside-tenants-list.component';
import ApartmentContactsList from '../../../components/apartment-contacts-list/apartment-contacts-list.component';
import MonthlyTransactionsBox from '../../../components/monthlyTransactionsBox/monthlyTransactionsBox.component';
import Loader from '../../../components/UI/loader/loader.component';

const ProfilePage = props => {
    const apartmentId = props.match.params.profileId;
    const { apartmentsData, apartmentsLoading } = useApartments();
    const { apartmentData } = useApartments(apartmentId);
    const { tenantsData, loading } = useTenants(apartmentId);

    return (
        <main className="mainWrapper biggerAside">
            <section>
                {(!apartmentData || !tenantsData) ? <Loader /> :
                    <Fragment>
                        <ApartmentContactsList loading={loading} apartmentData={apartmentData} tenantsData={tenantsData} />
                        <MonthlyTransactionsBox apartmentData={apartmentData} />
                    </Fragment>
                }
            </section>
            <AsideTenantsList loading={apartmentsLoading} apartments={apartmentsData} />
        </main>
    )
};

export default ProfilePage;