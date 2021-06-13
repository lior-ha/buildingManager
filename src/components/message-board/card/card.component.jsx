import { Fragment } from 'react';
import { useTenants } from '../../../hooks/tenants.hook';

import './card.styles.scss'

const Card = ({data, handleClick}) => {
    const {tenantsData, loading} = useTenants(undefined, data.aptId);
    return (
        <Fragment>
            {loading ? '' : 
                <article onClick={() => handleClick('messagePage', data, tenantsData, data.aptId)}  
                    className={`card ${data.sticky ? 'priority' : ''} ${data.suspended ? 'suspended' : ''}`}>
                    <h3>{data.title}</h3>
                    מאת: {`${tenantsData.tenantFirstName} ${tenantsData.tenantLastName}`}
                </article>
            }
        </Fragment>
        
    )
}

export default Card; 