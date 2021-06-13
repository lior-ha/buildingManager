import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTenants } from '../../../../hooks/tenants.hook';

import './aside-tenant.styles.scss';

const AsideTenant = (props) => {
    console.log(props)
    const { tenantsData } = useTenants(props.id);
    const [ tenantsList, setTenantsList ] = useState([]);
    const [ ownersList, setOwnersList ] = useState([]);
    
    const stopProp = e => {
        e.stopPropagation();
    }
    
    useEffect(() => {
        console.log(tenantsData)
        let unsub;
        if (tenantsData.length > 0) {
            const tenantsArr = [];
            const ownersArr = [];
            for (let tenant of tenantsData) {
                console.log(tenant.tenantFirstName);
                if (tenant.tenantType === 'tenant') {
                    tenantsArr.push(tenant);
                } else if (tenant.tenantType === 'owner') {
                    ownersArr.push(tenant);
                }
            };
            setTenantsList(tenantsArr)
            setOwnersList(ownersArr)
        }

        return unsub;

    }, [tenantsData]);

    
    return (
        <div className={`asideTenants ${props.showTenant ? 'open' : ''}`} onClick={props.onClick}>
            <p className="apartment"><i className="toggleApartment"></i> דירה מס' {props.apartment} - {props.apartmentName}</p>
            <div className="details">
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
            </div>
            <Link onClick={stopProp} to={`/building/${props.id}`} className="moreDetails">לפרטים מלאים</Link>
        </div>
    )
};
    
export default AsideTenant;