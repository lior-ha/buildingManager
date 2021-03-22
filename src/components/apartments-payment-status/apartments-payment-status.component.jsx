import { Link } from 'react-router-dom';

import Loading from '../UI/loader/loader.component';

import './apartments-payment-status.styles.scss';

const curYear = new Date().getFullYear();
const curMonth = new Date().getMonth();

const AptsPaymentStatus = ({loading, apartments}) => {
    const apartmentsList = apartments
        .sort((a,b) => a.apartment - b.apartment)
        .map(apartment => {
            let statusClass = 'green';
            let statusPos = '';

            // Add curYear if it was't added yet (new users/new year)
            if (!apartment.paymentsStatus[curYear]) {
                apartment.paymentsStatus[curYear] = [...Array(12).fill('')]
            }
            
            // Go through all years in paymentsStatus
            for (let key in apartment.paymentsStatus) {
                if (curYear !== parseInt(key)){
                    // Go through the array on current year
                    statusPos = apartment.paymentsStatus[key].find(debt => debt !== 'paid');

                } else if (curYear === parseInt(key)) {
                    // Go through the array on previous years
                    statusPos = apartment.paymentsStatus[key].find((debt, i) => {
                        let result;
                        if (i <= curMonth) {
                            result = debt !== 'paid';
                        }
                        return result
                    })
                }

                if (statusPos !== undefined) {
                    statusClass = 'red';
                }
            }
            return (
                <Link key={apartment.id} id={apartment.aparment} to={`building/${apartment.id}`} className={`custom-button ${statusClass}`}>דירה {apartment.apartment} - {apartment.apartmentName}</Link>
            )
        }
    )
    
    return (
        <div className="aptsPaymentStatus">
            { loading ? 
                <Loading /> 
            : 
                <div className="contentBox linkListBox">
                    {apartmentsList}
                </div>
            }
        </div>
    )
};

export default AptsPaymentStatus;