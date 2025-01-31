import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    // Checks if user exists, if not, adds user to db
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user: ', error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

// Gets user data from DB
export const getUserData = async (userId) => {
    const userRef = firestore.doc(`users/${userId}`);
    const snapShot = await userRef.get();
    console.log(snapShot.data());
    if (snapShot.exists) {
        try {
            return await snapShot.data();
        } catch (error) {
            console.log('error getting document', error.message)
        }
    } else {
        console.log("No such document!");
    }
}


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

// Converts Building to object
export const convertBuildingSnapshotToMap = (collections, objectId) => {
    const findBuilding = collections.docs.find(doc => doc.id === objectId);
    const transformedBuilding = () => {
        if(findBuilding){
        const obj = findBuilding.data();
            return {
                id: objectId,
                ...obj
            };
        }
    }

    return transformedBuilding();
}

// Converts Collection to object
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const obj = doc.data();
        return {
            id: doc.id,
            ...obj
        }
    });
    return transformedCollection;
}

// Get Building Data
export const getBuildingData = (collections, building) => {
    const findBuilding = collections.docs.find(doc => doc.id === building);

    const getData = () => {
        const buildingData = findBuilding.data();
        return buildingData;
    }
    return getData();
}

// Get Apartment
export const getApartment = (collections, apartment) => {
    const findApartment = collections.docs.find(doc => doc.id === apartment);

    const apartmentData = () => {
        const aptData = findApartment.data();
        return aptData;
    }

    return apartmentData();
}

// Get Create Date
export const getCreatedAt = (collections, building) => {
    const findBuilding = collections.docs.find(doc => doc.id === building);

    const createdAtData = () => {
        const { createdAt } = findBuilding.data();
        return createdAt;
    }

    return createdAtData();
}

// Converts Collection to object
export const convertUserCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const obj = doc.data();
        return {
            id: doc.id,
            ...obj
        }
    });
    return transformedCollection;
}

// export const getItem = (docKey) => {
//     const findItem = docKey.find(doc => doc.id === id);

//     const getData = () => {
//         const itemData = findItem.data();
//         return itemData;
//     }
//     return getData();
    
// }

export const addItems = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const newDocRef = collectionRef.doc();
    await newDocRef.set(objectsToAdd);
    return newDocRef.id;
}

export const updateItems = async (collectionKey, id, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const docRef = collectionRef.doc(id);
    docRef.update(objectsToAdd)
}

export const updateProperty = async (collectionKey, id, property) => {
    const collectionRef = firestore.collection(collectionKey);
    const docRef = collectionRef.doc(id);
    docRef.update(Object.assign({}, property))
}

export const removeItem = async (collectionKey, id, redirect) => {
    const collectionRef = firestore.collection(collectionKey);
    const docRef = collectionRef.doc(id);
    docRef.delete()
        .then(() => {
            return
        })
        .catch((error) => {
            console.error("Error while deleting item: ", error);
        });
}


// BUILDINGS

// export const getBuilding = async (collectionKey, BuildingId) => {
//     const collectionRef = firestore.collection(collectionKey);
//     const docRef = collectionRef.doc(BuildingId);
//     return docRef;
// }

// export const getBuilding = async (collections, id) => {
//     console.log(collections.docs, id)
//     const findUserId = collections.docs.find(doc => doc.id === id);
//     const buildingId = () => {
//         const { building } = findUserId.data();
//         return building;
//     }

//     return buildingId();
// }


// TRANSACTIONS
export const convertTransactionsCollectionsSnapshotToMap = (transactionCollection) => {
    const transformedBuildingTransaction = transactionCollection.docs.map(doc => {
        const {apt, description, sum, month, createdAt, incomeSource, other, type} = doc.data();

        return {
            id: doc.id,
            apt,
            sum,
            month,
            description,
            createdAt,
            incomeSource,
            other,
            type
        }
    });
    return transformedBuildingTransaction;
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;