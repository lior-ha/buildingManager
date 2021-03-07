import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useApartments } from '../../../../hooks/apartments.hook';
import { useTenants } from '../../../../hooks/tenants.hook';
import Loader from '../../../UI/loader/loader.component';

import './aside-tenant.styles.scss';

const AsideTenant = ({ id }) => {
    const { apartmentsLoading, apartmentData} = useApartments(id);
    const { tenantsData } = useTenants(id);
    const [ tenantsList, setTenantsList ] = useState([]);
    const [ ownersList, setOwnersList ] = useState([]);
    
    useEffect(() => {
        let unsub;
        if (tenantsData.length > 0) {
            for (let tenant of tenantsData) {
                if (tenant.tenantType === 'tenant') {
                    unsub = setTenantsList(prevState => (
                        [...prevState, tenant]
                    ));
                } else if (tenant.tenantType === 'owner') {
                    unsub = setOwnersList(prevState => (
                        [...prevState, tenant]
                    ));
                }
            };
        }

        return unsub;

    }, [tenantsData]);

    
    return (
        <div className={`asideTenants`}>
            {apartmentsLoading ? <Loader /> : 
                <Fragment>
                    <p className="apartment"><Link to={`/building/${id}`}>דירה מס' {apartmentData.apartment} - {apartmentData.apartmentName}</Link></p>
                    <div className="tenantsBox">
                        <p className="tenantsTitle">דיירים</p>
                        <ul className="tenants">
                            {tenantsList.map((tenant, i) => (
                                <li key={`t${i}`}>{tenant.tenantFirstName}</li>
                            ))}
                        </ul>
                    </div>

                
                    {ownersList.length !== 0  && 
                        <div className="tenantsBox ownersBox">
                            <p className="tenantsTitle">בעלים</p>
                            <ul className="tenants">
                                {ownersList.map((owner, i) => (
                                        <li key={`o${i}`}>{owner.tenantFirstName}</li>
                                ))}
                            </ul>
                        </div>
                    }
                </Fragment>
            }
        </div>
    )
};
    
export default AsideTenant;