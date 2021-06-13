import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { useStateWithLocalStorage } from './stateWithLocalStorage.hook';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

export const useAuth = () => {

    const [ holding, setHolding ] = useStateWithLocalStorage({localStorageKey:'currentHolding'});

    const [state, setState] = useState(() => {
        return { 
            user: {
                ...firebase.auth().currentUser,
                building: '',
            },
            building: '',
            loading: true,
            setHolding
        }
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(async snapShot => {
                    const holdings = await {...snapShot.data().holdings};
                    if (holding.building.apt) {
                        console.log('exists!');
                        setHolding({
                            building: Object.keys(holdings)[0], apt: holdings[Object.keys(holdings)[0]]
                        });
                    } else if (holding.apt === '') {
                        setHolding({
                            building: Object.keys(holdings)[0], apt: holdings[Object.keys(holdings)[0]]
                        });
                    }

                    if (holding) {
                        setState(prevState => ({
                            ...prevState,
                            building: holding.building,
                            loading: false,
                            user: {
                                ...prevState.user,
                                id: snapShot.id,
                                building: holding.building,
                                holdings,
                                apt: holding.apt,
                                type: snapShot.data().type,
                                email: snapShot.data().email,
                                buildings: [...snapShot.data().buildings]
                            }
                        }));
                    }
                });
                
                
            } else {
                setState({ user: null, building: '', loading: false })
            }            
        });

        return unsubscribe;

    }, [holding, setHolding]);
    return state
}