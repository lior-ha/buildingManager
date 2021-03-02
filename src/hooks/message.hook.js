import { useState, useEffect } from 'react';
import { firestore, convertBuildingSnapshotToMap, convertCollectionsSnapshotToMap } from '../firebase/firebase.utils';
import { useSession } from '../context/auth.context';

export const useMessage = (messageId) => {
    const { building } = useSession();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(true);
    const [ messageData, setMessageData ] = useState([]);
    
    useEffect(() => {
        const apartmentsRef = firestore.collection(`buildings/${building}/message-board`);
        const unSubApts = apartmentsRef
                .onSnapshot(async snapshot => {
                        const apartmentsArr = await convertBuildingSnapshotToMap(snapshot, messageId);
                        // const contactInfoArr = apartmentsArr.filter( apartment => {
                        //     return apartment.id === messageId
                        // });
                        setMessageData({...apartmentsArr});
                        setLoading(false);
                    }, err => { setError(err) }
                );
            return unSubApts;
    }, [building, messageId]);

    return {
        messageData,
        loading,
        error
    }
}

export const useMessages = () => {
    const { building } = useSession();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(true);
    const [ messagesData, setMessagesData ] = useState([]);

    useEffect(() => {
        const messagesArr = firestore.collection(`buildings/${building}/message-board`);
        
        const unSubMsgs = messagesArr
                .onSnapshot(async snapshot => {
                        const messagesArr = await convertCollectionsSnapshotToMap(snapshot, building);
                        setMessagesData([...messagesArr]);
                        setLoading(false);
                    }, err => { setError(err) }
                );
            return unSubMsgs;
    }, [building]);

    return {
        messagesData,
        loading,
        error
    }
};