import { Link } from 'react-router-dom';

import './aside-tenant.styles.scss';

const AsideTenant = ({ id, apartment, apartmentName, tenants, owners}) => (
    <div className={`asideTenants`}>
        <p className="apartment"><Link to={`/building/${id}`}>דירה מס' {apartment} - {apartmentName}</Link></p>
        <div className="tenantsBox">
            <p className="tenantsTitle">דיירים</p>
            <ul className="tenants">
                {tenants.map((tenant, i) => (
                    <li key={`t${i}`}>{tenant.tenantFirstName}</li>
                ))}
            </ul>
        </div>

        { owners.length !== 0  && 
            <div className="tenantsBox ownersBox">
                <p className="tenantsTitle">בעלים</p>
                <ul className="tenants">
                    {owners.map((owner, i) => (
                            <li key={`o${i}`}>{owner.tenantFirstName}</li>
                    ))}
                </ul>
            </div>
        }
    </div>
);
    
export default AsideTenant;