import { useState, useCallback, useEffect } from 'react';

import { useSession } from '../../../context/auth.context';

import AsideTenant from './aside-tenant/aside-tenant.component';

import Loader from '../../UI/loader/loader.component';

const sortApts = (aptA, aptB) => {
    return aptA.apartment - aptB.apartment;
}

const AsideTenantsList = ({loading}) => {
    const { apartmentsData } = useSession();

    const [ tenants, setTenants ] = useState([])
    const [ showTenant, setShowTenant ] = useState(false);

    useEffect(() => {
        setTenants(() => apartmentsData.length ? apartmentsData : [apartmentsData])
    }, [apartmentsData])

    const clickHandler = useCallback(id => {
        setShowTenant(prev => {
            if (id === prev) {
                return '';
            } else {
                return id;
            }
        })
    }, []);

    
    return (
        <>
            {loading ?
                <Loader />
            :

            apartmentsData.length===0 ? 
                    <div>לא הוזנו דירות</div>
                :
                
                tenants
                        .sort(sortApts)
                        .map(({id, ...otherProps }) => (                    
                            <AsideTenant key={id} id={id} showTenant={id === showTenant} onClick={() => clickHandler(id)} {...otherProps} />
                        ))
            }
        </>
)};

export default AsideTenantsList;