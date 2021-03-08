import { Fragment } from 'react';
import { useTenant } from '../../../hooks/tenants.hook';
import Loader from '../../UI/loader/loader.component';

import './card.styles.scss'

const Card = ({data, handleClick}) => {
    const {tenantData, loading} = useTenant(data.aptId, data.uid);

    return (
        <Fragment>
            {loading ? '' : 
                <div onClick={() => handleClick('messagePage', data, tenantData, data.aptId)}  
                    className={`card ${data.sticky ? 'priority' : ''} ${data.suspended ? 'suspended' : ''}`}>
                    <h3>{data.title}</h3>
                    מאת: {`${tenantData.tenantFirstName} ${tenantData.tenantLastName}`}
                </div>
            }
        </Fragment>
    )
}
export default Card; 