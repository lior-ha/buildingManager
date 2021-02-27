import { useState, useEffect } from 'react';

import Loading from '../UI/loader/loader.component';

import './status-box.styles.scss';

const StatusBox = props => {
    const [totalSum, setTotalSum] = useState('');

    useEffect(() => {
        const calcSum = props.payments.reduce((acc, payment) => {
            if (payment.type === 'income') {
                return acc + parseFloat(payment.sum)
            } else {
                return acc - parseFloat(payment.sum)
            }
        }, 0)
        setTotalSum(calcSum)
    }, [props.payments]);

    return (
        <div className="contentBox statusBox">
            <div className="title">מצב נוכחי</div>
            {props.loading ? 
                <Loading />
            :
                <div className={`total ${totalSum >= 0 ? 'plusSum' : 'minusSum'}`}>&#8362; {totalSum}</div>
            }
        </div>
    )
};

export default StatusBox;