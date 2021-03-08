import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';

import { removeItem, updateItems } from '../../../firebase/firebase.utils';

import './message.styles.scss'

const MessageContent = (props) => {
    
    const deleteMessage = () => {
        removeItem(`buildings/${props.building}/message-board/`, props.messageData.id);
        props.handleClick('board');
    }

    const suspendMessage = () => {
        let messageData = {};
        
        if (props.messageData.suspended) {
            messageData = {
                ...props.messageData,
                suspended: false
            }
        } else {
            messageData = {
                ...props.messageData,
                suspended: true
            }
        }
        
        updateItems(`buildings/${props.building}/message-board/`, props.messageData.id, messageData);
    }

    const editMessage = () => {
        console.log('Edit Message - ' + props.messageData.id)
    }

    let adminButtons = '';
    if (props.user.type === 'admin' || props.user.id === props.messageData.uid) {
        adminButtons =  <div className="adminButtons">
                            <button onClick={() => deleteMessage()} className="custom-button red">מחק</button>
                            {props.messageData.suspended ? 
                                <button onClick={() => suspendMessage()} className="custom-button green">שחרר השהייה</button>
                            :
                                <button onClick={() => suspendMessage()} className="custom-button red">השהה</button>
                            }
                            <button onClick={() => editMessage(props.messageData.id)} className="custom-button">ערוך</button>
                        </div>
    }

    return (
        <div className={`contentBox messageBox ${props.messageData.suspended ? 'suspended' : ''}`}>
            <h2>{props.messageData.title}</h2>
            <div className="subTitle"><span>מאת:</span> <Link to={`/building/${props.tenantData.aptId}`}>{`${props.tenantData.tenantFirstName} ${props.tenantData.tenantLastName}`}</Link></div>
            <Moment format="DD.MM.YYYY" className="date">{props.messageData.createdAt}</Moment>
            <div className="content">
                {props.messageData.content}
            </div>
            {adminButtons}
        </div>
    )
}

export default withRouter(MessageContent);