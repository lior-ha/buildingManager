import { useState } from 'react';
import { monthName } from '../../shared/js-utils';

import './monthlyTransactionsBox.styles.scss';

const MonthlyPaymentBox = ({ apartmentData }) => {
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

        monthlyPaymentList.push({
            key: i+1,
            text: monthName(parseInt(i)+1), 
            params: i+1, 
            statusPos: statusPos
        })
    }

    let yearsDropDown = [];
    for (let key in apartmentData.paymentsStatus) {
        yearsDropDown.unshift(key);
    }


    const handleYearClick = e => {
        setGetYear(e.target.value);
    }
    
    // const handleHover = payment => {
    //     console.log(apartmentData);
    //     <div className="paymentDetails paid">
    //         <p>סכום: 225 &#8362;</p>
    //         <p>אמצעי תשלום: מזומן</p>
    //         <p>תאריך תשלום: 01.10.20</p>
    //     </div>
    // }

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
                    <span key={payment.key} className={`transactionItem ${payment.statusPos}`}>{payment.text}</span>
                ))}
            </div>
        </div>
    )
};

export default MonthlyPaymentBox;