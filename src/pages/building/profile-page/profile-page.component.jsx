import { useSession } from '../../../context/auth.context';
import { useApartments } from '../../../hooks/apartments.hook';
import { useTenants } from '../../../hooks/tenants.hook';
import { useTransactions } from '../../../hooks/transactions.hook';

import ApartmentContactsList from '../../../components/apartment-contacts-list/apartment-contacts-list.component';
import MonthlyTransactionsBox from '../../../components/monthlyTransactionsBox/monthlyTransactionsBox.component';
import Loader from '../../../components/UI/loader/loader.component';

const ProfilePage = props => {
    const apartmentId = props.match.params.profileId;
    const { building } = useSession();
    const { transactions } = useTransactions(undefined, 'createdAt', 'desc', building);
    const { apartmentData } = useApartments(building, apartmentId);
    const { tenantsData, loading } = useTenants(apartmentId);
    
    return (
        <section>
            {(!apartmentData || !tenantsData) ? <Loader /> :
                <>
                    <ApartmentContactsList loading={loading} apartmentData={apartmentData} tenantsData={tenantsData} />
                    <MonthlyTransactionsBox apartmentData={apartmentData} transactions={transactions} />
                </>
            }
        </section>
    )
};

export default ProfilePage;