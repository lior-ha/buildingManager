import { useApartments } from '../../../hooks/apartments.hook';
import AsideWrapper from '../aside-wrapper/aside-wrapper.component';
import AsideTenant from './aside-tenant/aside-tenant.component';

import Loading from '../../UI/loader/loader.component';

const sortApts = (aptA, aptB) => {
    return aptA.apartment - aptB.apartment;
}

const AsideTenantsList = ({ building }) => {
    const {apartmentsLoading, apartmentsData} = useApartments();
    return (
        <AsideWrapper extraClasses="lastTenants" title="דיירים">
        {apartmentsData.length===0 ? 
            <div>לא הוזנו דירות</div>        
        :
            apartmentsLoading ?
                <Loading />
            :
                apartmentsData
                .sort(sortApts)
                .map(({id, ...otherProps }) => (                    
                    <AsideTenant key={id} id={id} {...otherProps} />
                ))
        }
        </AsideWrapper>
)};

export default AsideTenantsList;