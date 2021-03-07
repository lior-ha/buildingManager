import AsideWrapper from '../aside-wrapper/aside-wrapper.component';
import AsideTenant from './aside-tenant/aside-tenant.component';

import Loading from '../../UI/loader/loader.component';

const sortApts = (aptA, aptB) => {
    return aptA.apartment - aptB.apartment;
}

const AsideTenantsList = ({ loading, apartments }) => {
    return (
        <AsideWrapper extraClasses="lastTenants" title="דירות">
        {loading ?
            <Loading />
        :

            apartments.length===0 ? 
                <div>לא הוזנו דירות</div>
            :
            
                apartments
                .sort(sortApts)
                .map(({id, ...otherProps }) => (                    
                    <AsideTenant key={id} id={id} {...otherProps} />
                ))
        }
        </AsideWrapper>
)};

export default AsideTenantsList;