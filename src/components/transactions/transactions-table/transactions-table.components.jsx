import { Fragment } from 'react';
import Moment from 'react-moment';
import './transactions-table.styles.scss';

const TransactionsTable = props => {
    return (
        <div className="contentBox statusBox">
            <div className="transactionsTable">
                <div className="tableTitle">תיאור</div>
                <div className="tableTitle">תאריך</div>
                <div className="tableTitle">סכום</div>

                {props.transactions.map(transaction => (
                    <Fragment key={transaction.id}>
                        <div className="tableCell">{transaction.description}{transaction.incomeSource && transaction.incomeSource !== 'other' && `- ${transaction.incomeSource}`}{transaction.other && `- ${transaction.other}`}</div>
                        <div className="tableCell"><Moment format="YYYY MM DD">{transaction.createdAt}</Moment></div>
                        <div className={`tableCell ${transaction.type === 'income' ? 'income' : 'expense'}`}><span className="sum">{transaction.sum}{transaction.type === 'expense' ? '-' : '+'} &#8362;</span></div>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default TransactionsTable
