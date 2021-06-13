import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { auth } from '../../../firebase/firebase.utils';
import { useStateWithLocalStorage } from '../../../hooks/stateWithLocalStorage.hook';

const SignOut = () => {
    const [ , , clearCookie, setClearCookie ] = useStateWithLocalStorage({localStorageKey:'currentHolding'});
    console.log('signout')
    useEffect(() => {
        setClearCookie(true);
        auth.signOut();
        console.log(clearCookie)
    }, [clearCookie, setClearCookie]);

    return <Redirect to="/" />
};

export default SignOut;