import Moment from 'react-moment';

import './aside-action.styles.scss';

const AsideAction = ({type, createdAt, sum, description, incomeSource}) => (
    <div className={`asideAction ${type}`}>
        <p className="line">{description} <span className="date"><Moment format="YYYY MM DD">{createdAt}</Moment></span></p>
        <p className="line"><span className="sum">&#8362;	{type === 'expense' ? '-' : '+'}{sum}</span> {incomeSource !== '' ? <span className="incSrc">{incomeSource}</span> : null}</p>
    </div>
);
    
export default AsideAction;