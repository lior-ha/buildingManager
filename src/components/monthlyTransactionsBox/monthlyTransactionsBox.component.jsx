import { useState } from 'react';
import Moment from 'react-moment';
import { monthName } from '../../shared/js-utils';

import './monthlyTransactionsBox.styles.scss';

const MonthlyPaymentBox = ({ apartmentData, transactions }) => {
    const monthlyPaymentList = [];
    const curYear = new Date().getFullYear();
    const [ getYear, setGetYear ] = useState(curYear);
    const [ active, setActive ] = useState(false);

    let curMonth;
    if (getYear === curYear) {
        curMonth = new Date().getMonth();
    } else if (getYear < curYear) {
        curMonth = 11; // Jan = 0
    }


    let monthlyPaymentArr = [];
    if (!apartmentData.paymentsStatus[getYear]) {
        apartmentData.paymentsStatus[getYear] = []
    }

    if (apartmentData.paymentsStatus[getYear].length === 12) {
        monthlyPaymentArr = apartmentData.paymentsStatus[getYear];
    } else {
        const months = apartmentData.paymentsStatus[getYear].length;
        const missingMonths = months ? 12-months : 12;

        apartmentData.paymentsStatus = {
            ...apartmentData.paymentsStatus,
            [curYear]: [
                ...apartmentData.paymentsStatus[curYear],
                ...Array(missingMonths).fill({
                    status: '',
                    sum: ''
                })
            ]
        };
        monthlyPaymentArr = apartmentData.paymentsStatus[getYear];
    }

    for (let i=0; i <= 11; i++) {
        let statusPos = '';
        const monthlyPayment = monthlyPaymentArr[i]
        if (curMonth >= i && monthlyPayment.status === '') {
            statusPos = 'debt'
        } else if (monthlyPayment && monthlyPayment.status === 'partial') {
            statusPos = 'partial'
        } else if (monthlyPayment && monthlyPayment.status === 'paid') {
            statusPos = 'paid'
        }

        let transactionDetails = {};
        const transactionDetailsObj = transactions.find(transaction => transaction.id === monthlyPayment.transactionId);
        if (transactionDetailsObj) {
            transactionDetails = {
                sum: transactionDetailsObj.sum,
                paymentMethod: transactionDetailsObj.paymentMethod,
                createdAt: transactionDetailsObj.createdAt
            }
        }

        monthlyPaymentList.push({
            key: i+1,
            text: monthName(parseInt(i)+1), 
            params: i+1, 
            statusPos: statusPos,
            sum: monthlyPayment.sum,
            transaction: transactionDetails
        })
    }
    
    let yearsDropDown = [];
    for (let key in apartmentData.paymentsStatus) {
        yearsDropDown.unshift(key);
    }


    const handleYearClick = e => {
        setGetYear(e.target.value);
    }

    const dropDown =    <div onClick={() => setActive(!active)} className={`dropDownWrapper ${active ? 'active' : ''}`}>
                            <ul className="yearDropDown">
                                {yearsDropDown.map(year => <li className={getYear===parseInt(year) ? 'selected' : ''} onClick={handleYearClick} key={year} value={year}>{year}</li>)}
                            </ul>
                            <i className="caretDown">&gt;</i>
                        </div>
    

    return (
        <div className="contentBox infoBox" style={{position: 'relative'}}>
            <div className="genTitle withDropDown">תשלומים - {yearsDropDown.length > 1 ? dropDown : getYear} - דירה {apartmentData.apartment}</div>
            
            <div className="transactionBox">
                {monthlyPaymentList.map((payment) => (
                    <span key={payment.key} className={`transactionItem ${payment.statusPos}`}>
                    {payment.sum && 
                        <ul className="tooltip paymentDetails paid">
                            <li>סכום: {payment.sum}/{payment.transaction.sum} &#8362;</li>
                            <li>אמצעי תשלום: {payment.transaction.paymentMethod}</li>
                            <li>תאריך תשלום: <Moment format="DD/MM/YY">{payment.transaction.createdAt}</Moment></li>
                            <li>מס קבלה: 1</li>
                        </ul>
                    }
                    {payment.text}
                    </span>
                ))}
            </div>
        </div>
    )
};

export default MonthlyPaymentBox;