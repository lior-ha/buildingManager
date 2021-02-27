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