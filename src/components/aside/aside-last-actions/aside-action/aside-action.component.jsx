import Moment from 'react-moment';
import { monthName } from '../../../../shared/js-utils';

import './aside-action.styles.scss';

const AsideAction = ({type, createdAt, sum, description, incomeSource, apt, month, other}) => {
    let monthText = '';
    
    if (incomeSource === 'buildingPayment'){
        monthText = ` - ${monthName(parseInt(month)+1)}`
    }
    return (    
        <div className={`asideAction ${type}`}>
            <p className="line">
                {description}{monthText}
                <span className="date"><Moment format="YYYY MM DD">{createdAt}</Moment></span>
            </p>
            <p className="line">
                <span className="sum">&#8362; {type === 'expense' ? '-' : '+'}{sum}</span> 
                {incomeSource === 'buildingPayment' && <span className="incSrc">{apt}</span>}
                {incomeSource === 'other' && <span className="incSrc">{other}</span>}
            </p>
        </div>
    )
};
    
export default AsideAction;