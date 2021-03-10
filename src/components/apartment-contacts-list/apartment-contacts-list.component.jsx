import { Fragment, useState, useEffect } from 'react';

import TenantsContactInfo from '../contact-info-box/contact-info-box.component';

import Loading from '../UI/loader/loader.component';

import './apartment-contacts-list.styles.scss';

const ApartmentContactsList = ({tenantsData, loading, apartmentData}) => {
    const [ tenantsList, setTenantsList ] = useState([]);
    const [ ownersList, setOwnersList ] = useState([]);

    useEffect(() => {
        setTenantsList([]);
        setOwnersList([]);
    }, [tenantsData]);

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
        <div>
            <div className="contacts">
                {(loading || tenantsList.length===0) ? 
                    <Loading /> 
                :
                    <Fragment>
                        {tenantsList || ownersList ?
                            <Fragment>
                                {(tenantsList.length > 0 ) && <TenantsContactInfo apartmentData={apartmentData} tenantsData={tenantsList} type="tenants" />}
                                {(ownersList.length > 0) && <TenantsContactInfo apartmentData={apartmentData} tenantsData={ownersList} type="owners" />}
                            </Fragment>
                        : <div className="contentBox contactInfoBox">אין פרטים</div>}
                    </Fragment>
                }
            </div>
        </div>
    )
};

export default ApartmentContactsList;