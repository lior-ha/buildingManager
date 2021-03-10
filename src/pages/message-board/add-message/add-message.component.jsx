//import { useState } from 'react';

import { addItems } from '../../../firebase/firebase.utils';

import FormBox from '../../../components/form-box/form-box.component';
import AddMessageForm from '../../../components/add-message-form/add-message-form.component';

const AddMessage = ({building, user, handleClick, setMesssageData}) => {
    const messageData = {
        title: '',
        uid: '',
        aptId: '',
        content: '',
        suspended: false,
        sticky: false,
        createdAt: '',
        lastUpdated: ''
    }

    const getMessageData = data => {
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

        addItems(`buildings/${building}/message-board/`, {
            ...data,
            ...newDates,
            aptId: user.apt,
            uid: user.id
        });

        handleClick('board');
    }
    
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

// AddMessage.displayName = 'AddMessage'
// AddMessage.whyDidYouRender = {
//     logOnDifferentValues: true,
// };
export default AddMessage;