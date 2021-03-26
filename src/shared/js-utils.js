import moment from 'moment';
import 'moment/locale/he';

export const validCheck = (val, check) => {
    let valid = true;

    if ( !check ) return true;

    if(check.required) {
        valid = val.trim() !== '' && valid;
    } 
    
    if ( check.isNumeric ) {
        const pattern = /^\d+$/;
        valid = pattern.test( val ) && valid
    }
        
    if (check.minLength) {
        valid = val.length >= check.minLength && valid;
    }

    if ( check.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        valid = pattern.test( val ) && valid
    }

    
    return valid
}

export const monthName = (month) => {
    return moment(('0' + month).slice(-2), 'MM').format('MMMM')
}

export const getDates = (data) => {
    const date = new Date().toISOString();
    let newDates;
    if (!data.createdAt) {
        newDates =  {
            createdAt: date,
            lastUpdated: date
        }
    } else {
        newDates =  {
            createdAt: data.createdAt,
            lastUpdated: date
        }
    }

    return newDates
}


export const checkDebt = (year, apartment) => {
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth();

    const monthsArray = apartment.paymentsStatus[year].map((month, i) => {
        let status;
        if (year !== curYear) {
            status =  month.status
        } else {
            if (i <= curMonth) {
                status = month.status
            }
        }
        return status
    });

    const aptStatuses = [...new Set(monthsArray)];

    if (aptStatuses.includes('') || aptStatuses.length===0) {
        return 'debt'
    } else if (aptStatuses.includes('partial')) {
        return 'partial'
    } else {
        return 'paid'
    }
}