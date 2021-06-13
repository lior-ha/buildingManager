import { useState, useEffect } from 'react';

const initialValue = JSON.parse(localStorage.getItem('currentHolding')) || {building: '', apt: ''};

export const useStateWithLocalStorage = () => { // Setting Active Holding

    const [holding, setHolding] = useState(initialValue);
    const [ clearCookie, setClearCookie ] = useState(false);

    useEffect(() => {
        if ((!clearCookie && initialValue.building && holding.building !== initialValue.building && holding.building) || !initialValue.building) {
            if (holding.building) {
                localStorage.setItem('currentHolding', JSON.stringify(holding));
            } else {
                localStorage.setItem('currentHolding', JSON.stringify(initialValue));
            }
        }

        console.log(clearCookie, 'currentHolding')
        
        if (clearCookie) {
            console.log('clear!!!')
            localStorage.removeItem('currentHolding');
            setClearCookie(false);
        }
    }, [holding, clearCookie]);
    
    return [holding, setHolding, clearCookie, setClearCookie];
};
