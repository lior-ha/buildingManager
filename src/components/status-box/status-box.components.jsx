import { useState, useEffect } from 'react';

import Loading from '../UI/loader/loader.component';

import './status-box.styles.scss';

const StatusBox = props => {
    const [totalSum, setTotalSum] = useState('');

    useEffect(() => {
        if (props.transactions) {
            const calcSum = props.transactions.reduce((acc, transaction) => {
                if (transaction.type === 'income') {
                    return acc + parseFloat(transaction.sum)
                } else {
                    return acc - parseFloat(transaction.sum)
                }
            }, 0)
            setTotalSum(calcSum)
        } else {
            setTotalSum(0)
        }
    }, [props.transactions]);

    return (
        <div className="contentBox statusBox">
            <div className="title">מצב חשבון נוכחי של הבניין</div>
            {props.loading ? 
                <Loading />
            :
                <div className={`total ${totalSum >= 0 ? 'plusSum' : 'minusSum'}`}>&#8362; {totalSum}</div>
            }
        </div>
    )
};

export default StatusBox;