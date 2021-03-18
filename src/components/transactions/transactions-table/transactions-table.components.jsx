import { Fragment } from 'react';
import Moment from 'react-moment';
import './transactions-table.styles.scss';
import { monthName } from '../../../shared/js-utils';

const TransactionsTable = props => (
    <div className="contentBox statusBox">
        <div className="transactionsTable">
            <div className="tableTitle">תיאור</div>
            <div className="tableTitle">תאריך</div>
            <div className="tableTitle">סכום</div>

            {props.transactions.map(transaction => (
                <Fragment key={transaction.id}>
                    <div className="tableCell">{transaction.description}{transaction.incomeSource && transaction.incomeSource !== 'other' && ` ${monthName(parseInt(transaction.month) + 1)} - ${transaction.apt}`}{transaction.other && `- ${transaction.other}`}</div>
                    <div className="tableCell"><Moment format="YYYY MM DD">{transaction.createdAt}</Moment></div>
                    <div className={`tableCell ${transaction.type === 'income' ? 'income' : 'expense'}`}><span className="sum">{transaction.sum}{transaction.type === 'expense' ? '-' : '+'} &#8362;</span></div>
                </Fragment>
            ))}
        </div>
    </div>
)

export default TransactionsTable
