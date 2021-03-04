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

    // AuthUser
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                    setState({
                        id: snapShot.id,
                        building: snapShot.data().buildings.find(() => !false),
                        loading: false,
                        user: {
                            buildings: [...snapShot.data().buildings],
                            ...snapShot.data()
                        }
                    });
                });
                
                
            } else {
                setState({ user: null, building: '', loading: false})
            }            
        });

        return unsubscribe;

    }, []);
    return state
}