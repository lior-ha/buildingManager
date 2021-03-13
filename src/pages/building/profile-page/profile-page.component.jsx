import { Fragment } from 'react';

import { useTransactions } from '../../../hooks/transactions.hook';
import { useApartments } from '../../../hooks/apartments.hook';
import { useTenants } from '../../../hooks/tenants.hook';

import AsideLastActions from '../../../components/aside/aside-last-actions/aside-last-actions.component';
import ApartmentContactsList from '../../../components/apartment-contacts-list/apartment-contacts-list.component';
import MonthlyTransactionsBox from '../../../components/monthlyTransactionsBox/monthlyTransactionsBox.component';
import Loader from '../../../components/UI/loader/loader.component';

const ProfilePage = props => {
    const apartmentId = props.match.params.profileId;
    const { transactionLoading, transactions } = useTransactions();
    const { apartmentData } = useApartments(apartmentId);
    const { tenantsData, loading } = useTenants(apartmentId);

    return (
        <main className="mainWrapper">
            <section>
                {(!apartmentData || !tenantsData) ? <Loader /> :
                    <Fragment>
                        <ApartmentContactsList loading={loading} apartmentData={apartmentData} tenantsData={tenantsData} />
                        <MonthlyTransactionsBox />
                    </Fragment>
                }
            </section>
            <AsideLastActions loading={transactionLoading} transactions={transactions} />
        </main>
    )
};

export default ProfilePage;