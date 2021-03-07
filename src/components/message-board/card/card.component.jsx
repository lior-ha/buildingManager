import { Fragment } from 'react';
import { useTenant } from '../../../hooks/tenants.hook';
import Loader from '../../UI/loader/loader.component';

import './card.styles.scss'

const Card = ({data, handleClick}) => {
    let { tenantData } = useTenant(data.aptId, data.uid);
    
    return (
        <Fragment>
            {!tenantData ? <Loader /> : 
                <div onClick={() => handleClick('messagePage', data, tenantData, data.aptId)}  className={`card ${data.sticky ? 'priority' : ''}`}>
                    <h3>{data.title}</h3>
                    מאת: {`${tenantData.tenantFirstName} ${tenantData.tenantLastName}`}
                </div>
            }
        </Fragment>
    )
}
export default Card; 