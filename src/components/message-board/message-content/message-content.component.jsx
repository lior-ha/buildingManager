import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import { removeItem, updateItems } from '../../../firebase/firebase.utils';

import './message.styles.scss'

const MessageContent = ({handleClick, messageData, tenantData, user, building}) => {
    const deleteMessage = () => {
        removeItem(`buildings/${building}/message-board/`, messageData.id);
        handleClick('board');
    }

    const suspendMessage = () => {        
        if (messageData.suspended) {
            messageData = {
                ...messageData,
                suspended: false
            }
        } else {
            messageData = {
                ...messageData,
                suspended: true
            }
        }
        
        updateItems(`buildings/${building}/message-board/`, messageData.id, messageData);
        handleClick('board');
    }

    const editMessage = () => {
        console.log('Edit Message - ' + messageData.id)
    }

    let adminButtons = '';
    if (user.type === 'admin' || user.id === messageData.uid) {
        adminButtons =  <div className="adminButtons">
                            <button onClick={() => deleteMessage()} className="custom-button red">מחק</button>
                            {messageData.suspended ? 
                                <button onClick={() => suspendMessage()} className="custom-button green">שחרר השהייה</button>
                            :
                                <button onClick={() => suspendMessage()} className="custom-button red">השהה</button>
                            }
                            <button onClick={() => editMessage(messageData.id)} className="custom-button green">ערוך</button>
                        </div>
    }

    return (
        <div className={`contentBox messageBox ${messageData.suspended ? 'suspended' : ''}`}>
            <h2>{messageData.title}</h2>
            <div className="subTitle"><span>מאת:</span> <Link to={`/building/${tenantData.aptId}`}>{`${tenantData.tenantFirstName} ${tenantData.tenantLastName}`}</Link></div>
            <Moment format="DD.MM.YYYY" className="date">{messageData.createdAt}</Moment>
            <div className="content">
                {messageData.content}
            </div>
            {adminButtons}
        </div>
    )
}

export default MessageContent;