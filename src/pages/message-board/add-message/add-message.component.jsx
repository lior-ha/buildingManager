import { useState, useEffect, useMemo } from 'react';

import { addItems, updateItems } from '../../../firebase/firebase.utils';

import FormBox from '../../../components/form-box/form-box.component';
import AddMessageForm from '../../../components/add-message-form/add-message-form.component';

const AddMessage = ({building, user, handleClick}) => {

    const messageDataInitiMessage = {
        title: '',
        uid: '',
        aptId: '',
        content: '',
        suspended: false,
        sticky: false,
        createdAt: '',
        lastUpdated: ''
    }
    const [ messageData, setMessageData ] = useState(messageDataInitiMessage);
    
    const [ messageId, setMessageId ] = useState('');

    const getMessageData =  data => {
        const now = new Date()
        const date = now.toISOString();
        let newDates;
        if (data.createdAt === '' ) {
            newDates =  {
                createdAt: date,
                lastUpdated: date
            }
        } else {
            newDates =  {
                lastUpdated: date
            }
        }
        
        setMessageData(prevState => ({
            ...prevState,
            ...data,
            ...newDates,
            aptId: user.apt,
            uid: user.id
        }));
    }

    useEffect(() => {
        let unsub;
        if (messageData.title !== '') {
            if (!messageId) {
                unsub = addItems(`buildings/${building}/message-board/`, messageData)
                    .then((result) => {
                        setMessageId(result);
                    });
            } 
            // else {
            //     unsub = updateItems(`buildings/${building}/message-board/`, messageId, messageData);
            // }
            
            handleClick('board');
        }        
        return unsub;
    }, [messageId, building, messageData, handleClick]) 
    
    return (
        <FormBox form={
            <AddMessageForm 
                messageData={messageData}
                getMessageData={getMessageData}
                manager={user.type}
            />} 
            
        title="הוסף הודעה ללוח המודעות"
        />
    );
}

export default AddMessage;