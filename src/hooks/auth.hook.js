import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

export const useAuth = () => {
    const [state, setState] = useState(() => {
        const loading = true;
        const building = '';
        const user = firebase.auth().currentUser;
        return { 
            user,
            building,
            loading
        }
    });

    const building = process.env.REACT_APP_TEMP_BUILIDNG_ID; // TEMP!!!

    // AuthUser
    useEffect(() => {
        // listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                    setState({
                        id: snapShot.id,
                        building,
                        loading: false,
                        user: {
                            ...snapShot.data()
                        }
                    });
                });
            } else {
                setState({ user: null, building: '', loading: false})
            }            
        });

        // unsubscribe to the listener when unmounting
        return () => unsubscribe()
    }, [building]);
    
    return state
}