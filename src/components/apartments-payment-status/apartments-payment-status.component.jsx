import { Link } from 'react-router-dom';

import Loading from '../UI/loader/loader.component';

import './apartments-payment-status.styles.scss';

const AptsPaymentStatus = ({loading, apartments}) => {

    return (
        <div className="aptsPaymentStatus">
            { loading ? 
                <Loading /> 
            : 
                <div className="contentBox linkListBox">
                    {apartments
                        .sort((a,b) => a.apartment - b.apartment)
                        .map(apartment => {
                        //apartment.paymentStatus.
                        return (
                            <Link key={apartment.id} to={`building/${apartment.id}`} className={`custom-button`}>דירה {apartment.apartment} - {apartment.apartmentName}</Link>
                        )
                    })}
                </div>
            }
        </div>
    )
};

export default AptsPaymentStatus;