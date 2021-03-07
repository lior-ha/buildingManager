import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import './message.styles.scss'

const MessageContent = ({messageData, tenantData}) => (

    <div className="contentBox messageBox">
        <h2>{messageData.title}</h2>
        <div className="subTitle"><span>מאת:</span> <Link to={`/building/${tenantData.aptId}`}>{`${tenantData.tenantFirstName} ${tenantData.tenantLastName}`}</Link></div>
        <Moment format="DD.MM.YYYY" className="date">{messageData.createdAt}</Moment>
        <div className="content">
            {messageData.content}
        </div>
    </div>
)

export default MessageContent;