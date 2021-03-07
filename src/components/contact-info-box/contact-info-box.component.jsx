import { Fragment } from 'react';
import Loader from '../UI/loader/loader.component';

import './contact-info-box.styles.scss';

const TenantsContactInfo = ({tenantsData, apartmentData, type}) => (
    <div className="contentBox contactInfoBox">
    { (!tenantsData) ?
        <Loader />
        :
        <Fragment>
            {type === 'tenants' ? 
                <p className="genTitle">דירה {apartmentData.apartment} - {apartmentData.apartmentName}</p>
            : 
                <p className="genTitle">בעל דירה</p>
            }
            <div className="cards">
                {tenantsData.map((tenant, idx) => (
                    <ul className="card" key={idx}>
                        <li>שם: {tenant.tenantFirstName} {tenant.tenantLastName}</li>

                        {tenant.tenantPhones.map(phone => (
                            <li key={phone}>טלפון: {phone}</li>
                        ))}

                        {tenant.tenantEmails.map(email => (
                            <li key={email}>אימייל: <a href={`mailto:${email}`} className="ltr">{email}</a></li>
                        ))}
                    </ul>
                ))}
            </div>
        </Fragment>
    }
    </div>
        
);

export default TenantsContactInfo;