import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { auth } from '../../../firebase/firebase.utils';

const SignOut = () => {
    useEffect(() => {
        auth.signOut()
    });

    return <Redirect to="/" />
};

export default SignOut;