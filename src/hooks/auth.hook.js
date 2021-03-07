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
                    const holdings = {...snapShot.data().holdings}
                    let building, apt;
                    for (let i in holdings) {
                        building = i;
                        apt = holdings[i];
                    }
                    
                    setState({
                        building: building,
                        loading: false,
                        user: {
                            id: snapShot.id,
                            apt: apt,
                            buildings: [...snapShot.data().buildings],
                            ...snapShot.data()
                        }
                    });
                });
                
                
            } else {
                setState({ user: null, building: '', apt: '', loading: false})
            }            
        });

        return unsubscribe;

    }, []);
    return state
}