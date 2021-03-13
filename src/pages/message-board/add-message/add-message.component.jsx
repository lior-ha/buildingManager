import { addItems } from '../../../firebase/firebase.utils';
import { getDates } from '../../../shared/js-utils';

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
        const newDates = getDates(data);

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