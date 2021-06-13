import { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase.utils';

export const useAddresses = (userHoldings) => {
    const [ addressData, setAddressData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    
    useEffect(() => {
        setAddressData([]);
        const unsub = () => {
            for (const key in userHoldings) {
                let aptNum;

                firestore.collection(`buildings/${key}/apartments`).doc(userHoldings[key]).get()                    
                    .then((apartmentNum) => {
                        aptNum = apartmentNum.data().apartment;
                    })
                    
                    .then (() => {
                        firestore.collection(`buildings`).doc(key).get()                            
                            .then((address) => {
                                return address.data();
                            })
                            .then((addressSnapshot) => {
                                setAddressData(prevAddress => ([
                                    ...prevAddress,
                                    {
                                        ...addressSnapshot.address,
                                        building: key,
                                        apt: userHoldings[key],
                                        aptNum
                                    },
                                    
                                ]));
                            })
                    });
                }}
            
        setIsLoading(false);
        
        return unsub();
            
    }, [userHoldings]);

    return {
        addressData,
        isLoading
    }
    
}