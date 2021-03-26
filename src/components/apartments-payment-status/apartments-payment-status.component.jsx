import { Link } from 'react-router-dom';

import Loading from '../UI/loader/loader.component';
import { checkDebt } from '../../shared/js-utils';

import './apartments-payment-status.styles.scss';

const curYear = new Date().getFullYear();

const AptsPaymentStatus = ({loading, apartments}) => {
    const apartmentsList = apartments
        .sort((a,b) => a.apartment - b.apartment)
        .map(apartment => {
            let statusClass = 'green';
            let statusPos = [];

            // Add curYear if it was't added yet (new users/new year)
            if (!apartment.paymentsStatus[curYear]) {
                apartment.paymentsStatus[curYear] = [...Array(12).fill({
                    status: '',
                    sum: ''
                })]
            }

            // Check if there's any paymentsStatus for this apt
            if (Object.keys(apartment.paymentsStatus).length === 0 || !apartment.paymentsStatus[curYear]) {
                apartment.paymentsStatus[curYear] = [];
            }

            // Check if this year exists in paymentsStatus Object fully
            // If not, add empty year (should only happen on first payment in the current year) or fill in empty months
            if (apartment.paymentsStatus[curYear] || apartment.paymentsStatus[curYear].length !== 12) {
                const missingMonths = apartment.paymentsStatus[curYear].length;
                for (let i=missingMonths; i < 12; i++) {
                    apartment.paymentsStatus[curYear].push({
                        status: '',
                        sum: ''
                    })
                }
            } 
            
            // Go through all years in paymentsStatus
            let aptTotalStatus = [];
            for (let key in apartment.paymentsStatus) {
                aptTotalStatus.push(checkDebt(parseInt(key), apartment));
                statusPos = [...new Set(aptTotalStatus)];

                if (statusPos.includes('debt')) {
                    statusClass = 'red';
                } else if (statusPos.includes('partial')) {
                    statusClass = 'blue';
                } else {
                    statusClass = 'green';
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