import moment from 'moment';
import 'moment/locale/he';
import { useState } from 'react';

import './monthlyTransactionsBox.styles.scss';

const MonthlyPaymentBox = ({ apartmentData }) => {
    
    const monthlyPaymentList = [];
    const curYear = moment(new Date()).year();
    const [ getYear, setGetYear ] = useState(curYear);

    let curMonth;
    if (getYear === curYear) {
        curMonth = new Date().getMonth();
    } else if (getYear < curYear) {
        curMonth = 11; // Jan = 0
    }

    let monthlyPaymentArr = [];
    if (apartmentData.paymentsStatus[getYear]) {
        monthlyPaymentArr = apartmentData.paymentsStatus[getYear];
    } else {
        apartmentData.paymentsStatus = {
            ...apartmentData.paymentsStatus,
            [curYear]: [...Array(12).fill('')]
        };
        monthlyPaymentArr = apartmentData.paymentsStatus[getYear];
    }

    for (let i=0; i <= 11; i++) {
        let status = '';
        
        if (curMonth >= i && monthlyPaymentArr[i] === '') {
            status = 'debt'
        } else {
            status = monthlyPaymentArr[i]
        }

        monthlyPaymentList.push({
            key: i+1,
            text: moment(('0' + parseInt(i+1)).slice(-2), 'MM').format('MMMM'), 
            params: i+1, 
            status: status
        })
    }

    let yearsDropDown = [];
    for (let key in apartmentData.paymentsStatus) {
        yearsDropDown.unshift(key);
    }

    const [ active, setActive ] = useState(false)

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
            <div className="genTitle withDropDown">תשלומים - {yearsDropDown.length > 1 ? dropDown : getYear}</div>
            <div className="paymentDetails paid">
                <p>סכום: 225 &#8362;</p>
                <p>אמצעי תשלום: מזומן</p>
                <p>תאריך תשלום: 01.10.20</p>
            </div>
            <div className="transactionBox">
                {monthlyPaymentList.map(payment => (
                    <span key={payment.key} className={`transactionItem ${payment.status}`}>{payment.text}</span>
                ))}
            </div>
        </div>
    )
};

export default MonthlyPaymentBox;