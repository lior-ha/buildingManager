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

// Gets building data from DB
export const getBuildingData = async (buildingId, additionalData) => {

    const buildingRef = firestore.doc(`buildings/${buildingId}`);
    const snapShot = await buildingRef.get();

    if (snapShot.exists) {
        try {
            return await snapShot.data()
        } catch(error) {
            console.log('error getting building: ', error.message)
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

// // Converts Collection to object
export const getAddress = (collections, building) => {
    const findBuilding = collections.docs.find(doc => doc.id === building);

    const addressData = () => {
        const { address } = findBuilding.data();
        return address;
    }

    return addressData();
}

export const getApartment = async (collectionKey, apartmentId) => {
    const collectionRef = firestore.collection(collectionKey);
    const docRef = collectionRef.doc(apartmentId);
    return docRef;
}

export const addApartments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const newDocRef = collectionRef.doc();
    newDocRef.set(objectsToAdd);
    return newDocRef.id;;
}

export const updateApartments = async (collectionKey, apartmentId, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const docRef = collectionRef.doc(apartmentId);
    docRef.update(objectsToAdd)
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

export const addBuildings = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const newDocRef = collectionRef.doc();
    newDocRef.set(objectsToAdd);
    return newDocRef.id;
}

export const updateBuildings = async (collectionKey, BuildingId, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const docRef = collectionRef.doc(BuildingId);
    docRef.update(objectsToAdd)
}



// PAYMENTS
export const convertPaymentsCollectionsSnapshotToMap = (paymentCollection, type) => {
    const transformedBuildingPayment = paymentCollection.docs.map(doc => {
        const {description, sum, createdAt, incomeSource} = doc.data();

        return {
            id: doc.id,
            sum,
            description,
            createdAt,
            incomeSource,
            type: type
        }
    });
    return transformedBuildingPayment;
}


export const getPayment = async (collectionKey, paymentId) => {
    const collectionRef = firestore.collection(collectionKey);
    const docRef = collectionRef.doc(paymentId);
    return docRef;
}

export const addPayments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const newDocRef = collectionRef.doc();
    newDocRef.set(objectsToAdd);
    return newDocRef.id;;
}

export const updatePayments = async (collectionKey, paymentId, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const docRef = collectionRef.doc(paymentId);
    docRef.update(objectsToAdd)
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;