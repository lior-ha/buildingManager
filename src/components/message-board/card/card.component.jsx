import { Fragment } from 'react';
import { useTenants } from '../../../hooks/tenants.hook';

import './card.styles.scss'

const Card = ({data, handleClick}) => {
    const {tenantData, loading} = useTenants(undefined, data.aptId);
console.log(tenantData)
    return (
        <Fragment>
            {loading ? '' : 
                <article onClick={() => handleClick('messagePage', data, tenantData, data.aptId)}  
                    className={`card ${data.sticky ? 'priority' : ''} ${data.suspended ? 'suspended' : ''}`}>
                    <h3>{data.title}</h3>
                    מאת: {`${tenantData.tenantFirstName} ${tenantData.tenantLastName}`}
                </article>
            }
        </Fragment>
    )
}

// Card.displayName = 'Board'
// Card.whyDidYouRender = {
//     logOnDifferentValues: true,
// };
export default Card; 