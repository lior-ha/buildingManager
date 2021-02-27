import { Fragment } from 'react';

import { useContactInfo } from '../../hooks/contact-info.hook';

import TenantsContactInfo from '../contact-info-box/contact-info-box.component';

import Loading from '../UI/loader/loader.component';

import './apartment-contacts-list.styles.scss';

const ApartmentContactsList = ({apartmentId}) => {
    const {tenantData, loading} = useContactInfo(apartmentId);
    return (
        <div>
            <div className="contacts">
                {(loading || tenantData.length===0) ? 
                    <Loading /> 
                :
                    <Fragment>
                        {tenantData.tenants || tenantData.owners ?
                            <Fragment>
                                {(tenantData.tenants.length > 0 ) && <TenantsContactInfo apartmentData={tenantData} type="tenants" />}
                                {(tenantData.owners.length > 0) && <TenantsContactInfo apartmentData={tenantData} type="owners" />}
                            </Fragment>
                        : <div className="contentBox contactInfoBox">אין פרטים</div>}
                    </Fragment>
                }
            </div>
        </div>
    )
};

export default ApartmentContactsList;